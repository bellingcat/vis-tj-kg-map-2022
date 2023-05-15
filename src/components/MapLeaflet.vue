<template>
  <title-expand ref="titleExpand" />
  <options-button :startTile="currentTileName" @new-tile="setTileLayer" />
  <!-- <sidebar /> -->

  <v-card :style="selectedVillage ? '' : { zIndex: 0 }" fixed raised class="ma-1" id="sidebar" ref="sidebar">
    <v-container class="pa-0">
      <v-card-text>
        <v-window v-model="selectedVillage">
          <v-window-item class="ma-0 mb-10" v-for="v in villages" :value="v.id" :key="v.id">
            <h3 class="text-center mb-3 mt-3 text-primary">
              {{ $t(`villages.${v.id}.name`) }}
            </h3>
            <v-btn variant="plain" dark @click="selectedIncidents[selectedVillage] = null; selectedVillage = null;"
              class="close-button">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <p class="ma-2">
              {{ $t(`villages.${v.id}.description`) }}
            </p>
            <span v-if="satellites[v.id]">
              <v-divider class="mb-4 mt-4"></v-divider>
              <p class="ma-2"
                v-html="$t('satellite.compareText', { before: v?.satellite?.before?.date, after: v?.satellite?.after?.date })">
              </p>

              <div class="d-flex justify-center ma-4">
                <v-btn prepend-icon="mdi-satellite-variant" color="white" variant="outlined"
                  @click="viewSat($event, v.id, selectedSat?.active == 'after' ? 'before' : 'after')">
                  {{ selectedSat?.active == 'after' ? $t('satellite.btnBefore') : $t('satellite.btnAfter') }}
                </v-btn>
              </div>
              <div v-if="selectedSat" class="text-center ma-2">
                <p><v-code>
                    {{ $t('satellite.showingImagery', {
                      date:
                        satellites[v.id][satellites[selectedSat.villageId]?.active]?.data?.date
                    }) }}
                  </v-code>
                </p>
              </div>
            </span>

            <v-divider class="ma-2 mb-6 mt-6"></v-divider>
            <h3 class="mt-4 mb-2 text-center">
              {{ $t('incidents.countVisible', v.incidents.filter(filterActiveIncident).length) }}
            </h3>

            <v-expansion-panels v-model="this.selectedIncidents[v.id]" variant="accordion">
              <v-expansion-panel v-for="i in v.incidents.filter(filterActiveIncident)" :key="i.id" :value="i.id"
                :id="i.id">
                <v-expansion-panel-title class="pa-0 pl-1 pr-1">
                  <!-- <v-icon :icon="x.key=='military'?'mdi-knife-military':''"></v-icon> -->
                  <!-- <small class="mr-2 pa-1" :class="`chip-${i.tag}`">{{ i.tag }}</small> -->
                  <small class="mr-2 pa-1 pl-2 pr-2 chip-tkid" title="ID">TK-{{ i.tkid }}</small>
                  <v-icon :icon="impactTabs[i.impact]?.icon" :color="tagTabs[i.tag]?.color" class="mr-3"></v-icon>
                  {{ $t(`incidents.all.${i.id}.description`) || $t(`incidents.defaultName`, { index: i.index + 1 }) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text class="pa-0 pb-6 media-panel">

                  <v-code v-if="!i.links.length" class="ma-2 mt-6 mb-6 text-center">{{ $t('incidents.panel.noSources')
                  }}</v-code>
                  <div v-for="(link, linkIndex) in i.links" :key="linkIndex">
                    <!-- TODO: if this is an IMAGE and not a VIDEO -->
                    <video v-if="link.archive" class="mt-2 mb-2 video-embed" style="width: 100%;" controls>
                      <source :src="link.archive" type="video/mp4">
                      {{ $t('incidents.panel.videoNotSupported') }}
                    </video>

                    <iframe v-if="isValidYoutube(link.src)" class="video-embed" :src="youtubeEmbed(link.src)"
                      :title="$t('incidents.panel.youtubeTitle')" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>

                    <iframe v-if="isValidTelegram(link.src)" :title="$t('incidents.panel.telegramTitle')"
                      class="video-embed" :src="telegramEmbed(link.src)" height="240px" width="100%" :id="link.src" />

                    <!-- TODO: embed if image jpg... -->

                    <!-- <p v-if="!link.archive">No archived content</p> -->
                    <v-btn v-if="link.src" variant="outlined" color="secondary" class="ma-1" :href="link.src"
                      :title="$t(`incidents.panel.sourceButtonTitle`)" target="_blank" append-icon="mdi-open-in-new">
                      {{ $t(`incidents.panel.sourceButton`, { index: linkIndex + 1 }) }} -
                      {{ getDomain(link.src) }}

                      <v-tooltip v-if="link.time" activator="parent" location="top" open-delay="400">
                        {{ $t(`incidents.panel.videoStartAt`, { seconds: link.time }) }}
                      </v-tooltip>
                    </v-btn>
                    <v-divider v-if="i.links.length > linkIndex + 1" class="mb-3 mt-3"></v-divider>
                  </div>


                  <v-btn variant="outlined" class="ma-1" append-icon="mdi-open-in-new"
                    :href="`http://maps.google.com/maps?t=k&q=${i.lat},${i.lon}`" target="_blank"
                    :title="$t(`incidents.panel.gMapsTitle`)">
                    {{ $t(`incidents.panel.gMapsButton`) }}
                  </v-btn>
                  <v-btn v-if="clipboardWorks" variant="outlined" class="ma-1"
                    @click="copyText($event, `${i.lat},${i.lon}`)" append-icon="mdi-content-copy"
                    :title="$t(`incidents.panel.copyCoordsTitle`)">
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
      align-tabs="center" v-on:update:model-value="fitPolygon" mandatory="false">
      <v-tab v-for="v in villages" :value="v.id" :key="v.id">
        <v-badge @mouseover="hoverVillage = v.id" @mouseleave="hoverVillage = null"
          :content="v.incidents.filter(this.filterActiveIncident).length" floating
          :color="v.id == selectedVillage ? 'black' : 'blue-grey'">
          {{ $t(`villages.${v.id}.name`) }}
        </v-badge>
      </v-tab>
    </v-tabs>


    <div class="d-flex align-center justify-center pa-0">
      <!-- <div class="d-flex align-center pa-0 ml-2"> -->
      <!-- <v-label v-if="!smAndDown" class="pr-4">Buildings of Interest:</v-label> -->
      <v-slide-group show-arrows>
        <v-btn-toggle v-model="enabledTags" divided multiple>
          <v-slide-group-item v-for="(tagProps, tag) in tagTabs" :key="tag" :selected-class="`${tag}-selected`">
            <v-btn :value="tag" :key="tag" density="compact" :size="smAndDown ? 'x-small' : 'small'" variant="tonal"
              :color="tagProps.color">
              <div class="d-flex align-center flex-column justify-center">
                <!-- <v-icon :icon="tagProps.icon"></v-icon> -->
                {{ $t(`buildingLocation.${tag}.name`) }}
              </div>
              <v-tooltip activator="parent" location="top" open-delay="400" z-index="3000">{{
                $t(`buildingLocation.${tag}.explanation`) }}</v-tooltip>
            </v-btn>
          </v-slide-group-item>
        </v-btn-toggle>
      </v-slide-group>
    </div>


    <div class="d-flex align-center justify-center pa-0">
      <!-- <div class="d-flex align-center pa-0 ml-2"> -->
      <!-- <v-label v-if="!smAndDown" class="pr-4">Impact:</v-label> -->
      <v-slide-group show-arrows>
        <v-btn-toggle v-model="enabledImpacts" divided multiple color="blue-grey-darken-2">
          <v-slide-group-item v-for="(impactProps, impact) in impactTabs" :key="impact">
            <v-btn :value="impact" :key="impact" :selected-class="`${impact}-selected v-tab--selected`" density="compact"
              :size="smAndDown ? 'x-small' : 'small'">
              <div class="d-flex align-center flex-column justify-center">
                <v-icon :icon="impactProps.icon" :color="enabledImpacts.includes(impact) ? 'yellow' : ''"></v-icon>{{
                  $t(`impact.${impact}.name`) }}
              </div>
            </v-btn>
          </v-slide-group-item>
        </v-btn-toggle>
      </v-slide-group>
    </div>
  </v-card>

  <div id="map"></div>
</template>

<script>

import { useDisplay, useLocale } from 'vuetify'
import { useToast } from "vue-toastification";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import config from "../../config";
import TitleExpand from "./TitleExpand.vue"
import OptionsButton from "./OptionsButton.vue"
import MarkerUtils from "./js/MarkerUtils.js";
import UrlUtils from "./js/UrlUtils.js";
import { i18n } from '../plugins/vuetify'

export default {
  components: { TitleExpand, OptionsButton },
  setup() {
    const { mdAndDown, smAndDown } = useDisplay();
    const { current } = useLocale();
    return {
      current, mdAndDown, smAndDown, toast: useToast()
    };
  },
  data() {
    return {
      count: 0,
      map: null,
      toastOptions: config.app.ui.toastOptions,
      mapConfig: config.app.map,
      villages: config.villages?.map(v => { return { ...v, incidents: [] } }),
      selectedVillage: null,
      selectedIncidents: {}, // villageId -> markerId,
      selectedSat: null,
      polygons: {}, // villageId -> polygonObj
      markers: {}, //villageId -> markerBound : for fitBounds
      satellites: {},
      clipboardWorks: navigator.clipboard !== undefined,
      tiles: config.app.map.tiles.default,
      hoverVillage: null,
      tagTabs: {
        "socialmedia": { color: "#00E5FF" }, //, icon: "mdi-map-marker-multiple"
        "satellite": { color: "#81C784" } // icon: "mdi-satellite-variant",
      },
      impactTabs: {
        "civinfra": { icon: "mdi-town-hall" },
        "privateprop": { icon: "mdi-home-city" },
        "borderpost": { icon: "mdi-sign-caution" },
      },
      enabledTags: ["socialmedia"],
      enabledImpacts: ["civinfra", "privateprop", "borderpost"],
      currentTileName: config.app.map.startTile,
      currentTile: null,
    }
  }, methods: {
    ...UrlUtils,
    setTileLayer(tileName) {
      // remove previous tile if it exists
      if (this.currentTile != null) {
        this.currentTile.remove();
      }

      this.currentTileName = tileName || this.currentTileName;
      let tileUrl = this.mapConfig.tiles[this.currentTileName](this.mapConfig.mapboxToken);
      // add new tile
      this.currentTile = L.tileLayer(tileUrl, {
        // attribution: tileUrl.includes("openstreetmap") ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' : tileUrl.includes("mapbox")
        attribution: "&copy;<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
      }).addTo(this.map);
    },
    getTileUrl() {
      return this.mapConfig.tiles[this.currentTileName](this.mapConfig.mapboxToken)
    },
    initMap: function () {
      // creating the map
      this.map = L.map("map", { ...this.mapConfig, zoomControl: false }).setView([this.mapConfig.anchor.lat, this.mapConfig.anchor.lon], this.mapConfig.startZoom);
      // adding scale and zoom if desktop
      if (!L.Browser.mobile) {
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);
        L.control.scale({ position: 'bottomleft' }).addTo(this.map); // adds scale
      }
      this.setTileLayer();
    },
    populateMap: async function () {
      let incidents = await fetch('./incidents.json').then(async data => await data.json());

      const villageIds = this.villages?.map(v => v.id).filter(id => id);
      assert(villageIds.length > 0 && villageIds.length == [...new Set(villageIds)].length, `Each village must have a unique ID`)
      // enrich some calculations into each village object
      this.villages = this.villages.map(v => {
        v.incidents = incidents[v.id]?.map((incident, index) => {
          this.selectedIncidents[v.id] = null;
          return { ...incident, id: `${v.id}-${index}`, index: index }
        }) || [];
        return {
          ...v,
          incidentsDestruction: v.incidents.filter(i => i.tag == 'destruction'),
          incidentsMilitary: v.incidents.filter(i => i.tag == 'military'),
        }
      });
      this.addIncidentsTranslations(this.villages);

      this.villages.forEach(village => {
        this.addPolygon(village.id);
        this.addMarkers(village);
        this.addBeforeAfterSat(village);
      })
      this.refreshVisibleIncidents();
    },
    addBeforeAfterSat: function (village) {
      if (village.satellite === undefined) return;
      if (!village.satellite.before || !village.satellite.after) return;

      const paneId = `satellite-pane-${village.id}`;
      let imagePane = this.map.createPane(paneId);
      const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';

      this.satellites[village.id] = { before: {}, after: {}, active: null, display: () => { } };
      // console.log(`village ${village.id} satellite bounds: ${village?.satellite?.bounds}`)

      // image overlay for BEFORE
      const bf = village.satellite.before;
      this.satellites[village.id].before.data = bf;
      this.satellites[village.id].active = "before";
      this.satellites[village.id].before.overlay = L.imageOverlay(
        bf.url,
        L.latLngBounds(village.satellite.bounds), {
        opacity: 0.8,
        errorOverlayUrl: errorOverlayUrl,
        alt: this.$t(`satellite.altText`, { village: this.$t(`villages.${village.id}.name`), date: bf.date }),
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
        alt: this.$t(`satellite.altText`, { village: this.$t(`villages.${village.id}.name`), date: af.date }),
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
      const clickCoords = { x: 0, y: 0, delta: 10 }; // used not to change imagery on map drag
      imagePane.addEventListener('mousedown', (e) => {
        clickCoords.x = e.pageX;
        clickCoords.y = e.pageY;
      })
      imagePane.addEventListener('mouseup', (e) => {
        const diffX = Math.abs(e.pageX - clickCoords.x);
        const diffY = Math.abs(e.pageY - clickCoords.y);
        if (diffX < clickCoords.delta && diffY < clickCoords.delta) {
          // Click and not drag
          if (this.satellites[village.id].active == "before") {
            this.satellites[village.id].active = "after";
          } else {
            this.satellites[village.id].active = "before";
          }
          this.selectedVillage = village.id;
          this.selectedSat = { villageId: village.id, active: this.satellites[village.id].active };
          this.satellites[village.id].display();
        }
      });
    },
    addPolygon: async function (villageId) {
      let data = await fetch(`./polygons/${villageId}.geojson`).then(async data => await data.json());
      const villageBounds = L.geoJSON(data).getBounds();
      const circleCenter = villageBounds.getCenter();
      const circleRadius = Math.max(villageBounds.getSouthWest().distanceTo(villageBounds.getNorthEast()), villageBounds.getNorthWest().distanceTo(villageBounds.getSouthEast())) / 2;

      this.polygons[villageId] = L.circle(circleCenter, { radius: circleRadius }).addTo(this.map);
      this.polygons[villageId].setStyle({
        fillColor: "#000",
        weight: 2,
        color: "#000",
        fillOpacity: 0.1,
      });
      // clicking on a polygon selects it
      this.polygons[villageId].on("click", () => {
        this.selectedVillage = villageId;
        this.map.flyToBounds(this.polygons[villageId].getBounds(), this.getFitBoundsOptions());
      })
    },
    addMarkers: function (village) {
      console.log(`${village.id} has ${village.incidents.length} incidents`)
      village.incidents.forEach(incident => {
        let marker = null;
        try {
          marker = new L.marker([incident.lat, incident.lon], { icon: MarkerUtils.getMarkerSvg(incident, false) });
        } catch (error) {
          console.error(error);
          console.warn(incident);
          return;
        }
        let group = new L.FeatureGroup(); // used for fitBounds
        group.addLayer(marker).addTo(this.map);
        marker.on("click", () => {
          console.log(`Marker clicked: ${JSON.stringify(incident)}`)
          this.selectedVillage = village.id;
          this.selectedIncidents[village.id] = incident.id;
        })
        // marker.on('mouseover', function () {
        //   // this._icon.classList.add(hoverClass);
        // });
        // marker.on('mouseout', function () {
        //   // this._icon.classList.remove(hoverClass);
        // });
        this.markers[incident.id] = { marker, group, incident };
      })
    },
    viewSat: function (_, villageId, active) {
      this.satellites[villageId].active = active;
      this.selectedSat = { villageId, active };
      // only fitBounds to satellite if not in viewport yet Or too zoomed-out
      if (!this.map.getBounds().intersects(this.satellites[this.selectedSat.villageId]?.before?.overlay?.getBounds()) || this.map.getZoom() <= 15) {
        this.map.flyToBounds(this.satellites[this.selectedSat.villageId]?.before?.overlay?.getBounds(), this.getFitBoundsOptions())
      }
    },
    fitPolygon: function (villageId) {
      if (this.polygons[villageId]) {
        console.log(`FITTING POLYGON ${villageId}`)
        this.map.flyToBounds(this.polygons[villageId].getBounds(), this.getFitBoundsOptions())
      }
    },
    copyText(_, text) {
      if (this.clipboardWorks) {
        try {
          navigator.clipboard.writeText(text);
          this.toast(this.$t('incidents.panel.copyCoordsSuccess'), this.toastOptions);
        } catch (error) {
          console.log(`Could not copy: ${error}`)
          this.toast.error(this.$t('incidents.panel.copyCoordsError'), this.toastOptions);
        }
      }
    },
    getFitBoundsOptions() {
      // calculates necessary padding options for map.flyToBounds to exclude menus and bars.
      const leftSidebarWidth = this.$refs.sidebar.$el?.offsetWidth || 0;
      const sideBarRect = this.$refs.sidebar.$el?.getBoundingClientRect() || {};
      const titleOffsetTop = this.$refs.titleExpand.$el?.nextElementSibling?.getBoundingClientRect()?.bottom || 0;
      return {
        paddingTopLeft: [this.smAndDown ? 0 : leftSidebarWidth, titleOffsetTop],
        paddingBottomRight: [0, this.smAndDown ? window.innerHeight - sideBarRect?.top : 48],
        animate: true,
        duration: 1.0,
        easeLinearity: 0.75
      }
    },
    convertToEmbedUrl: function (url) {
      const videoIdMatch = url.match(/youtube.com\/watch\?v=([\w-]{11})(&t=(\d+))?/) || url.match(/youtu.be\/([\w-]{11})(\?t=(\d+))?/);
      if (videoIdMatch) {
        const videoId = videoIdMatch[1];
        const startTime = videoIdMatch[3];
        let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        if (startTime) {
          embedUrl += `?start=${startTime}`;
        }
        return embedUrl;
      } else {
        return null;
      }
    },
    filterActiveIncident(incident) {
      return this.enabledTags.includes(incident.tag) && this.enabledImpacts.includes(incident.impact)
    },
    refreshVisibleIncidents() {
      Object.values(this.markers).forEach(marker => {
        if (this.filterActiveIncident(marker.incident)) {
          marker.marker.getElement().style.display = "";
        } else {
          marker.marker.getElement().style.display = "none";
        }
      })
    },
    addIncidentsTranslations(villages) {
      const flatIncidents = Object.values(villages.map(v => v.incidents)).flat();
      ["en", "ru"].forEach(locale => {
        const incidentsLocale = Object.fromEntries(flatIncidents.map(i => {
          return [i.id, { "description": i[`description_${locale}`] }]
        }))

        i18n.global.mergeLocaleMessage(locale, {
          incidents: { all: incidentsLocale }
        })
      })
    },
    updatePolygonColors() {
      Object.keys(this.polygons).forEach(vId => {
        this.polygons[vId].unbindTooltip();
        if (vId == this.hoverVillage) {
          if (!L.Browser.mobile) {
            this.polygons[vId].setStyle({
              fillColor: "#FF6F00",
              weight: 2,
              color: "#FF5722",
              fillOpacity: 0.2,
            });
            this.polygons[vId].bindTooltip(this.$t(`villages.${vId}.name`)).openTooltip();
          }
        } else if (vId == this.selectedVillage) {
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
    }
  },
  watch: {
    selectedVillage: function (_villageId, prevV) {
      this.selectedIncidents[prevV] = null; // reset the open incident/marker
      this.updatePolygonColors();
    },
    selectedIncidents: {
      handler: function (sI) {
        console.log(`WATCH selectedIncidents ${sI[this.selectedVillage]}`)
        Object.keys(this.markers).forEach(incidentId => {
          const incident = this.markers[incidentId].incident;
          if (sI[this.selectedVillage] && incidentId == sI[this.selectedVillage]) {
            this.markers[incidentId].marker.setIcon(MarkerUtils.getMarkerSvg(incident, true))
          } else {
            this.markers[incidentId].marker.setIcon(MarkerUtils.getMarkerSvg(incident, false))
          }
        })

        if (sI[this.selectedVillage]) {
          // fit map to marker
          console.log(`SELECTED INCIDENT ${JSON.stringify(sI[this.selectedVillage])}`)
          this.map.flyToBounds(this.markers[sI[this.selectedVillage]].group.getBounds(), { ...this.getFitBoundsOptions(), maxZoom: Math.max(17, this.map.getZoom()) });

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
    hoverVillage: function () { this.updatePolygonColors() },
    enabledTags: function () { this.refreshVisibleIncidents() },
    enabledImpacts: function () { this.refreshVisibleIncidents() },
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

  @media (min-width: 960px) {
    position: absolute;
    top: 20%;
    width: 35%;
    max-height: 60vh;
    max-width: 550px;

    .v-container {
      height: 60vh;
    }
  }

  @media (max-width: 960px) {
    position: fixed;
    // max-width: 800px;
    width: 100%;
    left: 0;
    right: 0;


    // right: 0;
    bottom: 144px; // 48px x 3
    height: 40vh;
    max-height: 40vh;
    margin-left: auto;
    margin-right: auto;

    .v-container {
      height: 50vh;
    }
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

.media-panel {
  background-color: #444444;

  &.v-expansion-panel-text__wrapper {
    padding: 0;
  }
}

video.video-embed,
iframe.video-embed {
  width: 100%;
  min-height: 240px;

  @media (min-width: 600px) and (max-width: 960px) {
    min-height: 300px;
  }

  @media (max-width: 600px) {
    min-height: 180px;
  }
}

.leaflet-marker-icon {

  &.marker-pin,
  &.marker-pin-active,
  &.marker-pin-civinfra,
  &.marker-pin-civinfra-active,
  &.marker-pin-privateprop,
  &.marker-pin-privateprop-active,
  &.marker-pin-borderpost,
  &.marker-pin-borderpost-active {
    width: $markerRadius;
    height: $markerRadius;
    border-radius: $markerRadius;
    background-color: #e3e3e34a;

    &:hover {
      // background-color: red;
      border: 2px dotted $accentColor;
      width: 26px !important;
      height: 26px !important;
      z-index: $zMax + 15 !important;
    }
  }

  &.marker-pin,
  &.marker-pin-active {
    border: 2px solid black;
    background-color: white;

  }

  // &.marker-pin-civinfra,
  // &.marker-pin-civinfra-active {
  //   border: 2px solid #33691E;
  //   background-color: #9CCC65;
  // }

  // &.marker-pin-privateprop,
  // &.marker-pin-privateprop-active {
  //   border: 2px solid #311B92;
  //   background-color: #AB47BC;
  // }

  // &.marker-pin-borderpost,
  // &.marker-pin-borderpost-active {
  //   border: 2px solid #006064;
  //   background-color: #26C6DA;
  // }

  &.marker-pin-active,
  &.marker-pin-civinfra-active,
  &.marker-pin-privateprop-active,
  &.marker-pin-borderpost-active {
    background-color: red;
    z-index: $zMax + 15 !important;
  }

}

.impact-tabs {
  & .all-selected {
    color: $accentColor;
  }

  & .civinfra-selected {
    color: #C5E1A5;
  }

  & .privateprop-selected {
    color: #CE93D8;
  }

  & .borderpost-selected {
    color: #80DEEA;
  }
}

// .chip-military,
// .chip-destruction,
.chip-tkid {
  border-radius: 6px;
}

// .chip-destruction {
//   border: 1px solid $destructionColor;
// }

// .chip-military {
//   border: 1px solid $militaryColor;
// }

.chip-tkid {
  border: 1px solid black;
}

// override default height for stacked
div.v-tabs--density-default.v-tabs--stacked {
  --v-tabs-height: 64px;

  .v-icon {
    font-size: calc(var(--v-icon-size-multiplier) * 1.6em);
  }

  @media (max-width: 960px) {
    --v-tabs-height: 56px;

    .v-icon {
      font-size: calc(var(--v-icon-size-multiplier) * 1.25em);
    }
  }

  @media (max-width: 600px) {
    --v-tabs-height: 56px;

    .v-tab {
      max-width: 130px;
    }

    .v-icon {
      font-size: calc(var(--v-icon-size-multiplier) * 1em);
    }

    .v-btn {
      font-size: 0.75em;
    }
  }

}

div.v-overlay--absolute.v-tooltip div.v-overlay__content {
  background: #CFD8DC;
  box-shadow: 1px 1px #707070;
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
