<template>
  <v-menu id="options-menu" transition="scale-transition" :close-on-content-click="false" offset-y v-model="menuOpen">
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

      <!-- allow embeds -->
      <v-list-item @click="embedDialog = true;">
        <template v-slot:prepend>
          <v-icon icon="mdi-cookie-alert" size="large" :color="embedEnabled ? 'primary' : ''"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          <v-dialog v-model="embedDialog" scrollable width="auto" origin="top right">
            <template v-slot:activator="">
              {{ $t(`options.embeds.title`) }}
            </template>
            <v-card>
              <v-card-title class="text-center">{{ $t(`options.embeds.card.title`) }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="text-center" style="max-height: 450px;max-width:450px">
                {{ $t(`options.embeds.card.disclaimer`) }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center">
                <v-btn color="primary" variant="text" @click="embedEnabled = false; embedDialog = false;"
                  :disabled="!embedEnabled">
                  {{ $t(`options.embeds.card.disable`) }}
                </v-btn>
                <v-btn color="primary" variant="text" @click="embedEnabled = true; embedDialog = false;"
                  :disabled="embedEnabled">
                  {{ $t(`options.embeds.card.enable`) }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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

      <!-- download JSON -->
      <v-list-item @click="openUrl('/incidents.json', 'incidents.json')">
        <template v-slot:prepend>
          <v-icon icon="mdi-download" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.download.json`) }}
        </v-list-item-title>
      </v-list-item>

      <!-- download CSV -->
      <v-list-item @click="openUrl('/incidents.csv', 'incidents.csv')">
        <template v-slot:prepend>
          <v-icon icon="mdi-download" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
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
      <v-list-item @click="shareUrl()" v-if="shareWorks || clipboardWorks">
        <template v-slot:prepend>
          <v-icon icon="mdi-share" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.links.share.button`) }}
        </v-list-item-title>
      </v-list-item>

      <!-- info panel -->
      <v-list-item @click="showAboutPanel()">
        <template v-slot:prepend>
          <v-icon icon="mdi-information-outline" size="large"></v-icon>
        </template>
        <v-list-item-title class="text-uppercase">
          {{ $t(`options.links.about`) }}
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
  emits: ['newTile', 'embedChanged', 'showAboutPanel'],
  data() {
    return {
      menuOpen: false,

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
      shareWorks: navigator.share !== undefined,
      embedDialog: false,
      embedEnabled: false,
      embedsCookieName: "EmbedsEnabledCookie"
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
    shareUrl(url) {
      url = url || window.location;
      if (this.shareWorks) {
        navigator.share({
          title: document.title,
          text: this.$t("main.title"),
          url: url
        })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing:', error));
      }
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
    showAboutPanel() {
      this.$emit("showAboutPanel");
      this.menuOpen = false;
    },
    setCookie(key, value, days) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + (days || 365));
      document.cookie = `${key}=${value}; expires=${expireDate.toUTCString()}; path=/`;
    },
    getCookie(key) {
      //https://www.w3schools.com/js/js_cookies.asp
      let name = key + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return undefined;
    }
  },
  mounted() {
    this.updateLocaleIndex();
    // tiles current/next
    this.currentTileIndex = this.availableTiles.findIndex(l => l == this.startTile);
    this.nextTile = this.availableTiles[(this.currentTileIndex + 1) % this.availableTiles.length];
    this.embedEnabled = this.getCookie(this.embedsCookieName) == "true"; // reads cookie
    this.embedDialog = this.getCookie(this.embedsCookieName) === undefined && (this.$route.query["ask-embeds"] == undefined);
  },
  watch: {
    current: function () {
      this.updateLocaleIndex();
    },
    embedEnabled: function () {
      this.setCookie(this.embedsCookieName, this.embedEnabled); // writes cookie
      this.$emit('embedChanged', this.embedEnabled);
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
