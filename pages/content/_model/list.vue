<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h1>
          {{ $route.params.model }}
        </h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="schemaData"
        >
          <template v-slot:items="props">
            <td
              v-for="(key, $index) in headers"
              :key="$index"
            >
              <v-icon v-if="key.field.typeOf === 'boolean'">
                {{ formatItem(props.item, key) }}
              </v-icon>
              <span v-else v-html="formatItem(props.item, key)" />
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      {{ $route.params.model }}
      <br>
      <pre><code>{{ schemaData }}</code></pre>
      <!-- <h2>Populated</h2> -->
      <!-- <pre><code>{{ schemaData2 }}</code></pre> -->
      <pre><code>{{ schemaMeta }}</code></pre>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  async asyncData({ app, params }) {
    const schemaMeta = await app.$axios.$get(`/schema/${params.model}`)
    const schemaData = await app.$axios.$get(`/api/v1/${params.model}`)
    // const query = {}
    // const populate = schemaMeta.fields.map((field) => {
    //   if (field.ownRef) return { path: field.name, model: field.type }
    // }).filter(_.identity)
    // query.populate = populate
    // console.log(JSON.stringify(query))
    // const schemaData2 = await app.$axios.$get(`/api/v1/${params.model}`, { params: query })
    return {
      schemaData,
      // schemaData2,
      schemaMeta
    }
  },
  computed: {
    headers() {
      return _.map(this.schemaMeta.meta.fields, f => ({ text: _.get(f, 'options.label', f.name), value: f.name, field: f }))
    }
  },
  methods: {
    formatItem(item, header) {
      const type = header.field.typeOf
      switch (_.lowerCase(type)) {
        case 'string': return _.get(item, header.value)
        case 'date': return moment(_.get(item, header.value)).format('L')
        case 'boolean': return _.get(item, header.value) ? 'done' : 'clear'
        case 'number': return _.get(item, header.value)
      }
    }
  }
}
</script>
