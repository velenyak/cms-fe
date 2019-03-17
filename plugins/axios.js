export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.isAuthorized && store.state.token) {
      config.headers.common.Authorization = `Bearer ${store.state.token}`
    }
  })
}
