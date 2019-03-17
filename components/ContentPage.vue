<template>
  <v-container>
    <form>
      <no-ssr>
        <formly-form :form="form" :model="model" :fields="fields" custom-layout="true">
          <template scope="f">
            <v-layout row>
              <formly-field
                v-for="(field, $index) in f.keys"
                :key="$index"
                :form.sync="form"
                :model.sync="model"
                :field="field"
              />
            </v-layout>
          </template>
        </formly-form>
      </no-ssr>
    </form>
    <v-layout row class="mt-3">
      <v-flex class="text-xs-right">
        <v-btn color="success" @click="upload">
          Feltöltés
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    schema: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    contentData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      loading: false,
      model: {
        userName: 'Test'
      },
      form: {}
    }
  },
  methods: {
    async upload() {
      console.log('Upload', this.model)
      try {
        this.loading = true
        const res = await this.$axios.$post(`/api/v1/${this.meta.name}`, this.model)
        console.log('Result', res)
        this.$store.dispatch('addAlert', { text: 'Új adat feltöltve', color: 'success' })
      } catch (e) {
        console.error('Error uploading data', e)
        this.$store.dispatch('addAlert', { text: 'Nem sikerült az adatot feltölteni', color: 'error' })
        this.loading = false
      }
    }
  }
}
</script>
