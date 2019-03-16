import Vue from 'vue'
import VueFormly from 'vue-formly'

Vue.use(VueFormly)
VueFormly.addType('v-input-text', () => import(/* webpackChunkName: "formly" */'@/components/form/v-input-text'))
VueFormly.addType('v-input-date', () => import(/* webpackChunkName: "formly" */'@/components/form/v-input-date'))
VueFormly.addType('v-input-number', () => import(/* webpackChunkName: "formly" */'@/components/form/v-input-number'))
VueFormly.addType('v-input-checkbox', () => import(/* webpackChunkName: "formly" */'@/components/form/v-input-checkbox'))
VueFormly.addType('v-input-select', () => import(/* webpackChunkName: "formly" */'@/components/form/v-input-select'))
