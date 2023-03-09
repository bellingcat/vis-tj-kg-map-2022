<template>
	<v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
		<template v-slot:activator="{ props }">
			<v-card max-width="200px" fixed raised class="ma-0 pa-0" id="title" v-bind="props">
				<v-container class="pa-2">
					<h4 class="text-center pa-0" absolute>
						{{ title }}
					</h4>
				</v-container>
			</v-card>
		</template>
		<v-card>
			<div>
				<v-btn icon dark @click="dialog = false" class="float-right">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				FULLSCREEN CONTENT TODO
			</div>
		</v-card>
	</v-dialog>
</template>
<script>
import config from "../../config";
export default {
	data() {
		return {
			title: config.display_title,
			dialog: false,
			notifications: false,
			sound: true,
			widgets: false,
		}
	}
}
</script>
<style lang="scss"> @import '../styles/settings.scss';

 #title {
 	position: absolute;
 	opacity: $opacityMax;
 	z-index: $zMax + 10;
 }
</style>