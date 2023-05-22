# Tajikistan-Kyrgyzstan Border Clash 2022

<h2 align="center"><a href="https://bellingcat.github.io/vis-tj-kg-map-2022/">visit the map</a></h3>

### Development

Built with vite, vue.js and vuetify. 

```bash
# install dependencies
npm install
# run locally with hot reload
npm run dev
# same but share on local network
npm run dev -- --host
# build (optional)
npm run build
# deploy
npm run deploy-ghpages

# lint fix
npm run lint
```

### Configuring data/translations
1. incidents present in [incidents.json](/public/incidents.json)
2. villages configs in [config.js](config.js)
3. translations in [config.js](config.js) and [locales/](src/locales/) (en and ru)

### Fetching geojson's from yandex maps
1. find the village
2. Network > find the `search?ajax=1` request which returns a large payload with all the village's data
3. Extract, format and find the `GeometryCollection` info.


```html
<iframe src="https://bellingcat.github.io/vis-tj-kg-map-2022?disable-scroll=1&ask-embeds=0" title="Tajikistan-Kyrgyzstan Border Clash 2022 map" height="640" width="100%" allow="fullscreen; clipboard-write; "></iframe>

<iframe src="http://localhost:3000?disable-scroll=1&ask-embeds=0" title="Tajikistan-Kyrgyzstan Border Clash 2022 map" height="640" width="100%" allow="fullscreen; clipboard-write; "></iframe>
```

Optional GET parameters:
1. `disable-scroll=1` - will disable auto-scroll on the left side panel - needed for `<iframe>` embeds.
2. `ask-embeds=0` - will not show dialog to ask for embeds when clicking the actions menu for the first time.
3. `no-cover=1` - will not show the initial cover pane
3. `lang=en/ru` - will overwrite the default display language `en`