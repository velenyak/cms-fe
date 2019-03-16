<template>
  <div>
    {{ $route.params.type }}
    <pre><code>{{ schemaData }}</code></pre>
    <h2>Populated</h2>
    <pre><code>{{ schemaData2 }}</code></pre>
    <pre><code>{{ schemaMeta }}</code></pre>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  async asyncData({ app, params }) {
    const schemaMeta = await app.$axios.$get(`/schema/${params.type}`)
    const schemaData = await app.$axios.$get(`/api/v1/${params.type}`)
    const query = {}
    const populate = schemaMeta.fields.map((field) => {
      if (field.ownRef) return { path: field.name, model: field.type }
    }).filter(_.identity)
    query.populate = populate
    console.log(JSON.stringify(query))
    const schemaData2 = await app.$axios.$get(`/api/v1/${params.type}`, { params: query })
    return {
      schemaData,
      schemaData2,
      schemaMeta
    }
  }
}
</script>
