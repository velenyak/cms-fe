<template>
  <v-flex lg4 md6 xs12 class="px-2">
    <!-- {{ $props }} -->
    <v-input
      class="datetime"
    >
      <div class="v-text-field__slot">
        <label class="v-label theme--dark" :class="{ 'v-label--active': model[field.key] }">
          {{ field.label }}
        </label>
        <datetime
          v-model="model[field.key]"
          :type="to.type"
        />
      </div>
    </v-input>
  </v-flex>
</template>

<script>
import baseField from './baseField'

export default {
  mixins: [baseField]
}
</script>

<style>
.v-input.datetime label {
  left: 0px !important;
  right: auto !important;
  position: absolute !important;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  bottom: 6px;
  -webkit-transform-origin: top left;
  transform-origin: top left;
  white-space: nowrap;
  pointer-events: none;
}
.datetime .v-input__slot>div {
  width: 100%;
}
.datetime .v-label--active {
  transform: translateY(-18px) scale(0.75);
}
.vdatetime {
  padding-top: 16px;
  border-bottom: solid thin rgba(255, 255, 255, 0.7);
}
input {
  flex: 1 1 auto;
  line-height: 20px;
  padding: 8px 0 8px;
  max-width: 100%;
  min-width: 0px;
  width: 100%;
}
</style>
