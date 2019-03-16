<template>
  <v-app dark>
    <v-content>
      <v-layout
        column
        justify-center
        align-center
      >
        <v-flex>
          <v-card class="px-5 py-3">
            <v-card-title>
              <h2>Login to Super CMS system</h2>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <p class="text-sm-center">
                <b>
                  Login using email and password
                </b>
              </p>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
              />
              <v-layout
                column
                justify-center
                align-center
              >
                <v-btn
                  color="success"
                  @click="localLogin"
                >
                  Login
                </v-btn>
              </v-layout>
              <v-divider class="mt-3" />
              <p class="mt-2 text-sm-center">
                <b>
                  Or using Google
                </b>
              </p>
              <v-layout
                column
                justify-center
                align-center
              >
                <v-btn
                  color="white"
                  light
                  @click="googleLogin"
                >
                  <img src="/img/g-logo.png" class="g-logo">
                  Sign in with Google
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import _ from 'lodash'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async localLogin() {
      try {
        const result = await this.$axios.$post('/auth/login/local', {
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('login', { user: _.get(result, 'user'), token: _.get(result, 'token') })
        Cookie.set('auth', _.get(result, 'token'))
        this.$router.push('/')
      } catch (e) {
        console.error('Error', e)
      }
    },
    async googleLogin() {
      try {
        const googleUser = await this.$gAuth.signIn()
        const result = await this.$axios.$post(`/auth/login/google`, { accessToken: googleUser.getAuthResponse().id_token })
        this.$store.dispatch('login', { user: _.get(result, 'user'), token: _.get(result, 'token') })
        Cookie.set('auth', _.get(result, 'token'))
        this.$router.push('/')
        console.log('WHY NOT NAVIGATE')
      } catch (e) {
        console.error('Error', e)
        this.$store.dispatch('addAlert', { text: 'Nem sikerült a sémát feltölteni', color: 'danger' })
      }
    }
  }
}
</script>

<style scoped>
.g-logo {
  max-height: 30px;
  width: auto;
  margin-right: 1rem;
}
</style>
