export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.isAthorized && store.state.token) {
      config.headers.common.Authorization = `Bearer ${store.state.token}`
    }
  })
}
