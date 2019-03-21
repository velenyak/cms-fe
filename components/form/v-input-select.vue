<template>
  <v-flex class="px-2" lg4 md6 xs12>
    <v-select
      v-model="model[field.key]"
      :label="field.label"
      :items="options || []"
    />
  </v-flex>
</template>

<script>
import baseField from './baseField'

export default {
  mixins: [baseField],
  data() {
    return {
      options: []
    }
  },
  async mounted() {
    if (this.to.field.ownRef) {
      const options = await this.$axios.$get(`/api/v1/${this.to.field.typeOf}`)
      this.options = options.map(o => ({ value: o._id, text: o.name }))
    }
  }
}
</script>
