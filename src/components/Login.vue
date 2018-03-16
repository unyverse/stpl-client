<template>
	<div class="comp-login">
		<div class="form">
			<div v-if="loginError !== ''" class="status fc">{{ loginError }}</div>
			<div class="label">Benutzername:</div>
			<input v-model="username" type="text" spellcheck="false" class="bd-act c-sec">
			<div class="label">Passwort:</div>
			<input v-model="password" type="password" class="bd-act c-sec">
			<div @click="register()" class="register c-act fc">Registrieren</div>
			<div @click="login()" class="btn bg-act fc">Login</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: ''
		}
	},
	computed: {
		loginError() {
			return this.$store.state.formErrors.login;
		}
	},
	methods: {
		login() {
			this.$store.dispatch('login', {
				username: this.username,
				password: this.password
			});
		},
		register() {
			this.$store.commit('setLoginError', '');
			this.$router.push('/register');
		}
	},
	mounted() {
		this.$store.commit('setLoginError', '');
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

.register {
	font-size: 16px;
	height: 30px;
	float: left;
	cursor: pointer;
}

.btn {
	height: 30px;
	border-radius: $borderradius;
	float: right;
	padding: 0 15px;
	cursor: pointer;
	font-size: 16px;
}
</style>
