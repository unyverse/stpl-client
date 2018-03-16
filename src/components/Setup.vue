<template>
	<div class="comp-setup">
		<div class="welcome fc">Wähle deine Kurse, damit Dein Stundenplan erstellt werden kann</div>
		<div v-if="selected.length != 0" class="selected bg-sec c-pri">
			<div class="title fc bg-act c-sec">Deine Kurse</div>
			<div class="list">
				<div v-for="course in selected" :key="course[0]" class="course">
					<div class="desc fc">{{ course[0] }} - {{ course[1] }} - {{ course[3] }}</div>
					<div @click="deselectCourse(course)" class="icon fc"><i class="material-icons">remove</i></div>
				</div>
			</div>
			<div @click="save()" class="btn fc bg-act c-sec">{{ loadingSet ? 'Lädt...' : 'Speichern' }}</div>
		</div>
		<div class="available bg-sec c-pri">
			<div class="title fc bg-act c-sec">Kursauswahl</div>
			<div v-if="loadingGet" class="note">Lädt...</div>
			<div class="search">
				<input v-model="search" class="bd-act" type="text" placeholder="Suche...">
			</div>
			<div v-if="!loadingGet" class="list">
				<div v-for="course in filtered" :key="course[0]" class="course">
					<div class="desc fc">{{ course[0] }} - {{ course[1] }} - {{ course[3] }}</div>
					<div @click="selectCourse(course)" class="icon fc"><i class="material-icons">add</i></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selected: [],
			search: '',
			ready: false
		}
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		tempSetup() {
			return this.$store.state.user.tempSetup;
		},
		loadingGet() {
			return this.$store.state.courses.loading.get;
		},
		loadingSet() {
			return this.$store.state.courses.loading.set;
		},
		available() {
			return this.$store.state.courses.available;
		},
		filtered() {
			let fil = [];
			for (const course in this.available) {
				if (this.available.hasOwnProperty(course)) {
					const s = this.search.toLowerCase();
					const c = this.available[course];
					if (!this.selected.includes(c) && (course.toLowerCase().includes(s) || c[1].toLowerCase().includes(s) || c[3].toLowerCase().includes(s))) {
						fil.push(this.available[course]);
					}
				}
			}
			return fil;
		}
	},
	watch: {
		loadingGet(value) {
			if (!value && this.tempSetup && this.ready) {
				let tempCourses = [];
				for (let i = 0; i < this.user.courses.length; i++) {
					tempCourses.push(this.available[this.user.courses[i]]);					
				}				
				this.selected = tempCourses;
			}
		}
	},
	methods: {
		selectCourse(course) {
			this.selected.push(course);
		},
		deselectCourse(course) {
			let index = this.selected.indexOf(course);
			if (index != -1) {
				this.selected.splice(index, 1);
			}
		},
		save() {
			let courses = [];
			for (let i = 0; i < this.selected.length; i++) {
				courses.push(this.selected[i][0]);
			}
			this.$store.dispatch('saveCourses', courses);
		}
	},
	mounted() {
		this.ready = true;
		this.$store.dispatch('fetchCourses');
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-setup {
	overflow: auto;
}

.welcome {
	text-align: center;
	font-size: 20px;
	height: 130px;
	margin: 0 40px;
}

.selected, .available {
	width: calc(100% - 80px);
	margin: 0 40px 40px 40px;
	border-radius: $borderradius;
	overflow: hidden;
}

.title {
	height: 50px;
	font-size: $text-big;
}

.list {
	padding: 10px;
}

.course {
	margin: 10px;
	overflow: auto;
	width: calc(100% - 20px);
	height: 25px;
	font-size: 18px;
}

.course .desc {
	height: 100%;
	float: left;
}

.course .icon {
	float: right;
	cursor: pointer;
	height: 100%;
}

.search {
	width: 100%;
    padding: 20px 20px 0 20px;
}

.search input {
	height: 35px;
    font-size: 18px;
    width: 100%;
	padding: 10px;
	background: transparent;
}

.selected .btn {
	border-radius: $borderradius;
	height: 30px;
	padding: 0 10px;
	margin: 0 90px 10px 90px;
	font-size: 18px;
	cursor: pointer;
}
</style>
