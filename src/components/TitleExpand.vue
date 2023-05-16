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
        <div class="explanation-text" v-html="$t('main.panel.card').replaceAll('\n', '<br/>')"></div>
      </v-card-text>
      <v-card-actions class="ma-10 text-uppercase" style="display:block">
        <div class="justify-center">
          <v-btn href="https://www.bellingcat.com/" class="ma-2" target="_blank" variant="outlined" size="x-large">
            <template v-slot:prepend>
              <v-avatar class="bcat-logo ma-2" image="@/assets/icon.ico" alt="Bellingcat logo" rounded=""
                size="28"></v-avatar>
            </template>
            {{ $t(`main.bellingcat`) }}
          </v-btn>
          <v-btn href="TODO" class="ma-2" target="_blank" variant="outlined" size="x-large" append-icon="mdi-open-in-new">
            {{ $t(`main.panel.read`) }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import config from "../../config";
export default {
  data() {
    return {
      title: this.$t('main.title'),
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
   max-width: 275px;

   &:hover {
     color: $accentColor;
   }
 }

 .explanation-text {
   max-width: 640px;
   margin: auto;
   text-align: justify;
   text-justify: inter-word;

   h3 {
     margin-top: 20px;
     margin-bottom: 10px;
     text-align: center;
   }

   a {
     text-align: center;
   }
 }</style>
