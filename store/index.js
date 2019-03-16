import _ from 'lodash'
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  schemas: [],
  user: {},
  token: null,
  isAuthorized: false,
  alerts: []
})

export const mutations = {
  SET_SCHEMAS(state, schemas) {
    state.schemas = schemas
  },
  SET_USER(state, data) {
    state.user = data
  },
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_AUTHORIZED(state, data) {
    state.isAuthorized = data
  },
  SET_ALERTS(state, data) {
    state.alerts = data
  },
  ADD_ALERT(state, data) {
    state.alerts = state.alerts.concat(data)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app, req, redirect }) {
    try {
      const schemas = await app.$axios.$get('/schema')
      commit('SET_SCHEMAS', schemas)
    } catch (e) {
      commit('SET_SCHEMAS', [])
    }
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        const token = parsed.auth
        if (token) {
          const result = await app.$axios.$get('/auth/refreshToken', { headers: { 'Authorization': `Bearer ${token}` } })
          commit('SET_USER', _.get(result, 'user'))
          commit('SET_TOKEN', _.get(result, 'token'))
          commit('SET_AUTHORIZED', true)
          // redirect('/')
        }
      } catch (err) {
        // No valid cookie found
        console.error('Error Authenticating user from cookie token', err)
      }
    }
  },
  addSchema({ commit, state }, newSchema) {
    const schemas = state.schemas || []
    commit('SET_SCHEMAS', schemas.concat(newSchema))
  },
  login({ commit }, { user, token }) {
    commit('SET_USER', user)
    commit('SET_TOKEN', token)
    commit('SET_AUTHORIZED', true)
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    commit('SET_AUTHORIZED', false)
  },
  addAlert({ commit, state }, alert) {
    if (!alert.y) alert.y = 'top'
    if (!alert.timeout) alert.timeout = 5000
    alert.show = true
    commit('ADD_ALERT', alert)
    setTimeout(() => {
      commit('SET_ALERTS', state.alerts.filter(a => a.text !== alert.text))
    }, alert.timeout)
  },
  removeAlert({ commit, state }, alert) {
    commit('SET_ALERTS', state.alerts.filter(a => a.text !== alert.text))
  }
}
