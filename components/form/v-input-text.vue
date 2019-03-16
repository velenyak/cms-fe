<template>
  <v-flex class="px-2" lg4 md6 xs12>
    <!-- {{ $props }} -->
    <v-text-field
      v-model="model[field.key]"
      type="input"
      :label="field.label"
    />
  </v-flex>
</template>

<script>
import baseField from './baseField'

export default {
  mixins: [baseField]
}
</script>
