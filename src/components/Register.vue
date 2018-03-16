<template>
	<div class="comp-register">
		<div class="form">
			<div v-if="registerError !== ''" class="status fc">{{ registerError }}</div>
			<div class="label">Benutzername:</div>
			<input v-model="username" type="text" spellcheck="false" class="bd-act c-sec">
			<div class="label">E-Mail:</div>
			<input v-model="email" type="text" spellcheck="false" class="bd-act c-sec">
			<div class="label">Passwort:</div>
			<input v-model="password" type="password" class="bd-act c-sec">
			<div class="label">Passwort wiederholen:</div>
			<input v-model="passwordRepeat" type="password" class="bd-act c-sec">
			<div @click="login()" class="login c-act fc">Login</div>
			<div @click="register()" class="btn bg-act fc">Registrieren</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	},
	computed: {
		registerError() {
			return this.$store.state.formErrors.register;
		}
	},
	methods: {
		register() {
			if (!this.username || !this.email || !this.password ||!this.passwordRepeat) {
					this.$store.commit('setRegisterError', 'Alle Felder müssen ausgefüllt sein');
			} else {
				if (this.password === this.passwordRepeat) {
					this.$store.dispatch('register', {
						username: this.username,
						email: this.email,
						password: this.password
					});
				} else {
					this.$store.commit('setRegisterError', 'Passwörter stimmen nicht überein');
				}
			}
		},
		login() {
			this.$store.commit('setRegisterError', '');
			this.$router.push('/login');
		}
	},
	mounted() {
		this.$store.commit('setRegisterError', '');
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.form {
	margin-top: 30px;
	padding: 0 40px;
}

.label {
	font-size: 16px;
	margin-bottom: 5px;
}

input {
	font-size: 16px;
	height: 35px;
	background: transparent;
	margin-bottom: 20px;
	width: 100%;
	padding-left: 10px;
}

.status {
	width: 100%;
	height: 30px;
	font-size: 16px;
	margin-bottom: 10px;
}

.login {
	font-size: 16px;
	height: 30px;
	float: left;
	cursor: pointer;
}

.btn {
	height: 35px;
	border-radius: $borderradius;
	float: right;
	padding: 0 15px;
	cursor: pointer;
	font-size: 16px;
}
</style>
