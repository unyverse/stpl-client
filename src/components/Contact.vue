<template>
	<div class="comp-contact">
		<div class="welcome fc">
			<p>Stundenplan v0.9</p>
		</div>
		<div class="cont">
			<div class="about fc">
				<p>
					Diese Website („Webapp“) soll einen möglichst aktuellen digitalen Stundenplan bieten, welcher während der regulären Nutzung wenig Daten verbraucht.<br><br>
					Auf technischer Seite nutzt diese Website <a href="https://vuejs.org" class="c-act">VueJS</a> in Kombination mit Vuex, Vue-Router, Axios und Date-FNS.<br><br>
					Sollte ein Feature noch fehlen, kannst Du mich gerne kontaktieren, damit es eingebaut wird.
				</p>
			</div>
			<div class="contact">
				<div v-if="!captcha.solved" class="captcha">
					<div class="title">Um zu verhindern, dass Spam-Roboter die Kontaktadressen sammeln, sind diese mit einem Captcha geschützt.</div>
					<div class="task fc">
						<div>{{ captcha.first }} + {{ captcha.second }} =</div>
						<input class="bd-act c-sec" v-model.number="input" type="number">
					</div>
				</div>
				<div v-else>
					<div class="title">Bei Fragen bin ich via <a class="c-act" href="mailto:me@shit.wtf">E-Mail</a> und via <a class="c-act" href="https://api.whatsapp.com/send?phone=4917642995331">WhatsApp</a> erreichbar. 🙂</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			captcha: {
				solved: false,
				first: 0,
				second: 0
			},
			input: null
		}
	},
	watch: {
		input(num) {
			if (num == this.captcha.first + this.captcha.second) {
				this.captcha.solved = true;
			}
		}
	},
	methods: {
		getRandomInt(min, max) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	},
	mounted() {
		this.captcha.first = this.getRandomInt(1, 9);
		this.captcha.second = this.getRandomInt(1, 9);
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-contact {
	overflow: auto;
}

.welcome {
	text-align: center;
	font-size: 20px;
	height: 90px;
}

.cont {
	padding: 0 40px;
	width: 100%;
}

.about {
	text-align: center;
	margin-bottom: 20px;
}

.contact {
	text-align: center;
}

.captcha .title {
	text-align: center;
}

.captcha .task {
	margin-top: 20px;
}

.captcha .task * {
	float: left;
}

.captcha .task input {
	margin-left: 10px;
	background: transparent;
	padding: 5px;
	height: 30px;
	width: 30px;
}

a {
	text-decoration: none;
}
</style>
