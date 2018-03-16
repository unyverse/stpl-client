import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';
import { socket } from '@/socket';

Vue.use(Vuex);

axios.defaults.withCredentials = true;

export const store = new Vuex.Store({
	state: {
		user: {
			loggedIn: false,
			recoverCompleted: false,
			name: '',
			email: '',
			setupCompleted: false,
			tempSetup: false,
			courses: []
		},
		formErrors: {
			login: '',
			register: ''
		},
		menuVisible: false,
		courses: {
			available: {},
			loading: {
				get: true,
				set: false
			}
		},
		table: {
			data: {},
			loading: {
				get: true
			}
		},
		feedback: {
			loading: false
		},
		beta: {
			allowed: false
		},
		currentTheme: {
			name: 'default',
			class: 't-default'
		}
	},
	mutations: {
		toggleMenu(state) {
			state.menuVisible = !state.menuVisible;
		},
		setUser(state, payload) {
			if (payload) {
				state.user.loggedIn = true;
				state.user.name = payload.name;
				state.user.email = payload.email;
				state.user.setupCompleted = payload.setupCompleted;
				state.user.courses = payload.courses;

				window.localStorage.setItem('loggedIn', true);
				window.localStorage.setItem('name', payload.name);
				window.localStorage.setItem('email', payload.email);
				window.localStorage.setItem('setupCompleted', payload.setupCompleted);
				window.localStorage.setItem('courses', JSON.stringify(payload.courses));
			} else {
				state.user.loggedIn = false;
			}
		},
		readCachedUser(state) {
			let su = state.user;
			let ls = window.localStorage;
			su.loggedIn = ls.getItem('loggedIn') == 'true';
			su.name = ls.getItem('name');
			su.email = ls.getItem('email');
			su.setupCompleted = ls.getItem('setupCompleted') == 'true';
			su.recoverCompleted = true;
			su.courses = JSON.parse(ls.getItem('courses'));
		},
		clearCachedUser(state) {
			let ls = window.localStorage;
			ls.setItem('name', '');
			ls.setItem('email', '');
			ls.setItem('courses', '');
			ls.setItem('setupCompleted', '');
			ls.setItem('loggedIn', 'false');
		},
		setUserCourses(state, payload) {
			let ls = window.localStorage;
			ls.setItem('courses', JSON.stringify(payload));
			state.user.courses = payload;
		},
		setLoginError(state, value) {
			state.formErrors.login = value;
		},
		setRegisterError(state, value) {
			state.formErrors.register = value;
		},
		setRecoverCompleted(state, payload) {
			state.user.recoverCompleted = payload;
		},
		setSetupCompleted(state, payload) {
			state.user.setupCompleted = payload;
			state.user.tempSetup = false;
			window.localStorage.setItem('setupCompleted', payload);
		},
		setTempSetup(state) {
			state.user.tempSetup = true;
		},
		setCourses(state, payload) {
			state.courses.available = payload;
			state.courses.loading.get = false;
		},
		setCoursesLoading(state, payload) {
			if (payload.get !== undefined) {
				state.courses.loading.get = payload.get;
			}
			if (payload.set !== undefined) {
				state.courses.loading.set = payload.set;
			}
		},
		setTable(state, payload) {
			state.table.data = payload;
			state.table.loading.get = false;
		},
		setTableLoading(state, payload) {
			if (payload.get !== undefined) {
				state.table.loading.get = payload.get;
			}
		},
		setFeedbackLoading(state, payload) {
			state.feedback.loading = payload;
		},
		setBetaAllowed(state, payload) {
			state.beta.allowed = payload;
		},
		setTheme(state, theme) {
			window.localStorage.setItem('theme', JSON.stringify(theme));
			state.currentTheme = theme;
		},
		recoverTheme(state) {
			if (window.localStorage.getItem('theme')) {
				state.currentTheme = JSON.parse(window.localStorage.getItem('theme'));
			}
		},
		recoverUser(state) {
			if (!store.state.user.loggedIn && !store.state.user.recoverCompleted && window.localStorage.getItem('loggedIn') === 'true') {
				store.commit('readCachedUser');
				if (store.state.user.loggedIn && !store.state.user.setupCompleted && to.path != '/setup') {
					router.push('/setup');
				}
			}
		}
	},
	actions: {
		login(context, payload) {
			axios.post('/auth/login', {
				username: payload.username,
				password: payload.password
			}).then(response => {
				if (response.status === 200) {
					socket.emit('hello', {
						name: response.data.name
					});
					context.commit('setUser', response.data);
					if (response.data.setupCompleted) {
						router.push('/');	
					} else {
						router.push('/setup');
					}
				}
			}).catch(error => {
				console.error(error);
				if (error.response.status === 401) {
					context.commit('setLoginError', 'Logindaten falsch');
					context.commit('setUser', null);
				} else {
					console.error(error);
				}
			});
		},
		register(context, payload) {
			axios.post('/auth/register', {
				username: payload.username,
				email: payload.email,
				password: payload.password
			}).then(response => {
				if (response.status === 201) {
					context.commit('setUser', response.data);
					if (response.data.setupCompleted) {
						router.push('/');	
					} else {
						router.push('/setup');
					}
				} else {
					console.error(response);
				}
			}).catch(error => {
				context.commit('setRegisterError', error.response.data.error);
			});
		},
		logout(context) {
			axios.get('/auth/logout').then(response => {
				if (response.status === 200) {
					context.commit('setUser', null);
					context.commit('clearCachedUser');
					router.push('/');
				} else {
					console.error(response);
				}
			}).catch(error => {
				context.commit('setUser', null);
				router.push('/');
				console.error(error);
			});
		},
		fetchCourses(context) {
			context.commit('setCoursesLoading', {
				get: true,
				set: false
			});
			axios.get('/static/json/course-list.json').then(response => {
				context.commit('setCourses', response.data);
			}).catch(error => {
				console.error(error);
			});
		},
		fetchTable(context) {
			context.dispatch('fetchCourses');
			context.commit('setTableLoading', {
				get: true
			});
			axios.get('/static/json/table.json').then(response => {
				context.commit('setTable', response.data);
			}).catch(error => {
				console.error(error);
			});
		},
		saveCourses(context, payload) {
			context.commit('setCoursesLoading', {
				set: true
			});
			axios.post('/api/courses', {
				courses: payload
			}).then(response => {
				context.commit('setCoursesLoading', {
					set: false
				});
				context.commit('setSetupCompleted', true);
				context.commit('setUserCourses', payload);
				router.push('/');
			}).catch(error => {
				console.error(error);
			});
		},
		sendFeedback(context, payload) {
			context.commit('setFeedbackLoading', true);
			axios.post('/api/feedback', {
				title: payload.title,
				category: payload.category,
				content: payload.content
			}).then(response => {
				context.commit('setFeedbackLoading', false);
				router.push('/report-thanks');
			}).catch(error => {
				console.error(error);
			});
		}
	}
});