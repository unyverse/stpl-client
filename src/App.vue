<template>
  <div :class="currentTheme" class="app c-sec bg-pri">
	<nav-bar></nav-bar>
	<router-view class="content-comp"></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
	name: 'app',
	components: {
		'nav-bar': NavBar
	},
	computed: {
		currentTheme() {
			return this.$store.state.currentTheme.class;
		}
	},
	created() {
		this.$store.commit('recoverTheme');
		this.$store.commit('recoverUser');
	}
}
</script>

<style lang="scss">
@import './scss/app';

* {
	margin: 0;
	padding: 0;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: inherit;
	box-sizing: border-box;
}

*:focus {
	outline: none;
}

html, body, .app {
	min-height: 100vh;
}

.fc {
	display: flex;
	align-items: center;
	justify-content: center;
}

.app {
	padding-top: 56px;
	overflow: auto;
	font-family: 'Roboto', sans-serif;
}

@media (min-width: 640px) {
	.content-comp {
		width: 640px;
		margin: 0 auto;
	}
}

.material-icons {
	user-select: none;
}

.bd-pri, .bd-sec, .bd-act {
	border-radius: $borderradius;
}

// default theme

.t-default.c-pri, .t-default .c-pri {
	color: $midnightblue;
}
.t-default.bg-pri, .t-default .bg-pri {
	background: $midnightblue;
}
.t-default.bd-pri, .t-default .bd-pri {
	border: $border $midnightblue;
}

.t-default.c-sec, .t-default .c-sec {
	color: $clouds;
}
.t-default.bg-sec, .t-default .bg-sec {
	background: $clouds;
}
.t-default.bd-sec, .t-default .bd-sec {
	border: $border $clouds;
}

.t-default.c-act, .t-default .c-act {
	color: $turquoise;
}
.t-default.bg-act, .t-default .bg-act {
	background: $turquoise;
}
.t-default.bd-act, .t-default .bd-act {
	border: $border $turquoise;
}

// dark gold theme

.t-darkgold.c-pri, .t-darkgold .c-pri {
	color: $midnightblue;
}
.t-darkgold.bg-pri, .t-darkgold .bg-pri {
	background: $midnightblue;
}
.t-darkgold.bd-pri, .t-darkgold .bd-pri {
	border: $border $midnightblue;
}

.t-darkgold.c-sec, .t-darkgold .c-sec {
	color: $clouds;
}
.t-darkgold.bg-sec, .t-darkgold .bg-sec {
	background: $clouds;
}
.t-darkgold.bd-sec, .t-darkgold .bd-sec {
	border: $border $clouds;
}

.t-darkgold.c-act, .t-darkgold .c-act {
	color: $gold;
}
.t-darkgold.bg-act, .t-darkgold .bg-act {
	background: $gold;
}
.t-darkgold.bd-act, .t-darkgold .bd-act {
	border: $border $gold;
}

// dark red theme

.t-darkred.c-pri, .t-darkred .c-pri {
	color: $midnightblue;
}
.t-darkred.bg-pri, .t-darkred .bg-pri {
	background: $midnightblue;
}
.t-darkred.bd-pri, .t-darkred .bd-pri {
	border: $border $midnightblue;
}

.t-darkred.c-sec, .t-darkred .c-sec {
	color: $clouds;
}
.t-darkred.bg-sec, .t-darkred .bg-sec {
	background: $clouds;
}
.t-darkred.bd-sec, .t-darkred .bd-sec {
	border: $border $clouds;
}

.t-darkred.c-act, .t-darkred .c-act {
	color: $pomegranate;
}
.t-darkred.bg-act, .t-darkred .bg-act {
	background: $pomegranate;
}
.t-darkred.bd-act, .t-darkred .bd-act {
	border: $border $pomegranate;
}

// dark blue theme

.t-darkblue.c-pri, .t-darkblue .c-pri {
	color: $midnightblue;
}
.t-darkblue.bg-pri, .t-darkblue .bg-pri {
	background: $midnightblue;
}
.t-darkblue.bd-pri, .t-darkblue .bd-pri {
	border: $border $midnightblue;
}

.t-darkblue.c-sec, .t-darkblue .c-sec {
	color: $clouds;
}
.t-darkblue.bg-sec, .t-darkblue .bg-sec {
	background: $clouds;
}
.t-darkblue.bd-sec, .t-darkblue .bd-sec {
	border: $border $clouds;
}

.t-darkblue.c-act, .t-darkblue .c-act {
	color: $blue;
}
.t-darkblue.bg-act, .t-darkblue .bg-act {
	background: $blue;
}
.t-darkblue.bd-act, .t-darkblue .bd-act {
	border: $border $blue;
}
</style>
