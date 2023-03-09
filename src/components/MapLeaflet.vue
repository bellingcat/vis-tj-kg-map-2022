<template>
  <title-expand />
  <sidebar />
  <div id="map"></div>
  <!-- <before-after-satellite :map="map"/> -->
</template>

<script setup>
</script>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import config from "../../config";
// import BeforeAfterSatellite from "./BeforeAfterSatellite.vue";
import TitleExpand from "./TitleExpand.vue"
import Sidebar from "./Sidebar.vue";

export default {
  components: { TitleExpand, Sidebar },
  data() {
    return {
      count: 0,
      map: null,
      mapConfig: config.app.map
    }
  }, methods: {
    getTileUrl() {
      this.mapConfig.tiles.current = this.mapConfig.tiles.satellite;
      return `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
      // return `https://api.mapbox.com/styles/v1/${this.mapConfig.tiles.current}/tiles/256/{z}/{x}/{y}@2x?access_token=${this.mapConfig.mapboxToken}`;
    },
    initMap: function () {
      let greenIcon = L.icon({
        // iconUrl: 'leaf-green.png',
        // shadowUrl: 'leaf-shadow.png',
        html: `<div class='marker-pin'>XX</div>`,

        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      let divIcon = L.divIcon({ className: 'marker-pin' });

      let points = config.data.points.map(p => [p.lat, p.lon, p.place]);

      // calling map
      this.map = L.map("map", { ...this.mapConfig, zoomControl: false }).setView([this.mapConfig.anchor.lat, this.mapConfig.anchor.lon], this.mapConfig.startZoom);
      L.control.scale().addTo(this.map); // adds scale
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);
      // if (L.Browser.mobile) {
      //   // alert("mobile")
      // }

      L.tileLayer(this.getTileUrl(), {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // loop that adds many markers to the map
      for (let i = 0; i < points.length; i++) {
        const [lat,
          lng,
          popupText] = points[i];

        // let marker = new L.marker([lat, lng]).bindPopup(popupText).addTo(this.map);
        let marker = new L.marker([lat, lng], { icon: divIcon }).bindPopup(popupText).addTo(this.map);
        // console.log(marker);
      }
    },
    populateMap: async function () {
      let data = await fetch('/data.json').then(async data => await data.json());
      console.log(data.villages)

      const villageIds = data?.villages?.map(v => v.id).filter(id => id);
      assert(villageIds.length > 0 && villageIds.length == [...new Set(villageIds)].length, `Each village must have a unique ID`)

      data.villages.forEach(village => {
        console.log(`Loading ${village.id}`)
        this.addBeforeAfter(village)

      })
    },
    addBeforeAfter: function (village) {
      if (village.satellite === undefined) return;
      console.log(`Adding pane`)

      const paneId = `satellite-pane-${village.id}`;
      let imagePane = this.map.createPane(paneId);
      // imagePane.style.zIndex = 650;
      // imagePane.style.pointerEvents = 'none';
      const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
      let visible = 0;

      let overlayBefore, overlayAfter;
      if (village.satellite.before) {
        const bf = village.satellite.before;
        console.log(`village ${village.id} has Satellite BEFORE: ${bf.bounds}`)
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
        console.log(`village ${village.id} has Satellite AFTER: ${af.bounds}`)
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
        } else if (visible == 2) {
          overlayBefore?.setOpacity(0)
          overlayAfter?.setOpacity(0)
        }
        visible = (visible + 1) % 3;
        console.log(visible)
      });
    },
    showRegions: async function () {
      // let data = await fetch('/kgz-amd2.geojson').then(async data => await data.json());
      // L.geoJSON(data).addTo(this.map);
      let data = await fetch('/polygons/maksat.geojson').then(async data => await data.json());
      let polygon = L.geoJSON(data).addTo(this.map);
      console.log(polygon)
      this.map.on("click", () => {
        console.log(this.map.getCenter())
        // this.map.fitBounds(polygon.getBounds(), {paddingTopLeft: [800, 0]})
        // this.map.fitBounds(polygon.getBounds(), {paddingBottomRight: [0, 0]})
        // this.map.fitBounds(polygon.getBounds())

      })
    },
    addSidebar() {
      console.log(`ADDing sidebar`)
      var sidebar = L.control.sidebar({
        autopan: false,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether to add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left',     // left or right
      }).addTo(this.map);
    }
  },
  mounted: function () {
    this.initMap();
    this.populateMap();
    // this.addBeforeAfter();
    this.showRegions();
    // this.addSidebar();
  }
}
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
// import '../styles/settings.scss'
</script>
<style lang="scss">
@import '../styles/settings.scss';
@import '../styles/map.scss';

#map {
  width: 100vw;
  height: 100%;
  z-index: $zMed;
}

.leaflet-marker-icon.marker-pin {
  border: 2px solid yellow;
  background-color: green;
  width: $markerRadius;
  height: $markerRadius;
  border-radius: $markerRadius;
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
