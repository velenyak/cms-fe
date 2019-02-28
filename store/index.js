export const state = () => ({
  schemas: [],
  user: {},
  token: null,
  isAuthorized: false
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
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const schemas = await app.$axios.$get('http://localhost:3000/api/schema')
    commit('SET_SCHEMAS', schemas)
  },
  addSchema({ commit, state }, newSchema) {
    const schemas = state.schemas || []
    schemas.push(newSchema)
    commit('SET_SCHEMAS', schemas)
  },
  login({ commit }, { user, token }) {
    commit('SET_USER', user)
    commit('SET_TOKEN', token)
    commit('SET_AUTHORIZED', true)
    localStorage.setItem('token', token)
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    commit('SET_AUTHORIZED', false)
    localStorage.removeItem('token')
  }
}
