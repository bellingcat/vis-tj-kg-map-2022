
import { ru } from 'vuetify/locale'
import config from "../../config"

const villageProps = ["name", "description"]

export default {
  ...ru,
  $vuetify: {
    badge: ""
  },
  main: {
    title: `Tajikistan-Kyrgyzstan Border Clash 2022`,
    panel: {
      title: `Tajikistan-Kyrgyzstan Border Clash 2022`,
      card: `This database was created by Miguel Ramalho as part of Bellingcat’s Tech Team using research gathered by Aiganysh Aidarbekova and Narine Khachatryan using available open source evidence, including media and social media footage.

      It shows changes to buildings observed via satellite imagery following clashes between Tajikistan and Kyrgyzstan between September 14 and September 19, 2022. Where possible, we have geolocated buildings using available social media and media footage. This forms the first layer of the map. It should be noted there is very limited social media and media content posted from inside Tajikistan — a country that <a target="_blank" href="https://rsf.org/en/country/tajikistan">heavily restricts</a> the media and social media usage. The second layer of the map we have identified changes to buildings in both high resolution satellite imagery and PlanetScope imagery, but further investigation is needed. The changes to buildings observed on satellite imagery does not provide conclusive proof of damage caused during the conflict - but provides a starting point for investigation for researchers interested to see areas of potential impact from the conflict. This is not a living document but is designed to provide a database for researchers and interested parties.

      <h3>A Note on the Disputed Border</h3>
      Sections of the border between Tajikistan and Kyrgyzstan are not conclusively demarcated, and may appear differently on various maps. We have used OpenStreetMaps as the base layer for the map — it includes a border but we can not vouch for its accuracy and recognise that it may be disputed in some places. Where we have marked incidents we have referred to the village’s name based on Yandex Maps.

      <h3>A Note on Verification</h3>
      The locations of the incidents mapped out in this project have been identified via satellite imagery. Using Google Earth Pro, NASA FIRMS, Planet Labs satellite imagery and social media and media footage, Bellingcat and Global Authentication Project (GAP) volunteers surveyed areas of interest from the recent clashes, highlighting areas where changes to buildings can be observed on satellite imagery.  It should be noted that satellite images show change to a building. As open sources and satellite imagery can’t tell us what exactly happened at each site, we cannot confirm that the damage was caused by the recent conflict nor who was responsible for it. Therefore, this map is not an exhaustive list, but highlights areas of interest for researchers and others looking into the impacts of the Kyrgyzstan-Tajikistan clash.

      In the map’s first layer we have included those incidents that Bellingcat has geolocated, using  social media and news reports.

      <h3>A Note on the Descriptions and Filters</h3>
      Each larger circle on the map represents a geographic grouping of incidents. Every building is represented by a symbol on the map.

      “Geolocated” incidents appear in <span class="geolocated">Blue</span>. Each “Geolocated” incident includes coordinates, satellite imagery of before and after and either footage or stills from media or social media.These incidents have been geolocated by Bellingcat.

      “Satellite” incidents appear in <span class="satellite">Green</span>. Each “Satellite” incident includes coordinates as well as satellite imagery of before and after.These are incidents where change to building has been observed on satellite imagery, but further investigation is needed.

      The coordinates match the exact building. All incidents can be seen in satellite imagery. In four cases we have used Planet Labs Images- as they provided high quality images of areas immediately after the clashes occurred, in all other cases we used Google Earth Pro satellite images which provided good quality images in the days and weeks after fighting occurred.Satellite imagery that we have used was taken up to six weeks after the clashes or up to a year before them.

      At the bottom of the map, a user can toggle between incidents that apparently involve Civilian Infrastructure; Private Property (Private Homes and Businesses) or Border Posts. Decisions on these classifications are based on available open source evidence for the function of these buildings.

      <div><small><a class="text-right" target="_blank" href="https://www.bellingcat.com/about/data-privacy/">Privacy policy.</a></small></div>
      `,
      dataBreakdown: `Data breakdown`,
      table: {
        colVillage: `Village`,
      },
      read: "read the article"
    },
    bellingcat: "Bellingcat"
  },
  cover: {
    title: `Map introduction`,
    cover: `Using the bottom navigation rows you can go through {villageCount} Kyrgyz and Tajik villages, apply filters on the type of building affected, and method of identification used (<span class="geolocated">Satellite imagery with media</span> and <span class="satellite">Satellite imagery without media</span>). Further configurations can be found on the top-right menu.`,
    link1: `For full methodology and context read the `,
    link2: `about page`
  },
  buildingCount: `Displaying <strong>{buildingCount}</strong> total geolocated buildings.`,
  buildingLocation: {
    socialmedia: { name: "Satellite Imagery With Media", explanation: "Buildings geolocated via video/image content" },
    satellite: { name: "Satellite Imagery Without Media", explanation: "Change observed in satellite imagery only" },
  },
  impact: {
    all: { name: "All" },
    civinfra: { name: "Civilian Infrastructure" },
    privateprop: { name: "Private Property" },
  },
  satellite: {
    compareText: `Сравнение спутниковых снимков между
    <strong>{before}</strong>
    и
    <strong>{after}</strong>
    показывает часть разрушения.`,
    btnBefore: `view sat before`,
    btnAfter: `view sat after`,
    showingImagery: `Showing satellite imagery from {date}`,
    altText: `Satellite view of {village} on {date}.`,
    loadBtn: `Load satellite imagery`,
    loadBtnWarning: `Warning: satellite imagery can use several MBs of data`
  },
  incidents: {
    all: {}, // this will be loaded from incidents.json
    defaultName: `Building N.{index}`,
    countVisible: `No incidents | 1 incident | {n} incidents`,
    panel: {
      noSources: `This building entry is visible on satellite only - no media sources to show.`,
      videoNotSupported: `Your browser does not support the video tag.`,
      videoStartAt: `Start video from {seconds}s`,
      youtubeTitle: `Youtube video player`,
      telegramTitle: `Telegram embedded post`,
      embeddedImage: `Embedded image from {domain}`,
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
    embeds: {
      title: "Embeds",
      card: {
        title: "External embeds",
        disclaimer: "This map has the ability to embed external content such as Youtube videos, Telegram posts, and images from other platforms. If you enable this feature, you will be subject to the privacy policies of these external platforms. We'll use a local cookie to remember your choice.",
        disable: "Disable",
        enable: "Enable",
      }

    },
    fullscreen: {
      on: "fullscreen",
      off: "exit fullscreen"
    },
    download: {
      json: "JSON data",
      csv: "CSV data",
    },
    links: {
      article: "Read article",
      code: "Code",
      about: `About`
    }
  },
  villages: {
    ...Object.fromEntries(config.villages.map(v => {
      return [
        v.id,
        Object.fromEntries(villageProps.map(p => {
          return [p, v[`${p}_ru`]]
        }))
      ]
    }))
  }
};
