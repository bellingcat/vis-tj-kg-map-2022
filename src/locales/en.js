
import { en } from 'vuetify/locale'
import config from "../../config"

const villageProps = ["name", "description"]

export default {
  ...en,
  $vuetify: {
    badge: ""
  },
  main: {
    title: `Tajikistan - Kyrgyzstan border conflict 2022`,
    panel: {
      title: `Hello Methodology`,
      card: `THIS IS GOING TO BE BIG AND CAN INCLUDE <a href="#" target="_blank">LINKS</a>`,
      read: "TODO: read the article"
    },
    bellingcat: "Bellingcat"
  },
  buildingLocation: {
    socialmedia: { name: "Geolocated", explanation: "Buildings geolocated via video/image content." },
    satellite: { name: "Satellite", explanation: "Destruction observed in before/after satellite imagery." },
  },
  impact: {
    all: { name: "All" },
    civinfra: { name: "Civilian Infrastructure" },
    privateprop: { name: "Private Property" },
    borderpost: { name: "Border Posts" },
  },
  satellite: {
    compareText: `Comparing satellite imagery between
    <strong>{before}</strong>
    and
    <strong>{after}</strong>
    reveals part of the destruction.`,
    btnBefore: `view sat before`,
    btnAfter: `view sat after`,
    showingImagery: `Showing satellite imagery from {date}`,
    altText: `Satellite view of {village} on {date}.`
  },
  incidents: {
    all: {}, // this will be loaded from incidents.json
    defaultName: `Destroyed building N.{index}`,
    countVisible: `No incidents | 1 incident | {n} incidents`,
    panel: {
      noSources: `No sources to show.`,
      videoNotSupported: `Your browser does not support the video tag.`,
      youtubeTitle: `Youtube video player`,
      sourceButtonTitle: `open original source`,
      sourceButton: `source {index}`,
      gMapsTitle: `show coordinates on google maps`,
      gMapsButton: `GMaps`,
      copyCoordsTitle: `copy incident coordinates`,
      copyCoordsSuccess: `coordinates copied to clipboard`,
      copyCoordsError: `device does not support copying`,
    }
  },
  options: {
    title: `Actions`,
    tiles: {
      satellite: "satellite",
      osm: "osm",
      custom: "custom",
    },
    locale: {
      ru: "русский",
      en: "english"
    },
    fullscreen: {
      on: "fullscreen",
      off: "exit fullscreen"
    },
    download: {
      json: "JSON",
      csv: "CSV",
    },
    links: {
      bellingcat: "Bellingcat",
      code: "Code",
    }
  },
  villages: {
    ...Object.fromEntries(config.villages.map(v => {
      return [
        v.id,
        Object.fromEntries(villageProps.map(p => {
          return [p, v[`${p}_en`]]
        }))
      ]
    }))
  }
};
