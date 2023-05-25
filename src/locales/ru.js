
import { ru } from 'vuetify/locale'
import config from "../../config"

const villageProps = ["name", "description"]

export default {
  ...ru,
  $vuetify: {
    badge: ""
  },
  notes: `

  <span class="geolocated">Blue</span>

  <span class="satellite">Green</span>

  <div><small><a class="text-right" target="_blank" href="https://www.bellingcat.com/about/data-privacy/">Privacy policy.</a></small></div>
  `,
  main: {
    title: `Столкновение на границе Таджикистана и Кыргызстана в 2022 году`,
    panel: {
      title: `Столкновение на границе Таджикистана и Кыргызстана в 2022 году`,
      card: `Эта карта была создана Мигелем Рамальо из технической группы расследований Беллингкэт по материалам исследований, проведенных Айганыш Айдарбековой и Нарине Хачатрян на основе доступных свидетельств из открытых источников, включая видео и кадры из социальных сетей.


      На ней показаны изменения в зданиях, наблюдаемые на спутниковых снимках, после столкновений между Таджикистаном и Кыргызстаном в период с 14 по 19 сентября 2022 года. Эти изменения могут отражать ущерб, нанесенный в результате столкновений.


      Синие значки представляют все здания, которые мы геолоцировали, используя доступные материалы из социальных сетей и других средств массовой информации, а также спутниковые снимки Planet и Google Earth Pro. Видео и изображения отображаются в списке и становятся видимыми, когда пользователи нажимают на эти значки. Зеленые значки обозначают все здания, которые мы геолоцировали и где заметили изменения, используя только спутниковые снимки. Изменения в зданиях, наблюдаемые на спутниковых снимках, не являются убедительным доказательством ущерба, причиненного во время столкновений, но они служат отправной точкой для расследования силами исследователей, заинтересованных в анализе областей потенциального воздействия столкновений. Хотя они и не включены на эту карту, мы также просмотрели снимки PlanetScope Scene от Planet Labs, которые имеют более низкое разрешение, но делаются чаще, что помогло дополнительно подтвердить, что изменения в зданиях произошли именно во время столкновений. Этот документ не обновляется после публикации, но предназначена для предоставления базы данных исследователям и заинтересованным сторонам.


      Поскольку видеоматериалы, размещенные в социальных сетях, являются открытыми источниками, пользователи, загрузившие контент, не связаны с Беллингкэт. Таким образом, любые мнения, которые могут содержаться в постах, не принадлежат Беллингкэт. Кроме того, любые заявления, которые содержатся в постах, не обязательно подтверждены или верифицированы Беллингкэт, особенно в отношении того, какая из сторон конфликта может нести ответственность за инцидент. Следует отметить, что существует очень ограниченное количество материалов из социальных сетей и другого медиаконтента, размещаемого из Таджикистана — страны, которая
      <a target="_blank" href="https://www.codastory.com/disinformation/kyrgyzstan-tajikistan-border-conflict/">сильно ограничивает</a> использование СМИ и соцсетей.

      <h3>Примечание о спорной границе</h3>

      Участки границы между Таджикистаном и Кыргызстаном окончательно не демаркированы и могут по-разному отображаться на различных картах. Мы использовали OpenStreetMaps в качестве базового слоя для этой карты — она включает границу, но мы не можем ручаться за ее точность и признаем, что в некоторых местах она может быть оспорена. Аналогичным образом, когда мы отмечали инциденты, мы использовали название населенного пункта и страну, которые отображаются на картах Яндекса, но признаем, что некоторые из этих обозначений могут быть оспорены.


      <h3>Примечание о верификации</h3>

      Места инцидентов, нанесенные на карту в рамках этого проекта, были определены с помощью спутниковых снимков. Используя спутниковые снимки Google Earth Pro, NASA FIRMS и Planet Labs, социальные сети и другие видеоматериалы, волонтеры Беллингкэт и Global Authentication Project изучили районы, представляющие интерес в связи с недавними столкновениями, выделив области, где на спутниковых снимках можно наблюдать изменения в зданиях. Поскольку открытые источники и спутниковые снимки не могут сказать нам, что именно произошло на каждом участке, мы не можем подтвердить, что ущерб был причинен столкновениями 2022 года, или определить, кто именно был ответственен за это. Таким образом, эта карта не является исчерпывающим списком, но выделяет области, представляющие интерес для исследователей и других лиц, изучающих возможные последствия инцидентов 2022 года.

      <h3>Примечание по описаниям и фильтрам</h3>

      Каждый большой круг на карте представляет географическую группу инцидентов. Каждое здание, которое претерпело изменения, обозначено символом на карте.


      Инциденты «Спутниковые снимки + медиа» выделены синим цветом. Каждый инцидент «+ медиа» содержит координаты, спутниковые снимки до и после, а также видео или скриншоты из СМИ или социальных сетей.
      Инциденты «Спутниковые снимки без медиа» выделены зеленым цветом. Каждый инцидент «без медиа» содержит координаты, а также спутниковые снимки, сделанные до и после столкновений.


      Предоставленные нами координаты точно соответствуют зданию, однако значки, нанесенные на карту, могут располагаться немного сбоку от здания, чтобы его можно было хорошо рассмотреть. Все инциденты можно увидеть на спутниковых снимках. В пяти случаях мы использовали снимки Planet Labs Skysat, во всех остальных случаях мы использовали снимки, отображаемые в Google Earth Pro.


      В нижней части карты пользователь может переключаться между инцидентами, которые, по-видимому, связаны с гражданской инфраструктурой или частной собственностью (частными домами и предприятиями). Решения по этим классификациям основаны на имеющихся данных из открытых источников о назначении этих зданий.


      После загрузки вы можете переключаться между снимками «до» и «после», нажимая на спутниковый снимок.


      <div><small><a class="text-right" target="_blank" href="https://www.bellingcat.com/about/data-privacy/">Политика конфиденциальности.</a></small></div>
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
    cover: `Используя нижние навигационные строки, вы можете просмотреть 16 кыргызских и таджикских сел, применить фильтры по типу поврежденных зданий и используемому методу идентификации (<span class="geolocated">спутниковые снимки с медиа</span> и <span class="satellite">спутниковые снимки без медиа</span>). Дополнительные конфигурации можно найти в правом верхнем меню.`,
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
