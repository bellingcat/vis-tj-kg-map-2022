# base

sources: https://data.humdata.org/dataset/geoboundaries-admin-boundaries-for-kyrgyzstan
## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).


### Configuring data/transaltions
1. incidents present in [incidents.json](/public/incidents.json)
2. villages configs in [config.js](config.js)
3. translations in [config.js](config.js) and [locales/](src/locales/) (en and ru)

### Fetching geojson's from yandex maps
1. find the village
2. Network > find the `search?axaj=1` request which returns a large payload with all the village's data
3. Extract, format and find the `GeometryCollection` info.


<iframe src="https://bellingcat.github.io/vis-tj-kg-map-2022?disable-scroll=1&ask-embeds=1" title="Tajikistan - Kyrgyzstan border conflict 2022 MAP" height="640" width="100%"></iframe>

Optional GET parameters:
1. `disable-scroll=1` - will disable auto-scroll on the left side panel - needed for `<iframe>` embeds.
2. `ask-embeds=0` - will not show dialog to ask for embeds when clicking the actions menu for the first time.