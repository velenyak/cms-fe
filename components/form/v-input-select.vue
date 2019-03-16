<template>
  <v-flex class="px-2" lg4 md6 xs12>
    <v-select
      v-model="model[field.key]"
      :label="field.label"
      :items="to.options"
    />
  </v-flex>
</template>

<script>
import baseField from './baseField'

export default {
  mixins: [baseField]
}
</script>
