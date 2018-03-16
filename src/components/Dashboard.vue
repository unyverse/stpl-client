<template>
	<div v-if="!tableLoading && !coursesLoading" class="comp-dashboard">
		<div v-if="vacation" class="welcome fc">❄ ❄ ❄</div>
		<div v-if="!vacation" class="welcome fc">Hallo {{ user.name }}! {{ weekText }}</div>
		<div v-if="!vacation" class="top-cont">
			<div class="top-day left bg-sec c-pri">
				<div class="heading fc bg-act c-sec">{{ dayTitle(0) }}</div>
				<div class="content">
					<p v-for="lesson in day(0)" :key="lesson[0] + '_' + lesson[1] + '_' + lesson[2]" class="fc"><span class="room">{{ lesson[2] }}</span>&nbsp;- {{ lesson[1] }}</p>
				</div>
			</div>
			<div class="top-day right bg-sec c-pri">
				<div class="heading fc bg-act c-sec">{{ dayTitle(1) }}</div>
				<div class="content">
					<p v-for="lesson in day(1)" :key="lesson[0] + '_' + lesson[1] + '_' + lesson[2]" class="fc"><span class="room">{{ lesson[2] }}</span>&nbsp;- {{ lesson[1] }}</p>
				</div>
			</div>
		</div>
		<div class="table-cont">
			<div class="fullTable">
				<div class="a bg-sec c-pri">
					<div class="heading fc bg-act c-sec">A-Woche</div>
					<table class="bd-act">
						<thead>
							<tr>
								<th class="bd-act">Mo</th>
								<th class="bd-act">Di</th>
								<th class="bd-act">Mi</th>
								<th class="bd-act">Do</th>
								<th class="bd-act">Fr</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="lesson in [0, 1, 2, 3, 4]" :key="lesson">
								<td class="bd-act" v-for="day in [0, 1, 2, 3, 4]" :key="day"><p v-if="getData('A', day, lesson)[0]">{{ getData('A', day, lesson)[0] }}<br>{{ getData('A', day, lesson)[1] }}</p></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="b bg-sec c-pri">
					<div class="heading fc bg-act c-sec">B-Woche</div>
					<table class="bd-act">
						<thead>
							<tr>
								<th class="bd-act">Mo</th>
								<th class="bd-act">Di</th>
								<th class="bd-act">Mi</th>
								<th class="bd-act">Do</th>
								<th class="bd-act">Fr</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="lesson in [0, 1, 2, 3, 4]" :key="lesson">
								<td class="bd-act" v-for="day in [0, 1, 2, 3, 4]" :key="day"><p v-if="getData('B', day, lesson)[0]">{{ getData('B', day, lesson)[0] }}<br>{{ getData('B', day, lesson)[1] }}</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="comp-dashboard">
		<div class="loading fc">Lädt...</div>
	</div>
</template>

<script>
import { addDays, isWeekend, getISODay, differenceInCalendarISOWeeks } from 'date-fns'

export default {
	data() {
		return {
			vacation: false
		}
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		userTable() {
			return this.$store.state.table.data;
		},
		courses() {
			return this.$store.state.courses.available;
		},
		coursesLoading() {
			return this.$store.state.courses.loading.get;
		},
		tableLoading() {
			return this.$store.state.table.loading.get;
		},
		currentWeek() {
			return differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'A' : 'B';
		},
		weekText() {
			let week = '';
			if (isWeekend(new Date())) {
				week = differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'B' : 'A';
				return 'Ab Montag ist ' + week + '-Woche';
			} else {
				week = differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'A' : 'B';
				return 'Gerade ist ' + week + '-Woche';
			}
		}
	},
	methods: {
		getSubject(id) {
			return id ? this.courses[id][1] : 'a';
		},
		day(x) {
			let week = '';
			if (x == 0) {
				if (isWeekend(new Date())) {
					week = differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'B' : 'A';
				} else {
					week = differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'A' : 'B';
				}
			} else {
				if (isWeekend(addDays(new Date(), 1)) || isWeekend(new Date())) {
					week = differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'B' : 'A';
				} else {
					week = differenceInCalendarISOWeeks(new Date(), new Date(2018, 0, 29))%2 == 0 ? 'A' : 'B';
				}
			}
			let day = '';
			if (x == 0) {
				day = isWeekend(new Date()) ? 0 : getISODay(new Date()) - 1;
			} else {
				if (isWeekend(addDays(new Date(), 1))) {
					day = isWeekend(new Date()) ? 1 : 0;
				} else {
					day = isWeekend(new Date()) ? 1 : getISODay(new Date());
				}
			}
			const table = this.$store.state.table.data[week][day];
			const data = [];
			for (let i = 0; i < table.length; i++) {
				const lesson = table[i];
				let current = null;
				for (const id in lesson) {
					if (lesson.hasOwnProperty(id)) {
						if (this.user.courses.includes(id)) {
							current = [id, lesson[id][0], lesson[id][1]];
						}
					}
				}
				if (current) {
					data.push(current);
				}
			}
			return data;
		},
		getData(week, day, lesson) {
			const table = this.userTable[week][day][lesson];
			let data = '';
			for (const id in table) {
				if (table.hasOwnProperty(id)) {
					if (this.user.courses.includes(id)) {
						data = [table[id][0], table[id][1]];
					}
				}
			}
			return data;
		},
		dayTitle(x) {
			if (x == 0) {
				return isWeekend(new Date()) ? 'Montag' : 'Heute';
			} else {
				if ((isWeekend(addDays(new Date(), 1)) || isWeekend(addDays(new Date(), -1))) && isWeekend(new Date())) {
					return 'Dienstag';
				} else {
					return isWeekend(addDays(new Date(), 1)) ? 'Montag' : 'Morgen';
				}
			}
		}
	},
	mounted() {
		this.$store.dispatch('fetchTable');
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-dashboard {
	margin-bottom: 56px;
}

.welcome, .top-cont, .table-cont {
	overflow: auto;
}

.welcome, .loading {
	font-size: 20px;
	height: 80px;
}

.top-cont, .table-cont {
	padding: 0 40px;
	width: 100%;
}

.top-day {
	border-radius: $borderradius;
	width: calc(50% - 10px);
	margin: 0 10px 20px 10px;
	float: left;
	overflow: hidden;
}

.top-day.left {
	margin: 0 10px 20px 0;
}

.top-day.right {
	margin: 0 0 20px 10px;
}

.heading {
	height: 35px;
	font-size: $text-big;
}

.top-day .content p {
	height: 30px;
	font-size: $text-medium;
}

.fullTable {
	width: 100%;
	float: left;
}

.fullTable .a, .fullTable .b {
	overflow: hidden;
	border-radius: $borderradius;
	width: 100%;
}

.fullTable table {
	width: 100%;
	border-spacing: 0px;
	border-radius: 0;
}

.fullTable th, .fullTable td {
	font-size: $text-medium;
	font-weight: normal;
	text-align: center;
	border-radius: 0;
	height: 45px;
	width: 20%;
}

.fullTable .b {
	margin-top: 20px;
}
</style>
