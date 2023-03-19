const config = {
  title: "tj-kg",
  display_title: "Tajikistan - Kyrgyzstan border conflict 2022",
  //   SERVER_ROOT: "https://ukraine.bellingcat.com/ukraine-server",
  // MEDIA_EXT: "/api/media",

  app: {
    map: {
      // anchor: { lat: 39.936132, lon: 69.931180 },
      anchor: { lat: 40.05026367251, lon: 70.63018585 },
      maxZoom: 18,
      minZoom: 4,
      // startZoom: 9,
      startZoom: 16,
      wheelPxPerZoomLevel: 120,
      zoomSnap: 0.50,
      mapboxToken: "pk.eyJ1IjoiYmVsbGluZ2NhdC1tYXBib3giLCJhIjoiY2tleW0wbWliMDA1cTJ5bzdkbTRraHgwZSJ9.GJQkjPzj8554VhR5SPsfJg",
      startTile: 'osm',
      tiles: {
        osm: () => `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
        satellite: (token) => `https://api.mapbox.com/styles/v1/bellingcat-mapbox/cl1win2vp003914pdhateva6p/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`,
        custom: (token) => `https://api.mapbox.com/styles/v1/bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`,
      },
    },
    ui: {
      toastOptions: {
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
    }
  },
  villages: [{
    "id": "maksat",
    "name_en": "Maksat",
    "name_ru": "Максат",
    "country": "Kyrgystan",
    "description": "This is some info on the Maksat village.",
    "yandex": "https://yandex.com/maps/geo/4209595903/?ll=69.700117%2C40.128022&z=14.11",
    "stats": {
      "population": "TODO maybe"
    },
    "satellite": {
      "bounds": [
        [40.136006, 69.704556],
        [40.134149, 69.708604]
      ],
      "before": {
        "url": "./satellite/maksat-2022-08-30.jpg",
        "date": "2022-08-30"
      },
      "after": {
        "url": "./satellite/maksat-2022-10-03.jpg",
        "date": "2022-10-03"
      }
    }
  }, {
    "id": "international",
    "name_en": "International",
    "name_ru": "Интернациональное",
    "country": "Kyrgystan",
    "description": "This is some info on the International village.",
    "yandex": "https://yandex.ru/maps/geo/1508554928/?l=sat&ll=69.833683%2C40.188422&z=14",
    "stats": {
      "population": "TODO maybe"
    },
    "satellite": {}
  }, {
    "id": "borborduk",
    "name_en": "Borborduk",
    "name_ru": "Борбордук",
    "country": "Kyrgystan",
    "description": "This is some info on the Borborduk village.",
    "yandex": "https://yandex.ru/maps/geo/1508554928/?l=sat&ll=69.833683%2C40.188422&z=14",
    "stats": {
      "population": "TODO maybe"
    },
    "satellite": {
      "bounds": [
        [40.188941, 69.825076],
        [40.186722, 69.829919]
      ],
      "before": {
        "url": "./satellite/borborduk-2022-06-07.jpg",
        "date": "2022-08-30"
      },
      "after": {
        "url": "./satellite/borborduk-2022-10-03.jpg",
        "date": "2022-10-03"
      }
    }
  }, {
    "id": "dostuk",
    "name_en": "Dostuk",
    "name_ru": "Достук",
    "country": "Kyrgystan",
    "description": "This is some info on the Dostuk village.",
    "yandex": "https://yandex.ru/maps/geo/1671313862/?l=sat&ll=70.631908%2C40.052397&z=16",
    "stats": {
      "population": "TODO maybe"
    },
    "satellite": {
      "bounds": [
        [40.054985, 70.624425],
        [40.048986, 70.638214]
      ],
      "before": {
        "url": "./satellite/dostuk-2021-09-17.jpg",
        "date": "2021-09-17"
      },
      "after": {
        "url": "./satellite/dostuk-2022-11-01.jpg",
        "date": "2022-11-01"
      }
    }
  }]
};

export default config;
