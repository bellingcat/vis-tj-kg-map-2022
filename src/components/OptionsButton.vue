<template>
  <v-menu id="options-menu" transition="scale-transition" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props" id="options-menu-btn" class="ma-1 pa-0"></v-btn>
    </template>

    <v-list density="compact" class="options-list">
      <v-list-subheader>{{ $t('options.title') }}</v-list-subheader>

      <!-- tiles change -->
      <v-list-item @click="switchNextTile()" ref="maptile" class="maptile" :class="nextTile">
        <template v-slot:prepend>
          <v-icon icon="mdi-layers" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.tiles.${nextTile}`) }}
        </v-list-item-title>
      </v-list-item>

      <!-- translation action -->
      <v-list-item @click="nextLang()">
        <template v-slot:prepend>
          <v-icon icon="mdi-translate" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.locale.${availableLangs[(currentLangIndex + 1) % availableLangs.length]}`) }}
        </v-list-item-title>
      </v-list-item>

      <!-- fullscreen -->
      <v-list-item @click="toggleFullscreen()">
        <template v-slot:prepend>
          <v-icon :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ (fullscreen ? $t(`options.fullscreen.off`) : $t(`options.fullscreen.on`)) }}
        </v-list-item-title>
      </v-list-item>

      <!-- download (?) -->
      <v-list-item @click="openUrl('/incidents.json', 'incidents.json')">
        <template v-slot:prepend>
          <v-icon icon="mdi-download" size="large"></v-icon>
        </template>
        <v-list-item-title>
          {{ $t(`options.download.json`) }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="openUrl('/incidents.csv', 'incidents.csv')">
        <template v-slot:prepend>
          <v-icon icon="mdi-download" size="large"></v-icon>
        </template>
        <v-list-item-title>
          {{ $t(`options.download.csv`) }}
        </v-list-item-title>
      </v-list-item>

      <!-- bellingcat -->
      <v-list-item @click="openUrl('https://www.bellingcat.com/')">
        <template v-slot:prepend>
          <v-avatar class="bcat-logo" image="@/assets/icon.ico" alt="Bellingcat logo" rounded=""></v-avatar>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.links.bellingcat`) }}
        </v-list-item-title>
      </v-list-item>
      <!-- code -->
      <v-list-item @click="openUrl('https://github.com/bellingcat/vis-tj-kg-map-2022')">
        <template v-slot:prepend>
          <v-icon icon="mdi-github" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.links.code`) }}
        </v-list-item-title>
      </v-list-item>
      <!-- share -->
      <v-list-item @click="copyCurrentUrl()">
        <template v-slot:prepend>
          <v-icon icon="mdi-share" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.links.share.button`) }}
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
      clipboardWorks: navigator.clipboard !== undefined,
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
    copyCurrentUrl(url) {
      url = url || window.location;
      if (this.clipboardWorks) {
        try {
          navigator.clipboard.writeText(url);
          this.toast(this.$t('options.links.share.success'), this.toastOptions);
        } catch (error) {
          console.log(`Could not copy: ${error}`)
          this.toast.error(this.$t('options.links.share.error'), this.toastOptions);
          // this.openUrl(url)
        }
      }
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

<style lang="scss" scoped> @import '../styles/settings.scss';

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
