<template>
	<div v-if="!user.loggedIn" class="comp-home">
		<div class="title fc">Q2</div>
		<div class="cont">
			<div @click="$router.push('/login')" class="btn btn-full fc bg-act">Login</div>
			<div @click="$router.push('/register')" class="btn btn-full fc bg-act">Registrieren</div>
			<div @click="$router.push('/report')" class="btn btn-half fc bg-act">Fehler melden</div>
			<div @click="$router.push('/about')" class="btn btn-half fc bg-act">Kontakt / Über</div>
		</div>
	</div>
	<dashboard v-else></dashboard>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default {
	components: {
		'dashboard': Dashboard
	},
	computed: {
		user() {
			return this.$store.state.user;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.title {
	text-align: center;
	font-size: $text-huge;
	height: calc(100% - 296px);
}

.cont {
	padding: 0 40px;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	margin-bottom: 40px;
}

.btn {
	margin: 0 10px 20px 10px;
	height: 50px;
	border-radius: $borderradius;
	font-size: 15px;
	cursor: pointer;
}

.btn-half {
	width: calc(50% - 20px);
	float: left;
}

.btn-full {
	width: calc(100% - 20px);
}
</style>
