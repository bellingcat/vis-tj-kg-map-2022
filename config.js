const config = {
  title: "tj-kg",
  display_title: "Tajikistan - Kyrgyzstan border conflict 2022",
  //   SERVER_ROOT: "https://ukraine.bellingcat.com/ukraine-server",
  // MEDIA_EXT: "/api/media",

  app: {
    map: {
      anchor: { lat: 39.936132, lon: 70.351180 },
      // anchor: { lat: 40.001499, lon: 70.617585 }, //dev
      maxZoom: 19,
      minZoom: 4,
      startZoom: 9,
      // startZoom: 16,
      wheelPxPerZoomLevel: 120,
      zoomSnap: 0.50,
      mapboxToken: "pk.eyJ1IjoiYmVsbGluZ2NhdC1tYXBib3giLCJhIjoiY2tleW0wbWliMDA1cTJ5bzdkbTRraHgwZSJ9.GJQkjPzj8554VhR5SPsfJg",
      startTile: 'osm',
      // startTile: 'satellite', // dev
      tiles: {
        osm: () => `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
        satellite: (token) => `https://api.mapbox.com/styles/v1/bellingcat-mapbox/cl1win2vp003914pdhateva6p/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`,
        custom: (token) => `https://api.mapbox.com/styles/v1/bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`,
      },
      startVillage: null // eg: "ovchi-kalacha"
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
  villages: [
    {
      "id": "ak-sai",
      "name_en": "Ak-Sai",
      "name_ru": "Ак-Сай",
      "description_en": "This is some info on the Ak-Sai village.",
      "description_ru": "Это некоторая информация о поселке Ак-Сай.",
      "yandex": "https://yandex.com/maps/geo/1508557129/?ll=70.516430%2C39.878330&z=14",
      "satellite": {
        "bounds": [
          [39.882873, 70.492895],
          [39.871997, 70.523326]
        ],
        "before": {
          "url": "./satellite/aksai-2022-03-02.jpg",
          "date": "2022-03-02"
        },
        "after": {
          "url": "./satellite/aksai-2022-11-01.jpg",
          "date": "2022-11-01"
        }
      }
    },
    // {
    //   "id": "ak-tatyr",
    //   "name_en": "Ak-Tatyr",
    //   "name_ru": "Ак-Татыр",
    //   "description_en": "This is some info on the Ак-Сай village.",
    //   "description_ru": "Это некоторая информация о поселке Ак-Татыр.",
    //   "yandex": "https://yandex.com/maps/geo/1508557126/?ll=70.479325%2C39.961688&z=14.84",
    //   "satellite": {}
    // },
    {
      "id": "arka",
      "name_en": "Arka",
      "name_ru": "Арка",
      "description_en": "A village about 2 kilometres south of Tajikistan’s Bahri Tochik Reservoir (the name translates as “Tajik Sea”).",
      "description_ru": "TODO: Это некоторая информация о поселке Арка.",
      "yandex": "https://yandex.ru/maps/geo/1508553697/?l=sat&ll=69.889571%2C40.195924&z=15",
      "satellite": {
        "bounds": [
          [40.202673, 69.873405],
          [40.184426, 69.887576]
        ],
        "before": {
          "url": "./satellite/arka-2022-03-30.jpg",
          "date": "2022-03-30"
        },
        "after": {
          "url": "./satellite/arka-2022-10-03.jpg",
          "date": "2022-10-03"
        }
      }
    }, {
      "id": "batken",
      "name_en": "Batken",
      "name_ru": "Баткен",
      "description_en": "The capital of the Batken Region, Kyrgyzstan. The only city in Batken Region that has an airport. ",
      "description_ru": "TODO: Это некоторая информация о поселке Баткен.",
      "yandex": "https://yandex.ru/maps/geo/771296045/?l=sat%2Cskl&ll=70.827197%2C40.053080&z=14",
      "satellite": {
        "bounds": [
          [40.056006, 70.811470],
          [40.053336, 70.817432]
        ],
        "before": {
          "url": "./satellite/batken-2022-06-06.jpg",
          "date": "2022-06-06"
        },
        "after": {
          "url": "./satellite/batken-2022-09-19.jpg",
          "date": "2022-09-19"
        }
      }
    }, {
      "id": "borborduk",
      "name_en": "Borborduk",
      "name_ru": "Борбордук",
      "description_en": "Located 5 km southwest of Tajikistan’s Bahri Tochik Reservoir.",
      "description_ru": "TODO: Это некоторая информация о поселке Борбордук.",
      "yandex": "https://yandex.ru/maps/geo/1508554928/?l=sat&ll=69.833683%2C40.188422&z=14",
      "satellite": {
        "bounds": [
          [40.192325, 69.823687],
          [40.186157, 69.837606]
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
      "id": "chorkishlok",
      "name_en": "Chordeh",
      "name_ru": "Чордех",
      "description_en": "A village located along the Isfara river and surrounded by mountains to the west and east. The village is located approximately 5 km south of the Tajik city of Isfara.",
      "description_ru": "TODO: Это некоторая информация о поселке Чордех.",
      "yandex": "https://yandex.ru/maps/geo/3496863555/?l=sat&ll=70.619929%2C40.061854&z=15",
      "satellite": {
        "bounds": [
          [40.066217, 70.621070],
          [40.063709, 70.626682]
        ],
        "before": {
          "url": "./satellite/chorkishlok-2022-02-27.jpg",
          "date": "2022-02-27"
        },
        "after": {
          "url": "./satellite/chorkishlok-2022-11-01.jpg",
          "date": "2022-11-01"
        }
      }
    }, {
      "id": "dostuk",
      "name_en": "Dostuk",
      "name_ru": "Достук",
      "description_en": "A collection of about 60 households, surrounded by mountains to the east, and the Isfara river to the west.",
      "description_ru": "TODO: Это некоторая информация о поселке Достук.",
      "yandex": "https://yandex.ru/maps/geo/1671313862/?l=sat&ll=70.631908%2C40.052397&z=16",
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
    },
    {
      "id": "international",
      "name_en": "International",
      "name_ru": "Интернациональное",
      "description_en": "About 20 kilometres southwest of Tajikistan’s Bahri Tochik Reservoir located across the disputed border.",
      "description_ru": "TODO: Это некоторая информация о поселке Интернациональное.",
      "yandex": "https://yandex.ru/maps/geo/1508554928/?l=sat&ll=69.833683%2C40.188422&z=14",
      "satellite": {
        "bounds": [
          [40.122355, 69.661650],
          [40.113252, 69.682038]
        ],
        "before": {
          "url": "./satellite/international-2022-08-30.jpg",
          "date": "2022-08-30"
        },
        "after": {
          "url": "./satellite/international-2022-10-03.jpg",
          "date": "2022-10-03"
        }
      }
    },
    {
      "id": "kapchygai",
      "name_en": "Kapchygai",
      "name_ru": "Капчыгай",
      "description_en": "TODO: This is some info on the Kapchygai village.",
      "description_ru": "TODO: Это некоторая информация о поселке Капчыгай.",
      "yandex": "https://yandex.ru/maps/geo/4114188022/?l=sat&ll=70.524627%2C39.884988&z=16",
      "satellite": {
        "bounds": [
          [39.889441, 70.520695],
          [39.880379, 70.531788]
        ],
        "before": {
          "url": "./satellite/kapchygai-2022-03-02.jpg",
          "date": "2022-03-02"
        },
        "after": {
          "url": "./satellite/kapchygai-2022-11-01.jpg",
          "date": "2022-11-01"
        }
      }
    }, {
      "id": "karabak",
      "name_en": "Karabak",
      "name_ru": "Кара-Бак",
      "description_en": "A village located a couple of kilometres west of Lakkon, in the same valley.",
      "description_ru": "TODO: Это некоторая информация о поселке Кара-Бак.",
      "yandex": "https://yandex.ru/maps/geo/4024919320/?l=sat%2Cskl&ll=70.821785%2C40.154385&z=14",
      "satellite": {
        "bounds": [
          [40.166333, 70.800183],
          [40.153551, 70.833681]
        ],
        "before": {
          "url": "./satellite/karabak-2022-06-02.jpg",
          "date": "2022-06-02"
        },
        "after": {
          "url": "./satellite/karabak-2022-09-19.jpg",
          "date": "2022-09-19"
        }
      }
    }, {
      "id": "kok-tash",
      "name_en": "Kochoboyu",
      "name_ru": "Көчө-бою",
      "description_en": "TODO: Kochoboyu.",
      "description_ru": "TODO: Это некоторая информация о поселке Көчө-бою.",
      "yandex": "https://yandex.com/maps/geo/1655397381/?ll=70.514188%2C39.948397&z=16.41",
      "satellite": {
        "bounds": [
          [39.963020, 70.512989],
          [39.948058, 70.524950]
        ],
        "before": {
          "url": "./satellite/kok-tash-2022-03-02.jpg",
          "date": "2022-03-02"
        },
        "after": {
          "url": "./satellite/kok-tash-2022-11-01.jpg",
          "date": "2022-11-01"
        }
      }
    },
    //  {
    //   "id": "kyzyl-bel",
    //   "name_en": "Kyzyl-Bel",
    //   "name_ru": "Кызыл-Бель",
    //   "description_en": "This is some info on the Kyzyl-Bel village.",
    //   "description_ru": "Это некоторая информация о поселке Кызыл-Бель.",
    //   "yandex": "https://yandex.ru/maps/geo/1508553687/?l=sat%2Cskl&ll=70.741848%2C40.097820&z=15",
    //   "satellite": {}
    // },
    {
      "id": "lakkon",
      "name_en": "Lakkon",
      "name_ru": "Лаккон",
      "description_en": "A small village located in a valley, approximately 5 km south of the Uzbek border.",
      "description_ru": "TODO: Это некоторая информация о поселке Лаккон.",
      "yandex": "https://yandex.ru/maps/geo/1508553686/?l=sat&ll=70.861816%2C40.176772&z=15",
      "satellite": {
        "bounds": [
          [40.172841, 70.862127],
          [40.170207, 70.867966]
        ],
        "before": {
          "url": "./satellite/lakkon-2022-07-23.jpg",
          "date": "2022-07-23"
        },
        "after": {
          "url": "./satellite/lakkon-2022-09-17.jpg",
          "date": "2022-09-17"
        }
      }
    }, {
      "id": "maksat",
      "name_en": "Maksat",
      "name_ru": "Максат",
      "description_en": "About 20 kilometres southwest of Tajikistan’s Bahri Tochik Reservoir located across the disputed border.",
      "description_ru": "TODO: Это некоторая информация о поселке Максат.",
      "yandex": "https://yandex.com/maps/geo/4209595903/?ll=69.700117%2C40.128022&z=14.11",
      "satellite": {
        "bounds": [
          [40.135509, 69.683447],
          [40.121072, 69.707574]
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
      "id": "min-bulak",
      "name_en": "Min-Bulak",
      "name_ru": "Мин-Булак",
      "description_en": "TODO: This is some info on the Min-Bulak village.",
      "description_ru": "TODO: Это некоторая информация о поселке Мин-Булак.",
      "yandex": "https://yandex.ru/maps/geo/4229754559/?l=sat%2Cskl&ll=70.632302%2C39.983485&z=15",
      "satellite": {
        "before": {
          "url": "./satellite/min-bulak-2021-05-02.jpg",
          "date": "2021-05-02",
          "bounds": [
            [39.987207, 70.618206],
            [39.978317, 70.626411]
          ],
        },
        "after": {
          "url": "./satellite/min-bulak-2022-09-17.png",
          "date": "2022-09-17",
          // "attribution": "planet", // TODO: implement display?
          "bounds": [
            [39.987838, 70.618912],
            [39.976945, 70.624856]
          ],
        }
      }
    }, {
      "id": "min-oruk",
      "name_en": "Min-Oruk",
      "name_ru": "Мин-Орук",
      "description_en": "TODO: This is some info on the Min-Oruk village.",
      "description_ru": "TODO: Это некоторая информация о поселке Мин-Орук.",
      "yandex": "https://yandex.ru/maps/geo/4114127012/?l=sat&ll=70.628840%2C39.995050&z=15",
      "satellite": {
        "bounds": [
          [ 40.002258,  70.617004],
          [ 39.990352,  70.625700]
        ],
        "before": {
          "url": "./satellite/min-oruk-2021-05-02.jpg",
          "date": "2021-05-02"
        },
        "after": {
          "url": "./satellite/min-oruk-2022-11-01.jpg",
          "date": "2022-11-01"
        }
      }
    }, {
      "id": "ovchi-kalacha",
      "name_en": "Ovchikalacha",
      "name_ru": "Овчикалача",
      "description_en": "About 20 kilometres southwest of Tajikistan’s Bahri Tochik Reservoir located across the disputed border. A narrow river and a road separates it from Kyrgyz villages of Maksat and International.",
      "description_ru": "TODO: Это некоторая информация о поселке Овчикалача.",
      "yandex": "https://yandex.ru/maps/geo/3159398637/?l=sat&ll=69.676854%2C40.126601&z=14",
      "satellite": {
        "bounds": [
          [40.129780, 69.680000],
          [40.115495, 69.689602]
        ],
        "before": {
          "url": "./satellite/ovchi-kalacha-2022-08-30.jpg",
          "date": "2022-08-30"
        },
        "after": {
          "url": "./satellite/ovchi-kalacha-2022-10-03.jpg",
          "date": "2022-10-03"
        }
      }
    }, {
      "id": "vorukh",
      "name_en": "Vorukh",
      "name_ru": "Ворух",
      "description_en": "TODO: This is some info on the Vorukh village.",
      "description_ru": "TODO: Это некоторая информация о поселке Ворух.",
      "yandex": "https://yandex.ru/maps/geo/2013643750/?l=sat&ll=70.532777%2C39.875283&z=15",
      "satellite": {
        "bounds": [
          [39.877353, 70.522732],
          [39.875836, 70.526223],
        ],
        "before": {
          "url": "./satellite/vorukh-2022-03-02.jpg",
          "date": "2022-03-02"
        },
        "after": {
          "url": "./satellite/vorukh-2022-11-01.jpg",
          "date": "2022-11-01"
        }
      }
    }]
};

export default config;
