<template>
  <title-expand ref="titleExpand" />
  <!-- <sidebar /> -->

  <v-card :style="selectedVillage ? '' : { zIndex: 0 }" fixed raised class="ma-1" id="sidebar" ref="sidebar">
    <v-container class="pa-0">
      <v-card-text>
        <v-window v-model="selectedVillage">
          <v-window-item class="ma-0 mb-10" v-for="v in villages" :value="v.id" :key="v.id">
            <h3 class="text-center mb-3 mt-3 text-primary">
              {{ v.name_en }} / {{ v.name_ru }}
            </h3>
            <v-btn variant="plain" dark @click="selectedVillage = null" class="close-button">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <p class="ma-2">
              {{ v.description }}
            </p>
            <span v-if="satellites[v.id]">
              <v-divider class="mb-4 mt-4"></v-divider>
              <p class="ma-2">
                <!-- <v-icon icon="mdi-satellite-variant"></v-icon> -->
                Comparing satellite imagery between
                <a href="#">{{ v?.satellite?.before?.date }}</a>
                and
                <a href="#">{{ v?.satellite?.after?.date }}</a>
                reveals <strong class="text-secondary"> {{ 'TODO FROM FILES' }}.</strong>
              </p>

              <div class="d-flex justify-center ma-4">
                <v-btn prepend-icon="mdi-satellite-variant" color="white" variant="outlined"
                  @click="viewSat($event, v.id, selectedSat?.active == 'before' ? 'after' : 'before')">view SAT {{
                    selectedSat?.active == 'before' ? 'after' : 'before'
                  }}</v-btn>
              </div>
              <div v-if="selectedSat" class="text-center ma-2">
                <!-- {{ satellites[selectedSat.villageId]["before"]?.data?.date }} -->
                <!-- {{ satellites[selectedSat.villageId]["after"]?.data?.date }} -->
                <p><v-code class="">
                    Showing satellite imagery from
                    {{ satellites[v.id][satellites[selectedSat.villageId]?.active]?.data?.date }}
                  </v-code>
                </p>
              </div>
            </span>

            <v-divider class="ma-2 mb-6 mt-6"></v-divider>
            <h3 v-if="v.incidents.length" class="mt-4 mb-2 text-center">
              Geolocated {{ v.incidents.length == 1 ? "incident" : "incidents" }}: {{ v.incidents.length }}
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
                    <video v-if="link.archive" width="" class="mt-2 mb-2" style="width: 100%;" controls>
                      <source :src="link.archive" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                    <p v-if="!link.archive">No archived content</p>
                    <v-btn v-if="link.src" variant="outlined" color="secondary" class="ma-1" :href="link.src"
                      title="open original source" target="_blank" append-icon="mdi-open-in-new">
                      source {{ linkIndex + 1 }}
                    </v-btn>
                    <v-divider v-if="i.links.length > linkIndex + 1" class="mb-3 mt-3"></v-divider>
                  </div>


                  <v-btn variant="outlined" class="ma-1" append-icon="mdi-open-in-new"
                    :href="`http://maps.google.com/maps?t=k&q=${i.lat},${i.lon}`" target="_blank"
                    title="show coordinates on google maps">
                    GMaps
                  </v-btn>
                  <v-btn v-if="clipboardWorks" variant="outlined" class="ma-1"
                    @click="copyText($event, `${i.lat},${i.lon}`)" append-icon="mdi-content-copy"
                    title="copy incident coordinates">
                    {{ i.lat }},{{ i.lon }}
                  </v-btn>
                  <v-chip v-if="!clipboardWorks" label class="ma-1">
                    {{ i.lat }},{{ i.lon }}
                  </v-chip>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-window-item>


        </v-window>
      </v-card-text>
    </v-container>
  </v-card>

  <v-card class="village-tabs ma-0 mb-0 ml-auto mr-auto" :class="mdAndDown ? 'w-100' : 'w-50'">
    <v-tabs class="ml-auto mr-auto" v-model="selectedVillage" bg-color="primary" center-active show-arrows
      align-tabs="center" v-on:update:model-value="fitPolygon">
      <v-tab v-for="v in villages" :value="v.id" :key="v.id">
        <v-badge v-if="v.id == selectedVillage" :content="v.incidents.length" floating color="error">
          {{ v.name_en }}
        </v-badge>
        <span v-if="v.id != selectedVillage">{{ v.name_en }}</span>
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

const iconDestruction = L.divIcon({ className: 'marker-pin', iconSize: [22, 22] });
const iconDestructionActive = L.divIcon({ className: 'marker-pin-active', iconSize: [22, 22] });

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
      selectedIncidents: {}, // villageId -> markerId,
      selectedSat: null,
      villages: [],
      polygons: {}, // villageId -> polygonObj
      markers: {}, //villageId -> markerBound : for fitBounds
      satellites: {},
      clipboardWorks: navigator.clipboard !== undefined,

    }
  }, methods: {
    getTileUrl() {
      this.mapConfig.tiles.current = this.mapConfig.tiles.satellite;
      return `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
      // return `https://api.mapbox.com/styles/v1/${this.mapConfig.tiles.current}/tiles/256/{z}/{x}/{y}@2x?access_token=${this.mapConfig.mapboxToken}`;
    },
    initMap: function () {
      // creating the map
      this.map = L.map("map", { ...this.mapConfig, zoomControl: false }).setView([this.mapConfig.anchor.lat, this.mapConfig.anchor.lon], this.mapConfig.startZoom);
      // adding scale and zoom if desktop
      if (!L.Browser.mobile) {
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);
        L.control.scale({ position: 'bottomleft' }).addTo(this.map); // adds scale
      }

      L.tileLayer(this.getTileUrl(), {
        //TODO: if OSM is used
        // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

    },
    populateMap: async function () {
      let data = await fetch('./data.json').then(async data => await data.json());
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
        this.addPolygon(village.id);
        this.addMarkers(village);
        this.addBeforeAfterSat(village);
      })
    },
    addBeforeAfterSat: function (village) {
      if (village.satellite === undefined) return;
      if (!village.satellite.before || !village.satellite.after) return;

      const paneId = `satellite-pane-${village.id}`;
      let imagePane = this.map.createPane(paneId);
      const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';

      this.satellites[village.id] = { before: {}, after: {}, active: null, display: () => { } };
      console.log(`village ${village.id} satellite bounds: ${village?.satellite?.bounds}`)

      // image overlay for BEFORE
      const bf = village.satellite.before;
      this.satellites[village.id].before.data = bf;
      this.satellites[village.id].active = "before";
      this.satellites[village.id].before.overlay = L.imageOverlay(
        bf.url,
        L.latLngBounds(village.satellite.bounds), {
        opacity: 0.8,
        errorOverlayUrl: errorOverlayUrl,
        alt: `Satellite view of ${village?.name} on ${bf.date}`,
        interactive: true,
        pane: paneId
      }).addTo(this.map);
      // image overlay for AFTER
      const af = village.satellite.after;
      this.satellites[village.id].after.data = af;
      this.satellites[village.id].active = this.satellites[village.id].active || "after"; //default if only after
      this.satellites[village.id].after.overlay = L.imageOverlay(
        af.url,
        L.latLngBounds(village.satellite.bounds), {
        opacity: 0,
        errorOverlayUrl: errorOverlayUrl,
        alt: `Satellite view of ${village?.name} on ${af.date}`,
        interactive: true,
        pane: paneId
      }).addTo(this.map);
      this.satellites[village.id].display = () => {
        if (this.satellites[village.id].active == "before") {
          this.satellites[village.id].before?.overlay?.setOpacity(0.8);
          this.satellites[village.id].after?.overlay?.setOpacity(0);
        } else {
          this.satellites[village.id].before?.overlay?.setOpacity(0);
          this.satellites[village.id].after?.overlay?.setOpacity(0.8);
        }
      }

      imagePane.addEventListener('click', () => {
        if (this.satellites[village.id].active == "before") {
          this.satellites[village.id].active = "after";
        } else {
          this.satellites[village.id].active = "before";
        }
        this.selectedVillage = village.id;
        this.selectedSat = { villageId: village.id, active: this.satellites[village.id].active };
        this.satellites[village.id].display();
      });
    },
    addPolygon: async function (villageId) {
      let data = await fetch(`./polygons/${villageId}.geojson`).then(async data => await data.json());
      this.polygons[villageId] = L.geoJSON(data).addTo(this.map);
      // clicking on a polygon selects it
      this.polygons[villageId].on("click", () => {
        this.selectedVillage = villageId;
        this.map.fitBounds(this.polygons[villageId].getBounds(), this.getFitBoundsOptions());
      })
    },
    addMarkers: function (village) {
      // const iconDestructionHover = L.divIcon({ className: 'marker-pin', iconSize:[22,22] });
      village.incidents.forEach(incident => {
        let marker = new L.marker([incident.lat, incident.lon], { icon: iconDestruction });
        let group = new L.FeatureGroup(); // used for fitBounds
        group.addLayer(marker).addTo(this.map);
        marker.on("click", () => {
          this.selectedVillage = village.id;
          this.selectedIncidents[village.id] = incident.id;
          this.map.fitBounds(group.getBounds(), this.getFitBoundsOptions());
        })
        this.markers[incident.id] = { marker, group };
      })
    },
    viewSat: function (_, villageId, active) {
      this.satellites[villageId].active = active;
      this.selectedSat = { villageId, active };
      this.map.fitBounds(this.satellites[this.selectedSat.villageId]?.before?.overlay?.getBounds(), this.getFitBoundsOptions())
    },
    fitPolygon: function (villageId) {
      if (this.polygons[villageId]) {
        this.map.fitBounds(this.polygons[villageId].getBounds(), this.getFitBoundsOptions())
      }
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
    },
    getFitBoundsOptions() {
      // calculates necessary padding options for map.fitBounds to exclude menus and bars.
      const leftSidebarWidth = this.$refs.sidebar.$el?.offsetWidth || 0;
      const sideBarRect = this.$refs.sidebar.$el?.getBoundingClientRect() || {};
      const titleOffsetTop = this.$refs.titleExpand.$el?.nextElementSibling?.getBoundingClientRect()?.bottom || 0;
      return {
        paddingTopLeft: [this.mdAndDown ? 0 : leftSidebarWidth, titleOffsetTop],
        paddingBottomRight: [0, this.mdAndDown ? window.innerHeight - sideBarRect?.top : 48],
        animate: true,
        duration: 1.5,
        // easeLinearity: 0.25
      }
    }
  },
  watch: {
    selectedVillage: function (villageId, prevV) {
      this.selectedIncidents[prevV] = null; // reset the open incident/marker
      Object.keys(this.polygons).forEach(vId => {
        if (vId == villageId) {
          this.polygons[vId].setStyle({
            fillColor: "#FFAB00",
            weight: 2,
            color: "#000",
            fillOpacity: 0.2,
          });
        } else {
          this.polygons[vId].setStyle({
            fillColor: "#000",
            weight: 2,
            color: "#000",
            fillOpacity: 0.1,
          });
        }
      })
    },
    selectedIncidents: {
      handler: function (sI) {
        if (sI[this.selectedVillage]) {
          // fit map to marker
          this.map.fitBounds(this.markers[sI[this.selectedVillage]].group.getBounds(), { ...this.getFitBoundsOptions(), maxZoom: 15 });
          Object.keys(this.markers).forEach(incidentId => {
            if (incidentId == sI[this.selectedVillage]) {
              this.markers[incidentId].marker.setIcon(iconDestructionActive)
            } else {
              this.markers[incidentId].marker.setIcon(iconDestruction)
            }
          })
          // scroll to content on sidebar
          setTimeout(() => {
            console.log(`SCROLLING #${sI[this.selectedVillage]}`)
            document.getElementById(sI[this.selectedVillage])?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" })
          }, 250);
        }
      },
      deep: true
    },
    selectedSat: {
      handler: function (ss) {
        this.satellites[ss.villageId]?.display();
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
    max-height: 60vh;

    .v-container {
      height: 60vh;
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

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
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

.leaflet-marker-icon.marker-pin,
.leaflet-marker-icon.marker-pin-active {
  width: $markerRadius;
  height: $markerRadius;
  border-radius: $markerRadius;
}

.leaflet-marker-icon.marker-pin {
  border: 2px solid $yellow;
  background-color: #689F38;

  &:hover {
    background-color: red;
  }

  &:active {
    background-color: orange;
  }
}

.leaflet-marker-icon.marker-pin-active {
  border: 2px solid $yellow;
  background-color: red;
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
