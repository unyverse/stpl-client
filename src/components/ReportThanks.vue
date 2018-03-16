<template>
	<div class="comp-reportthanks">
		<div class="welcome fc">
			<p>Vielen Dank für Dein Feedback.<br><br><router-link to="/" class="c-act">Zurück</router-link></p>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-reportthanks {
	overflow: auto;
}

.welcome {
	text-align: center;
	font-size: 20px;
	height: 200px;
	margin: 0 40px;
}

a {
	text-decoration: none;
}
</style>
