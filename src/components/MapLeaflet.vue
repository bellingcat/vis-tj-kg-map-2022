<template>
  <title-expand ref="titleExpand" />
  <!-- <sidebar /> -->

  <v-card :style="selectedVillage ? '' : { zIndex: 0 }" fixed raised class="ma-1" id="sidebar" ref="sidebar">
    <v-container class="pa-0">
      <v-card-text>
        {{ this.selectedIncidents }}
        <v-window v-model="selectedVillage">
          <v-window-item class="ma-0" v-for="v in villages" :value="v.id" :key="v.id">
            <v-btn variant="plain" dark @click="selectedVillage = null" class="float-right">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <h3 class="text-center mb-3">
              {{ v.name_en }} / {{ v.name_ru }}
            </h3>
            {{ v.description }}
            <!-- <template v-for="v in [
              { incidentsData: v.incidentsDestruction, key: 'destruction', class: 'text-red' },
              { incidentsData: v.incidentsMilitary, key: 'military', class: 'text-lime' },
            ]" :key="x.key"> -->
            <h3 v-if="v.incidents.length" class="mt-4 mb-2">
              {{ v.incidents.length }} geolocated {{ v.incidents.length == 1 ? "incident" : "incidents" }}
            </h3>
            <v-expansion-panels v-model="this.selectedIncidents[v.id]" variant="accordion">
              <v-expansion-panel v-for="i in v.incidents" :key="i.id" :value="i.id" :id="i.id">
                <v-expansion-panel-title class="pa-0 pl-1 pr-1">
                  <!-- <v-icon :icon="x.key=='military'?'mdi-knife-military':''"></v-icon> -->
                  <small class="mr-2 pa-1" :class="`chip-${i.tag}`">{{ i.tag }}</small>
                  {{ i.description }}
                </v-expansion-panel-title>
                <v-expansion-panel-text class="pa-0 media-panel">

                  <div v-for="(link, linkIndex) in i.links" :key="linkIndex">
                    <!-- TODO: if this is an IMAGE and not a VIDEO -->
                    <video v-if="link.archive" width="" height="240" class="mt-2 mb-2" style="width: 100%;" controls>
                      <source :src="link.archive" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                    <p v-if="!link.archive">No archived content</p>
                    <v-btn v-if="link.src" variant="outlined" color="secondary" class="ma-1" :href="link.src"
                      :alt="link.src" target="_blank" append-icon="mdi-open-in-new">
                      source {{ linkIndex + 1 }}
                    </v-btn>
                    <hr v-if="i.links.length > linkIndex + 1" class="mb-3 mt-3">
                  </div>


                  <v-btn variant="outlined" class="ma-1" append-icon="mdi-open-in-new"
                    :href="`http://maps.google.com/maps?t=k&q=${i.lat},${i.lon}`" target="_blank">
                    GMaps
                  </v-btn>
                  <v-btn v-if="clipboardWorks" variant="outlined" class="ma-1"
                    @click="copyText($event, `${i.lat},${i.lon}`)" append-icon="mdi-content-copy">
                    {{ i.lat }},{{ i.lon }}
                  </v-btn>
                  <v-chip v-if="!clipboardWorks" label class="ma-1">
                    {{ i.lat }},{{ i.lon }}
                  </v-chip>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- </template> -->

          </v-window-item>
        </v-window>
      </v-card-text>
    </v-container>
  </v-card>

  <v-card class="village-tabs ma-0 mb-0 ml-auto mr-auto" :class="mdAndDown ? 'w-100' : 'w-50'">
    <v-tabs class="ml-auto mr-auto" v-model="selectedVillage" bg-color="primary" center-active show-arrows
      align-tabs="center">
      <v-tab v-for="v in villages" :value="v.id" :key="v.id">
        <!-- <v-badge :content="v.incidents.length" floating color="error"> -->
        {{ v.name_en }}
        <!-- </v-badge> -->
      </v-tab>
    </v-tabs>
  </v-card>

  <div id="map"></div>
</template>

<script setup>
</script>

<script>
import { useDisplay } from 'vuetify'
import { useToast } from "vue-toastification";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import config from "../../config";
// import BeforeAfterSatellite from "./BeforeAfterSatellite.vue";
import TitleExpand from "./TitleExpand.vue"
// import Sidebar from "./Sidebar.vue";


export default {
  components: { TitleExpand },
  setup() {
    const { mdAndDown } = useDisplay();
    return {
      mdAndDown, toast: useToast(), TOAST_OPTIONS: {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
      }
    };
  },
  data() {
    return {
      count: 0,
      map: null,
      mapConfig: config.app.map,
      selectedVillage: null,
      selectedIncidents: {}, // regionId -> markerId
      villages: [],
      polygons: {}, // regionId -> polygonObj
      markers: {}, // markerId -> markerObj
      clipboardWorks: navigator.clipboard !== undefined
    }
  }, methods: {
    getTileUrl() {
      this.mapConfig.tiles.current = this.mapConfig.tiles.satellite;
      return `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
      // return `https://api.mapbox.com/styles/v1/${this.mapConfig.tiles.current}/tiles/256/{z}/{x}/{y}@2x?access_token=${this.mapConfig.mapboxToken}`;
    },
    initMap: function () {
      // let greenIcon = L.icon({
      //   // iconUrl: 'leaf-green.png',
      //   // shadowUrl: 'leaf-shadow.png',
      //   html: `<div class='marker-pin'>XX</div>`,

      //   iconSize: [38, 95], // size of the icon
      //   shadowSize: [50, 64], // size of the shadow
      //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      //   shadowAnchor: [4, 62],  // the same for the shadow
      //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      // });
      // let divIcon = L.divIcon({ className: 'marker-pin' });

      // let points = config.data.points.map(p => [p.lat, p.lon, p.place]);

      // calling map
      this.map = L.map("map", { ...this.mapConfig, zoomControl: false }).setView([this.mapConfig.anchor.lat, this.mapConfig.anchor.lon], this.mapConfig.startZoom);
      L.control.scale({ position: 'topright' }).addTo(this.map); // adds scale
      if (!L.Browser.mobile) {
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);
      }

      L.tileLayer(this.getTileUrl(), {
        //TODO: if OSM is used
        // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // loop that adds many markers to the map
      // for (let i = 0; i < points.length; i++) {
      //   const [lat,
      //     lng,
      //     popupText] = points[i];

      //   new L.marker([lat, lng], { icon: divIcon }).bindPopup(popupText).addTo(this.map);
      // }
    },
    populateMap: async function () {
      let data = await fetch('/data.json').then(async data => await data.json());
      console.log(data.villages)

      const villageIds = data?.villages?.map(v => v.id).filter(id => id);
      assert(villageIds.length > 0 && villageIds.length == [...new Set(villageIds)].length, `Each village must have a unique ID`)
      // enrich some calculations into each village object
      this.villages = data.villages.map(v => {
        v.incidents = v.incidents.map((incident, index) => {
          this.selectedIncidents[v.id] = null;
          this.selectedIncidents[v.id] = null;
          return { ...incident, id: `${v.id}-${index}` }
        })
        return {
          ...v,
          incidentsDestruction: v.incidents.filter(i => i.tag == 'destruction'),
          incidentsMilitary: v.incidents.filter(i => i.tag == 'military'),
        }
      });

      this.villages.forEach(village => {
        this.addBeforeAfter(village);
        this.addPolygon(village.id);
        this.addMarkers(village);
      })
    },
    addBeforeAfter: function (village) {
      if (village.satellite === undefined) return;

      const paneId = `satellite-pane-${village.id}`;
      let imagePane = this.map.createPane(paneId);
      // imagePane.style.zIndex = 650;
      // imagePane.style.pointerEvents = 'none';
      const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
      let visible = 0;

      let overlayBefore, overlayAfter;
      console.log(`village ${village.id} satellite bounds: ${village?.satellite?.bounds}`)
      if (village.satellite.before) {
        const bf = village.satellite.before;
        overlayBefore = L.imageOverlay(
          bf.url,
          L.latLngBounds(village.satellite.bounds), {
          opacity: 0.8,
          errorOverlayUrl: errorOverlayUrl,
          alt: `Satellite view of ${village?.name} on ${bf.date}`,
          interactive: true,
          pane: paneId
        }).addTo(this.map);
      }
      if (village.satellite.after) {
        const af = village.satellite.after;
        overlayAfter = L.imageOverlay(
          af.url,
          L.latLngBounds(village.satellite.bounds), {
          opacity: 0,
          errorOverlayUrl: errorOverlayUrl,
          alt: `Satellite view of ${village?.name} on ${af.date}`,
          interactive: true,
          pane: paneId
        }).addTo(this.map);
      }

      imagePane.addEventListener('click', () => {
        if (visible == 0) {
          overlayBefore?.setOpacity(0)
          overlayAfter?.setOpacity(0.8)
        } else if (visible == 1) {
          overlayBefore?.setOpacity(0.8)
          overlayAfter?.setOpacity(0)
        }
        visible = (visible + 1) % 2;
      });
    },
    addPolygon: async function (regionId) {
      let data = await fetch(`/polygons/${regionId}.geojson`).then(async data => await data.json());
      this.polygons[regionId] = L.geoJSON(data).addTo(this.map);
      // clicking on a polygon selects it
      this.polygons[regionId].on("click", () => {
        this.selectedVillage = regionId;
      })
    },
    addMarkers: function (village) {
      const iconDestruction = L.divIcon({ className: 'marker-pin', iconSize: [22, 22] });
      // const iconDestructionHover = L.divIcon({ className: 'marker-pin', iconSize:[22,22] });
      village.incidents.forEach(incident => {
        let marker = new L.marker([incident.lat, incident.lon], { icon: iconDestruction }).addTo(this.map);
        marker.on("click", () => {
          this.selectedVillage = village.id;
          this.selectedIncidents[village.id] = incident.id;
        })
        this.markers[incident.id] = marker;
      })
    },
    copyText(_, text) {
      if (this.clipboardWorks) {
        try {
          navigator.clipboard.writeText(text);
          this.toast("coordinates copied to clipboard", this.TOAST_OPTIONS)
        } catch (error) {
          console.log(`Could not copy: ${error}`)
        }
      }
    }
  },
  watch: {
    selectedVillage: function (v, prevV) {
      this.selectedIncidents[prevV] = null; // reset the open incident/marker
      this.selectedIncidents[prevV] = null; // reset the open incident/marker
      const leftSidebarWidth = this.$refs.sidebar.$el?.offsetWidth || 0;
      const sideBarRect = this.$refs.sidebar.$el?.getBoundingClientRect() || {};
      const titleOffsetTop = this.$refs.titleExpand.$el?.nextElementSibling?.getBoundingClientRect()?.bottom || 0;
      if (this.polygons[v]) {
        this.map.fitBounds(this.polygons[v].getBounds(), {
          paddingTopLeft: [this.mdAndDown ? 0 : leftSidebarWidth, titleOffsetTop],
          paddingBottomRight: [0, this.mdAndDown ? window.innerHeight - sideBarRect?.top : 48],
          animate: true,
          duration: 1.5,
          // easeLinearity: 0.25
        })
      }
    },
    selectedIncidents: {
      handler: function (sI) {
        if (sI[this.selectedVillage] !== undefined) {
          setTimeout(() => {
            console.log(`SCROLLING #${sI[this.selectedVillage]}`)
            document.getElementById(sI[this.selectedVillage])?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" })
          }, 250);
        }
      },
      deep: true
    },
  },
  mounted: function () {
    this.initMap();
    this.populateMap();
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
</script>
<style lang="scss">
@import '../styles/settings.scss';
@import '../styles/map.scss';

#map {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: $zMed;
}

#sidebar {
  opacity: $opacityMax;
  z-index: $zMax + 10;
  overflow-y: auto;

  @media (min-width: 600px) {
    position: absolute;
    top: 20%;
    width: 35%;
    max-height: 50vh;

    .v-container {
      height: 50vh;
    }
  }

  @media (max-width: 600px) {
    position: fixed;
    // width: 100%;
    left: 0;
    right: 0;
    bottom: 48px;
    height: 40vh;
    max-height: 40vh;
    margin-left: auto;
    margin-right: auto;

    .v-container {
      height: 50vh;
    }
  }

  h3.sticky {
    // position: -webkit-sticky;
    // /* Safari */
    // position: sticky;
    // top: 0;
  }

  .v-card-text {
    height: 100%;
    // overflow-y: auto;
  }
}

.village-tabs {
  z-index: $zMax;
  opacity: $opacityMax;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.media-panel .v-expansion-panel-text__wrapper {
  padding: 0;
}

.leaflet-marker-icon.marker-pin {
  border: 2px solid yellow;
  background-color: green;
  width: $markerRadius;
  height: $markerRadius;
  border-radius: $markerRadius;

  &:hover {
    background-color: red;
  }

  &:active {
    background-color: orange;
  }
}

.chip-military,
.chip-destruction {
  border-radius: 6px;
}

.chip-destruction {
  border: 1px solid $destructionColor;
}

.chip-military {
  border: 1px solid $militaryColor;
}

/* Leaflet crispness override */
.leaflet-container .leaflet-overlay-pane svg,
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer {
  max-width: none !important;
  /* Preserve crisp pixels with scaled up images */
  image-rendering: optimizeSpeed;
  /* Legal fallback */
  image-rendering: -moz-crisp-edges;
  /* Firefox        */
  image-rendering: -o-crisp-edges;
  /* Opera          */
  image-rendering: -webkit-optimize-contrast;
  /* Safari         */
  image-rendering: optimize-contrast;
  /* CSS3 Proposed  */
  image-rendering: crisp-edges;
  /* CSS4 Proposed  */
  image-rendering: pixelated;
  /* CSS4 Proposed  */
  -ms-interpolation-mode: nearest-neighbor;
  /* IE8+           */
}
</style >
