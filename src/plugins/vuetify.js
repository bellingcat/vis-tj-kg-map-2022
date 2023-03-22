/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/lib/util/colors'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import ru from '../locales/ru';
import en from '../locales/en';

// Composables
import { createVuetify } from 'vuetify'

// console.log( { en: { ...en, ...customEn }, ru: { ...ru, ...customRu } })
export const i18n = new createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  globalInjection: true,
  locale: 'en',
  fallback: 'en',
  warnHtmlMessage: false,
  // messages: { en: { ...en, ...customEn }, ru: { ...ru, ...customRu } }
  messages: { en ,ru }
})


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: true,
        colors: {
          primary: colors.amber.accent2,
          secondary: colors.amber.lighten1,
        },
      },
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})
