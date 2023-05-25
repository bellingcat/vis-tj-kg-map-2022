
import { en } from 'vuetify/locale'
import config from "../../config"

const villageProps = ["name", "description", "country"]

export default {
  ...en,
  $vuetify: {
    badge: ""
  },
  main: {
    title: `Tajikistan-Kyrgyzstan Border Clash 2022`,
    panel: {
      title: `Tajikistan-Kyrgyzstan Border Clash 2022`,
      card: `This map was created by Miguel Ramalho from Bellingcat’s Investigative Tech Team using research gathered by Aiganysh Aidarbekova and Narine Khachatryan from available open source evidence, including video and social media footage.

It shows changes to buildings observed via satellite imagery following clashes between Tajikistan and Kyrgyzstan between September 14 and September 19, 2022. These changes could reflect damage from the clashes.

The <span class="geolocated">Blue</span> icons represent all the buildings we have geolocated using available social media and other media footage, as well as satellite imagery from Planet and Google Earth Pro. Videos and images are listed and visible when users click on these icons. The <span class="satellite">Green</span> icons represent all buildings we have geolocated and noticed changes using just satellite imagery. The changes to buildings observed on satellite imagery does not provide conclusive proof of damage caused during the clashes, but it provides a starting point for investigation by researchers interested in analysing areas of potential impact from the clashes. Though not included in this map, we also looked at PlanetScope Scene imagery from Planet Labs which provides lower resolution but more frequent images of the area and helped to further establish that the change to buildings occurred during the clashes. This map is not a living document but is designed to provide a database for researchers and interested parties.

Because the social media footage embedded is open source, the users who uploaded the content are not affiliated to Bellingcat. Any opinions that may be contained within the posts are therefore not those of Bellingcat. Any claims contained within the posts have also not necessarily been confirmed or verified by Bellingcat, particularly in relation to which party may have been responsible for the incidents detailed. It should be noted there is very limited social media and other media content posted from inside Tajikistan — a country that <a target="_blank" href="https://www.codastory.com/disinformation/kyrgyzstan-tajikistan-border-conflict/">heavily restricts</a> the media and social media usage.

<h3>A Note on the Disputed Border</h3>

Sections of the border between Tajikistan and Kyrgyzstan are not conclusively demarcated, and may appear differently on various maps. We have used OpenStreetMaps as the base layer for this map — it includes a border but we can not vouch for its accuracy and recognise that it may be disputed in some places. Similarly when we have marked incidents we have used the village name and country that appears on Yandex Maps, but recognise that some of these designations may be disputed.

<h3>A Note on Verification</h3>

The locations of the incidents mapped out in this project have been identified via satellite imagery. Using Google Earth Pro, NASA FIRMS, Planet Labs satellite imagery and social media and other video footage, Bellingcat and its Global Authentication Project (GAP) volunteers surveyed areas of interest from the recent clashes, highlighting areas where changes to buildings can be observed on satellite imagery. As open sources and satellite imagery can’t tell us what exactly happened at each site, we cannot confirm that the damage was caused by the 2022 clashes nor who was responsible for it. Therefore, this map is not an exhaustive list, but highlights areas of interest for researchers and others looking into possible impact of the 2022 incidents.

<h3>A Note on the Descriptions and Filters</h3>

Each larger circle on the map represents a geographic grouping of incidents. Every building that has changed is represented by a symbol on the map.

<span class="geolocated">“Satellite Imagery with Media”</span> incidents appear in <span class="geolocated">Blue</span>. Each “With Media” incident includes coordinates, satellite imagery of before and after and either footage or stills from media or social media.

<span class="satellite">“Satellite Imagery without Media”</span> incidents appear in <span class="satellite">Green</span>. Each “Without Media” incident includes coordinates as well as satellite imagery of before and after the clashes.

The coordinates we have provided match the exact building, however the icons included in the map may appear slightly to the side of the building so that it can be clearly viewed . All incidents can be seen in satellite imagery. In five cases, we have used Planet Labs Skysat Images, in all other cases we used images displayed on Google Earth Pro.

At the bottom of the map, a user can toggle between incidents that appear to involve Civilian Infrastructure or Private Property (Private Homes and Businesses). Decisions on these classifications are based on available open source evidence for the function of these buildings.

Once loaded, you can click on a satellite image to toggle between before and after imagery.

<div><small><a class="text-right" target="_blank" href="https://www.bellingcat.com/about/data-privacy/">Privacy policy.</a></small></div>
      `,
      dataBreakdown: `Data breakdown`,
      table: {
        colVillage: `Village`,
      },
      close: "close"
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
    compareText: `Comparing satellite imagery between
    <strong>{before}</strong>
    and
    <strong>{after}</strong>
    reveals change to buildings.`,
    btnBefore: `view sat before`,
    btnAfter: `view sat after`,
    showingImagery: `Showing satellite imagery from {date}`,
    altText: `Satellite view of {village} on {date}.`,
    loadBtn: `Load satellite imagery`,
    loadBtnWarning: `Warning: satellite imagery can use several MBs of data, and take a few seconds load.`
  },
  incidents: {
    all: {}, // this will be loaded from incidents.json
    defaultName: `Building N.{index}`,
    countVisible: `No incidents | 1 incident | {n} incidents`,
    panel: {
      villageDisclaimer: `We have used the village name and country that appears on Yandex Maps, but recognise that some of these designations may be disputed.`,
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
    help: `Show help menu`,
    download: {
      json: "JSON data",
      csv: "CSV data",
    },
    links: {
      code: "Code",
      about: `About`
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
