<template>
  <v-app dark>
    <cms-header v-if="$route.name !== 'login'" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          py-3
          pr-5
          text-xs-right
          white--text
          xs12
        >
          &copy; {{ new Date().getFullYear() }} — <strong>Velenyák János</strong>
        </v-flex>
      </v-layout>
    </v-footer>
    <v-snackbar
      v-for="(alert, $index) in alerts"
      :key="$index"
      v-model="alert.show"
      :color="alert.color || 'success'"
      :bottom="alert.y === 'bottom'"
      :left="alert.x === 'left'"
      :multi-line="alert.mode === 'multi-line'"
      :right="alert.x === 'right'"
      :timeout="alert.timeout || 5000"
      :top="alert.y === 'top'"
      :vertical="alert.mode === 'vertical'"
    >
      {{ alert.text }}
      <v-btn
        dark
        flat
        @click="$store.dispatch('removeAlert', alert)"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import CmsHeader from '@/components/Header'

export default {
  components: { CmsHeader },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    alerts() {
      return this.$store.state.alerts
    }
  }
}
</script>
