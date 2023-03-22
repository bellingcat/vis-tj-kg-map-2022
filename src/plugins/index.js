/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify, {i18n} from './vuetify'
import router from '../router'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

export function registerPlugins(app) {
  loadFonts()
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(Toast)
}
