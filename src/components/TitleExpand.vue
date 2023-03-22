<template>
  <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-card fixed raised class="ma-1 pa-0" id="title" v-bind="props">
        <v-container class="pa-2">
          <h4 class="text-center pa-0" absolute>
            {{ $t('main.title') }}
          </h4>
        </v-container>
      </v-card>
    </template>
    <v-card class="text-center">
      <v-card-title>
        <v-btn icon dark @click="dialog = false" class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <h1 class="mb-5">{{ $t('main.panel.title') }}</h1>
        <div v-html="$t('main.panel.card')"></div>
      </v-card-text>
      <v-card-actions class="ma-10 text-uppercase" style="display:block">
        <div class="justify-center">
          <v-btn href="https://www.bellingcat.com/" target="_blank" variant="outlined" size="x-large">
            <template v-slot:prepend>
              <v-avatar class="bcat-logo ma-2" image="@/assets/icon.ico" alt="Bellingcat logo" rounded=""
                size="28"></v-avatar>
            </template>
            {{ $t(`main.bellingcat`) }}
          </v-btn>
          <v-btn href="TODO" target="_blank" variant="outlined" size="x-large" append-icon="mdi-open-in-new">
            {{ $t(`main.panel.read`) }}
          </v-btn>
        </div>
      </v-card-actions>
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

 .v-overlay {
   z-index: $zMax + 225 !important;
 }

 #title {
   position: absolute;
   opacity: $opacityMax;
   z-index: $zMax + 10;
   text-transform: uppercase;
   max-width: 250px;

   &:hover {
     color: $accentColor;
   }
 }
</style>
