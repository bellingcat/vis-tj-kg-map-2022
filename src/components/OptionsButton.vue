<template>
  <v-menu id="options-menu" transition="scale-transition" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props" id="options-menu-btn" class="ma-1 pa-0"></v-btn>
    </template>

    <v-list density="compact" class="options-list">
      <v-list-subheader>Actions</v-list-subheader>

      <!-- tiles change -->
      <v-list-item @click="switchNextTile()" ref="maptile" class="maptile" :class="nextTile">
        <template v-slot:prepend>
          <v-icon icon="mdi-layers" size="large"></v-icon>
        </template>
        <v-list-item-title>
          {{ nextTile.toUpperCase() }}
        </v-list-item-title>
      </v-list-item>

      <!-- translation action -->
      <v-list-item @click="nextLang()">
        <template v-slot:prepend>
          <v-icon icon="mdi-translate" size="large"></v-icon>
        </template>
        <v-list-item-title>
          {{ availableLangs[(currentLangIndex + 1) % availableLangs.length]?.toUpperCase() }}
        </v-list-item-title>
      </v-list-item>

      <!-- fullscreen -->
      <v-list-item @click="toggleFullscreen()">
        <template v-slot:prepend>
          <v-icon :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'" size="large"></v-icon>
        </template>
        <v-list-item-title>
          {{ (fullscreen ? 'exit fullscreen' : 'fullscreen').toUpperCase() }}
        </v-list-item-title>
      </v-list-item>

      <!-- download (?) -->
      <v-list-item @click="console.warn('TODO')">
        <template v-slot:prepend>
          <v-icon icon="mdi-download" size="large"></v-icon>
        </template>
        <v-list-item-title>
          JSON
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="console.warn('TODO')">
        <template v-slot:prepend>
          <v-icon icon="mdi-download" size="large"></v-icon>
        </template>
        <v-list-item-title>
          CSV
        </v-list-item-title>
      </v-list-item>

      <!-- bellingcat -->
      <v-list-item @click="openUrl('https://www.bellingcat.com/')">
        <template v-slot:prepend>
          <v-avatar class="bcat-logo" image="@/assets/icon.ico" alt="Bellingcat logo" rounded=""></v-avatar>
        </template>
        <v-list-item-title>
          BELLINGCAT
        </v-list-item-title>
      </v-list-item>

    </v-list>
  </v-menu>
  <!-- </v-card> -->
</template>

<script>

import { useLocale } from 'vuetify';
import { api as fullscreen } from 'vue-fullscreen';
import { useToast } from "vue-toastification";
import config from "../../config";

export default {
  name: 'OptionsButton',
  props: ['startTile'],
  emits: ['newTile'],
  data() {
    return {
      // layers
      availableTiles: Object.keys(config.app.map.tiles),
      currentTileIndex: 0,
      nextTile: 0,

      // translation
      availableLangs: ["en", "ru"],
      currentLangIndex: 0,

      //fullscreen
      fullscreen: false,

      //others
      toastOptions: config.app.ui.toastOptions,
    }
  },
  setup() {
    const { current } = useLocale();
    return { current, toast: useToast() };
  },
  methods: {
    switchNextTile() {
      this.currentTileIndex = (this.currentTileIndex + 1) % this.availableTiles.length; //rotate
      this.nextTile = this.availableTiles[(this.currentTileIndex + 1) % this.availableTiles.length];
      this.$emit('newTile', this.availableTiles[this.currentTileIndex]);
      console.log(this.availableTiles[this.currentTileIndex])
    },
    updateLocaleIndex() {
      this.currentLangIndex = this.availableLangs.findIndex(l => l == this.current);
    },
    nextLang() {
      this.$vuetify.locale.current = this.availableLangs[(this.currentLangIndex + 1) % this.availableLangs.length];
    },
    async toggleFullscreen() {
      try {
        await fullscreen.toggle('', {
          callback: (isFullscreen) => {
            this.fullscreen = isFullscreen
          },
        })
      } catch (e) {
        console.error(`Fullscreen error: ${e}`)
        this.toast.error(`Fullscreen not supported`, this.toastOptions);
      }
    },
    changeTiles() {
      console.log("changeTiles")
      this.selectedTile = "default"
      // satellite-variant
    },
    openUrl(url) {
      window.open(url, '_blank');
    },
  },
  mounted() {
    this.updateLocaleIndex();
    // tiles current/next
    this.currentTileIndex = this.availableTiles.findIndex(l => l == this.startTile);
    this.nextTile = this.availableTiles[(this.currentTileIndex + 1) % this.availableTiles.length];
  },
  watch: {
    current: function () {
      this.updateLocaleIndex();
    }
  }
}
</script>

<style lang="scss"> @import '../styles/settings.scss';

 .options-list {
   min-width: 220px;

   .v-avatar.bcat-logo {
     margin-right: 32px;
     height: 28px;
     width: 28px;
   }
 }

 .maptile {
   &.satellite {
     background-image: url('@/assets/sat-tile.png');
   }

   &.custom {
     background-image: url('@/assets/custom-tile.png');
     color: black;
   }

   &.osm {
     background-image: url('@/assets/osm-tile.png');
     color: black;
   }

 }

 .v-overlay {
   z-index: $zMax + 25 !important;
 }

 #options-menu-btn {
   position: absolute;
   right: 10px;
   top: 0px;
   opacity: $opacityMax;
   z-index: $zMax + 20;
   border-radius: 25%;
   //  width:

   &:hover {
     color: $accentColor;
   }


 }
</style>
