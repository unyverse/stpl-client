<template>
  	<div class="comp-navbar">
		<div class="top bg-act c-sec">
			<div @click="toggleMenu()" class="nav-icon fc"><i class="material-icons">menu</i></div>
		   	<span class="nav-title fc">Stundenplan</span>
		</div>
		<div :class="{ visible: menuVisible }" class="menu bg-pri c-sec">
			<div @click="toggleMenu()" class="menu-close fc c-act"><i class="material-icons">close</i></div>
			<div class="menu-person">
				<div class="menu-ava fc bg-act c-pri"><i class="material-icons">person</i></div>
				<div v-if="user.loggedIn" class="menu-name fc">{{ user.name }}</div>
				<div v-if="!user.loggedIn" @click="goTo('/login')" class="menu-login fc">Login</div>
			</div>
			<div v-if="!(user.loggedIn && !user.setupCompleted)" @click="goTo('/')" class="menu-item">Startseite</div>
			<div v-if="user.loggedIn && user.setupCompleted" @click="edit()" class="menu-item">Kurse ändern</div>
			<div v-if="user.name == '1' || user.name == 'malte'" @click="goTo('/settings')" class="menu-item">Einstellungen</div>
			<div v-if="!(user.loggedIn && !user.setupCompleted)" @click="goTo('/report')" class="menu-item">Fehler melden</div>
			<div v-if="!(user.loggedIn && !user.setupCompleted)" @click="goTo('/contact')" class="menu-item">Kontakt / Über</div>
			<div v-if="user.loggedIn" @click="logout()" class="menu-item">Abmelden</div>
			<div class="menu-bot c-act">Stundenplan v0.9</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		menuVisible() {
			return this.$store.state.menuVisible;
		}
	},
	methods: {
		toggleMenu() {
			this.$store.commit('toggleMenu');
		},
		goTo(route) {
			this.$router.push(route);
			this.toggleMenu();
		},
		logout() {
			this.$store.dispatch('logout');
			this.toggleMenu();
		},
		edit() {
			this.$store.commit('setTempSetup');
			this.$router.push('/setup');
			this.toggleMenu();
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.top {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 56px;
	padding: 0 16px;
	display: flex;
	align-items: center;
}

.nav-icon, .nav-title {
	float: left;
}

.nav-icon {
	margin-right: 10px;
	cursor: pointer;
}

.nav-icon i {
	font-size: $text-big;
}

.nav-title {
	font-size: 20px;
}

.menu {
	position: fixed;
	top: 0;
	bottom: 0;
	left: -100%;
	width: 100%;
	min-height: 100%;
	transition: left 0.2s ease-in-out;
	z-index: 1;
	padding: 20px;
}

@media (min-width: 640px) {
	.menu {
		width: 320px;
	}
}

.menu.visible {
	left: 0;
}

.menu-person {
	height: 30px;
}

.menu-ava, .menu-name, .menu-login {
	float: left;
	cursor: pointer;
}

.menu-ava {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

.menu-name, .menu-login {
	height: 30px;
    margin-left: 10px;
}

.menu-login, .menu-close {
	cursor: pointer;
}

.menu-close {
	float: right;
	width: 30px;
	height: 30px;
}

.menu-item {
	margin-top: 15px;
	cursor: pointer;
}

.menu-bot {
	position: absolute;
    bottom: 20px;
    left: 20px;
}
</style>