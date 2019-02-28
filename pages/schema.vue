<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="text-xs-center">
          Add New Schema
        </h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="pt-5">
      <v-flex xs12>
        <v-form v-model="valid">
          <v-layout row>
            <v-flex xs12 md6 class="px-3">
              <v-text-field
                v-model="schema.name"
                label="Name"
                required
              />
            </v-flex>
            <v-flex xs12 md6 class="px-3">
              <v-select
                v-model="schema.methods"
                label="Methods"
                :items="methodsOptions"
                multiple
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  <h4>Schema Fields</h4>
                </v-card-title>
                <v-container>
                  <v-layout v-for="(field, index) in schema.fields" :key="index" row>
                    <v-flex md1 class="px-2 pt-2">
                      <v-btn flat icon color="red" @click="removeField(index)">
                        <v-icon>remove</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex md5 class="px-2">
                      <v-text-field
                        v-model="field.name"
                        label="Name"
                        required
                      />
                    </v-flex>
                    <v-flex md5 class="px-2">
                      <v-select
                        v-model="field.type"
                        label="Type"
                        :items="typeOptions"
                        required
                      />
                    </v-flex>
                    <v-flex md1 class="px-2 pt-3">
                      <v-checkbox
                        v-model="field.isArray"
                        label="Array"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-btn
                  dark
                  color="green"
                  absolute
                  fab
                  bottom
                  right
                  @click="addField()"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row class="pt-5">
      <v-flex>
        <v-btn color="success" @click="submit()">
          Submit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'

export default {
  head: {
    title: 'New Schema'
  },
  middleware: 'authenticated',
  async asyncData({ app }) {
    // let schemaTypes = await app.$axios.get('http://localhost:3000/api/schema')
    // console.log('types', JSON.stringify(schemaTypes.data))
    // return {
    //   types: schemaTypes
    // }
  },
  data() {
    return {
      schema: {
        name: null,
        methods: ['get'],
        fields: [
          { name: null, isArray: false, type: null }
        ]
      },
      valid: false,
      methodsOptions: [
        { text: 'Create', value: 'post' },
        { text: 'Delete', value: 'delete' },
        { text: 'Modify', value: 'put' },
        { text: 'Read', value: 'get', disabled: true }
      ]
    }
  },
  computed: {
    typeOptions() {
      const defaultOptions = [
        { text: 'Text', value: 'String' },
        { text: 'Number', value: 'Number' },
        { text: 'Date', value: 'Date' }
      ]
      const schemaOptions = this.$store.state.schemas.map(schema => ({ text: schema.name, value: schema.name }))
      return _.union(defaultOptions, schemaOptions)
    }
  },
  methods: {
    addField() {
      this.schema.fields.push(
        { name: null, isArray: false, type: null }
      )
    },
    removeField(index) {
      this.schema.fields.splice(index, 1)
    },
    async submit() {
      // console.log('Submit', this.schema)
      const res = await this.$axios.$post('http://localhost:3000/api/schema', this.schema)
      // console.log('Result', res)
      this.$store.dispatch('addSchema', res)
    }
  }
}
</script>
