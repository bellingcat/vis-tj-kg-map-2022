/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/lib/util/colors'
import { ru, en } from 'vuetify/locale'

// Composables
import { createVuetify } from 'vuetify'

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
    locale: 'en',
    fallback: 'ru',
    messages: { en, ru }
  }
})
