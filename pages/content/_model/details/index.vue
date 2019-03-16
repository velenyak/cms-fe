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
      <!-- <button type="submit">
        Submit
      </button> -->
    </form>
  </v-container>
</template>

<script>
import _ from 'lodash'

const getTypefromMeta = (metaType, isRef) => {
  if (isRef) return 'v-input-select'
  switch (metaType) {
    case 'string': return 'v-input-text'
    case 'date': return 'v-input-date'
    case 'number': return 'v-input-number'
    case 'boolean': return 'v-input-checkbox'
    default: return 'v-input-text'
  }
}

export default {
  middleware: 'authenticated',
  async asyncData({ app, params }) {
    const { meta, schema } = await app.$axios.$get(`/schema/${params.model}`)
    const fields = _.get(meta, 'fields', [])
      .map(f => ({
        key: f.name,
        type: getTypefromMeta(f.typeOf),
        label: f.options ? f.options.label || f.name : f.name
      })
      )
    fields.push({ key: 'test', type: 'v-input-select', templateOptions: { options: [] } })
    return {
      meta,
      schema,
      fields
    }
  },
  data() {
    return {
      model: {
        name: {
          userName: 'Test'
        }
      },
      form: {}
    }
  }
}
</script>
