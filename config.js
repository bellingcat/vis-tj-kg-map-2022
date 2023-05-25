const config = {
  title: "tj-kg",
  display_title: "Tajikistan-Kyrgyzstan Border Clash 2022",
  //   SERVER_ROOT: "https://ukraine.bellingcat.com/ukraine-server",
  // MEDIA_EXT: "/api/media",

  app: {
    map: {
      anchor: { lat: 39.936132, lon: 70.351180 },
      // anchor: { lat: 40.172841, lon: 70.862127 }, //dev
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
      startVillage: null
      // startVillage: 'lakkon' // eg: "ovchi-kalacha"
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "Ak-Sai is located next to the Tajik enclave of Vorukh. A narrow street separates Ak-Sai from Vorukh.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "Located 2.5 kilometres South of Tajikistan’s Bahri Tochik Reservoir. ",
      "description_ru": "Расположено в 2,5 километрах к югу от таджикского водохранилища Бахри Точик.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "The capital of the Batken Region, Kyrgyzstan.",
      "description_ru": "Столица Баткенской области Кыргызстана.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "Located five kilometres southwest of Tajikistan’s Bahri Tochik Reservoir.",
      "description_ru": "Расположено в пяти километрах к юго-западу от таджикского водохранилища Бахри Точик.",
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
      "country_en": "Tj",
      "country_ru": "Тадж",
      "description_en": "A village located along the Isfara river and surrounded by mountains to the west and east. The village is located approximately five kilometres south of the Tajik city of Isfara.",
      "description_ru": "Село, расположенное вдоль реки Исфара и окруженное горами с запада и востока. Село расположено примерно в пяти километрах к югу от таджикского города Исфара.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "A collection of about 60 households, surrounded by mountains to the east, and the Isfara river to the west.",
      "description_ru": "Село из примерно 60 домохозяйств, окруженное горами с востока и рекой Исфара с запада.",
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
      "name_ru": "Интернационал",
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "About 20 kilometres southwest of Tajikistan’s Bahri Tochik Reservoir located across the disputed border. A narrow river and a road serve as an unofficial border between Maksat, International  and the village of Ovchi-Kalacha in Tajikistan.",
      "description_ru": "Примерно в 20 километрах к юго-западу от таджикского водохранилища Бахри Точик, расположенного по ту сторону спорной границы. Узкая река и дорога служат неофициальной границей между Максатом, Интернационалом и селом Овчи-Калача в Таджикистане.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "A small village surrounded by mountains to the east and a river to the west. The river separates Kapchygai from Kyrgyzstan  controlled Ak-Sai and the Tajik enclave of Vorukh.",
      "description_ru": "Небольшое село, окруженное горами с востока и рекой с запада. Река отделяет Капчыгай от села Ак-Сай, и таджикского эксклава Ворух.",
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
      "name_ru": "Карабак",
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "A village located a couple of kilometres west of Lakkon, in the same valley.",
      "description_ru": "Село, расположенное в паре километров к западу от Лаккона, в той же долине.",
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
      "name_ru": "Кочобою",
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "It is one of three small villages that includes Kok-Terek and Zhaka-Oruk. Located north of the Kyrgyzstan controlled village of Ak-Sai in between the Tajik enclave of Vorukh and the town of Chorkuh in Tajikistan.",
      "description_ru": "Одно из трех небольших сел, включающих Кок-Терек и Жака-Орук. Одно из трех небольших сел, включающих Кок-Терек и Жака-Орук. Расположен к северу от села Ак-Сай, у дороги соединяющей таджикский эксклав Ворух с городом Чоркух в Таджикистане.",
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
      "country_en": "Tj",
      "country_ru": "Тадж",
      "description_en": "A small village located in a valley, approximately five kilometres south of the Uzbek border.",
      "description_ru": "Небольшое село, расположенное в долине, примерно в пяти километрах к югу от узбекской границы.",
      "yandex": "https://yandex.ru/maps/geo/1508553686/?l=sat&ll=70.861816%2C40.176772&z=15",
      "satellite": {
        "before": {
          "url": "./satellite/lakkon-2022-07-23.jpg",
          "date": "2022-07-23",
          "bounds": [
            [40.172841, 70.862127],
            [40.170207, 70.867966]
          ],
        },
        "after": {
          "url": "./satellite/lakkon-2022-09-17.png",
          "date": "2022-09-17",
          "bounds": [
            [40.172884, 70.862059],
            [40.169943, 70.867833]
          ],
        }
      }
    }, {
      "id": "maksat",
      "name_en": "Maksat",
      "name_ru": "Максат",
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "About 20 kilometres southwest of Tajikistan’s Bahri Tochik Reservoir located across the disputed border. A narrow river and a road serve as an unofficial border between Maksat, International  and the village of Ovchi-Kalacha in Tajikistan.",
      "description_ru": "Примерно в 20 километрах к юго-западу от таджикского водохранилища Бахри Точик, расположенного по ту сторону спорной границы. Узкая река и дорога служат неофициальной границей между Максатом, Интернационалом и селом Овчи-Калача в Таджикистане.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "Located about three kilometers west of Kyrgyzstan’s Tortkul Reservoir and 17km west of Batken city. Min-Bulak is located south of the Kyrgyz village of Min-Oruk.",
      "description_ru": "Расположено примерно в трех километрах к западу от Торткульского водохранилища в Кыргызстане и в 17 км к западу от города Баткен. Село Мин-Булак расположено к югу от кыргызского села Мин-Орук.",
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
      "country_en": "Kg",
      "country_ru": "Кырг",
      "description_en": "Located 4 kilometres west of Kyrgyzstan’s Tortkul Reservoir and 17 kilometres west of Batken city. Min-Oruk is located north of the Kyrgyz village Min-Bulak and east of the Tajik village of Surkh.",
      "description_ru": "Расположено в 4 километрах к западу от Торткульского водохранилища в Кыргызстане и в 17 километрах к западу от города Баткен. Село Мин-Орук расположено к северу от кыргызского села Мин-Булак и к востоку от таджикского села Сурх.",
      "yandex": "https://yandex.ru/maps/geo/4114127012/?l=sat&ll=70.628840%2C39.995050&z=15",
      "satellite": {
        "bounds": [
          [40.002258, 70.617004],
          [39.990352, 70.625700]
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
      "name_en": "Ovchi-Kalacha",
      "name_ru": "Овчи-Калача",
      "country_en": "Tj",
      "country_ru": "Тадж",
      "description_en": "Located approximately 20 kilometres southwest of Tajikistan’s Bahri Tochik Reservoir located across the disputed border. A narrow river and a road separates it from Kyrgyz villages of Maksat and International.",
      "description_ru": "Расположено примерно в 20 километрах к юго-западу от таджикского водохранилища Бахри Точик, расположенного по ту сторону спорной границы. Узкая река и дорога отделяют его от кыргызских сел Максат и Интернационал.",
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
      "country_en": "Tj",
      "country_ru": "Tадж",
      "description_en": "The Vorukh enclave is approximately 92 square kilometres. It borders the villages of Ak-Sai and Kapchygai controlled by Kyrgyzstan.",
      "description_ru": "Площадь эксклава Ворух составляет приблизительно 92 квадратных километра. Он граничит с селами Ак-Сай и Капчыгай.",
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
