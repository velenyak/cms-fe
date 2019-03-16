<template>
  <v-flex lg4 md6 xs12 class="px-2">
    <!-- {{ $props }} -->
    <v-input
      :label="field.label"
    >
      <datetime
        v-model="model[field.key]"
        :type="to.type"
      />
    </v-input>
  </v-flex>
</template>

<script>
import baseField from './baseField'

export default {
  mixins: [baseField]
}
</script>

<style scoped>

</style>
