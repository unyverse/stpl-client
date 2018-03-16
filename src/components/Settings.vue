<template>
	<div class="comp-settings">
		<div class="welcome fc">
			<p>Einstellungen</p>
		</div>
		<div class="cont">
			<div class="item">
				<div class="title">Theme:</div>
				<div class="options">
					<div v-for="theme in themes" :key="theme.name" :class="theme.name" class="theme" @click="selectTheme(theme)">
						<div :class="theme.name" class="demo pri"></div>
						<div :class="theme.name" class="demo sec"></div>
						<div :class="theme.name" class="demo act"></div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			themes: [{
				name: 'default',
				class: 't-default'
			},
			{
				name: 'darkgold',
				class: 't-darkgold'
			},
			{
				name: 'darkred',
				class: 't-darkred'
			},
			{
				name: 'darkblue',
				class: 't-darkblue'
			}]
		}
	},
	methods: {
		selectTheme(theme) {
			this.$store.commit('setTheme', theme);
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-settings {
	overflow: auto;
}

.welcome {
	text-align: center;
	font-size: 20px;
	height: 75px;
}

.cont {
	padding: 0 40px;
	width: 100%;
}

.item {
	width: 100%;
	overflow: auto;
}

.title {
	margin-bottom: 10px;
}

.options {
	width: 100%;
}

.theme {
	float: left;
	width: 60px;
	height: 20px;
	overflow: hidden;
	border-radius: $borderradius;
	cursor: pointer;
	margin-right: 10px;
}

.theme .demo {
	width: calc(100% / 3);
	height: 100%;
	float: left;
}

.theme.default {
	border: $border $turquoise;
}
.default .pri {
	background: $midnightblue;
}
.default .sec {
	background: $clouds;
}
.default .act {
	background: $turquoise;
}

.theme.darkgold {
	border: $border $gold;
}
.darkgold .pri {
	background: $midnightblue;
}
.darkgold .sec {
	background: $clouds;
}
.darkgold .act {
	background: $gold;
}

.theme.darkred {
	border: $border $pomegranate;
}
.darkred .pri {
	background: $midnightblue;
}
.darkred .sec {
	background: $clouds;
}
.darkred .act {
	background: $pomegranate;
}

.theme.darkblue {
	border: $border $blue;
}
.darkblue .pri {
	background: $midnightblue;
}
.darkblue .sec {
	background: $clouds;
}
.darkblue .act {
	background: $blue;
}
</style>
