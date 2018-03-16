<template>
	<div class="comp-notfound">
		<div class="welcome fc">
			<p>Diese Seite existiert nicht.<br><br><router-link to="/" class="c-act">Zurück</router-link></p>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-notfound {
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
