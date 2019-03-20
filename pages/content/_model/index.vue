<template>
  <content-page :schema="schema" :meta="meta" :fields="fields" />
</template>

<script>
import _ from 'lodash'

import ContentPage from '@/components/ContentPage'

const getTypefromMeta = (metaType, isRef) => {
  if (isRef) return 'v-input-autocomplete'
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
    return {
      meta,
      schema,
      fields
    }
  },
  components: { ContentPage }
}
</script>
