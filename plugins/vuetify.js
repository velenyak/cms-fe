import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/es5/util/colors'
import en from 'vuetify/es5/locale/en'
import hu from 'vuetify/es5/locale/hu'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  lang: {
    locales: { en, hu },
    current: 'hu'
  }
})
