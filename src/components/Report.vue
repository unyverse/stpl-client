<template>
	<div class="comp-report">
		<div class="cont">
			<div v-if="error" class="error fc">{{ error }}</div>
			<div class="label">Titel, Kurzbeschreibung:</div>
			<input class="bd-act c-sec" v-model="title" type="text">
			<div class="label">Kategorie:</div>
			<select class="bd-act c-sec" v-model="category">
				<option class="bg-pri c-sec" value="other">Anderer Fehler</option>
				<option class="bg-pri c-sec" value="data">Fehler beim Stundenplan</option>
				<option class="bg-pri c-sec" value="typo">Tippfehler</option>
				<option class="bg-pri c-sec" value="visual">Layout-/Darstellungsfehler</option>
			</select>
			<div class="label">Beschreibung:</div>
			<textarea class="bd-act c-sec" v-model="content"></textarea>
			<div @click="sendFeedback()" class="btn fc bg-act c-sec">Abschicken</div>
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			category: 'other',
			content: '',
			error: ''
		}
	},
	methods: {
		sendFeedback() {
			if (!this.title) {
				this.error = 'Titel fehlt';
				return;
			}
			if (!this.category) {
				this.error = 'Kategorie fehlt';
				return;
			}
			if (!this.content) {
				this.error = 'Beschreibung fehlt';
				return;
			}
			this.$store.dispatch('sendFeedback', {
				title: this.title,
				category: this.category,
				content: this.content
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app';

.comp-report {
	overflow: auto;
}

.error {
	width: 100%;
	height: 40px;
	margin-bottom: 20px;
}

.cont {
	padding: 30px 40px 0 40px;
	width: 100%;
}

.cont input, .cont select, .cont textarea {
	font-size: 16px;
	margin-bottom: 20px;
	height: 35px;
	width: 100%;
	background: transparent;
}

.cont input {
	padding-left: 10px;
}

.cont textarea {
	resize: none;
	height: 120px;
	padding: 10px;
}

.cont select {
	padding-left: 5px;
}

.cont .label {
	font-size: 16px;
	margin-bottom: 5px;
}

.cont .btn {
	height: 30px;
	float: right;
	border-radius: $borderradius;
	cursor: pointer;
	padding: 0 15px;
	font-size: 16px;
}
</style>
