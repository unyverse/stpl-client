import Vue from 'vue';
import Router from 'vue-router';
import { store } from '@/store';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Setup from '@/components/Setup';
import Contact from '@/components/Contact';
import Report from '@/components/Report';
import ReportThanks from '@/components/ReportThanks';
import Beta from '@/components/Beta';
import Settings from '@/components/Settings';
import NotFound from '@/components/NotFound';

Vue.use(Router)

const router = new Router({
	routes: [
    {
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/setup',
		name: 'setup',
		component: Setup,
		beforeEnter(to, from, next) {
			if (store.state.user.loggedIn && (!store.state.user.setupCompleted || store.state.user.tempSetup)) {
				next();
			} else {
				next('/');
			}
		}
	},
	{
		path: '/contact',
		name: 'contact',
		component: Contact
	},
	{
		path: '/report',
		name: 'report',
		component: Report
	},
	{
		path: '/report-thanks',
		name: 'report-thanks',
		component: ReportThanks
	},
	{
		path: '/beta',
		name: 'beta',
		component: Beta
	},
	{
		path: '/settings',
		name: 'settings',
		component: Settings
	},
	{
		path: "*",
		component: NotFound
	}
  ]
});

router.beforeEach((to, from, next) => {
	if (!store.state.beta.allowed && to.path != '/beta') {
		if (window.localStorage.getItem('betaAllowed') == 'true') {
			store.commit('setBetaAllowed', true);
			next();
		} else {
			next('/beta');
		}
	} else {
		if (store.state.user.loggedIn && !store.state.user.setupCompleted && to.path != '/setup') {
			next('/setup');
		} else {
			next();
		}
	}
});

export default router;