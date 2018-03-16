<template>
	<div class="comp-beta">
		<div class="welcome fc">
			<p>Stundenplan v0.9</p>
		</div>
		<div class="cont">
			<div class="info fc">
				<p>
					Gib unten deinen Beta-Schlüssel ein, um Zugang zur Vorabversion des Stundenplans zu erhalten.
				</p>
			</div>
			<div class="key fc">
				<input v-model="input" class="bd-act c-sec" type="text" maxlength="6">
			</div>
			<div v-if="status" class="status fc">{{ status }}</div>
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: '',
			status: ''
		}
	},
	watch: {
		input(str) {
			if (str.length == 6) {
				const rnd = parseInt(str[0] + str[1]+ str[2]);
				const givenHash = str[3] + str[4] + str[5];
				let calcHash = String(Math.floor((Math.sin(rnd) - Math.floor(Math.sin(rnd)))*1000));
				calcHash = calcHash.length < 3 ? '0' + calcHash : calcHash;
				calcHash = calcHash.length < 3 ? '0' + calcHash : calcHash;
				if (givenHash == calcHash) {
					window.localStorage.setItem('betaAllowed', 'true');
					this.$store.commit('setBetaAllowed', true);
					this.$router.push('/');
				} else {
					this.status = 'Ungültiger Beta-Schlüssel';
				}
			} else {
				this.status = '';
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-beta {
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

.info {
	text-align: center;
	margin-bottom: 20px;
}

.key {
	height: 80px;
}

.key input {
	text-align: center;
	font-family: 'Roboto Slab', serif;
	font-size: 30px;
	width: 175px;
	padding: 10px;
	background: transparent;
	letter-spacing: 5px;
	font-weight: bold;
}

.status {
	margin-top: 20px;
	font-size: 16px;
}

a {
	text-decoration: none;
}
</style>
