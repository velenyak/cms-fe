<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/login')">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/schema">
          <v-list-tile-action>
            <v-icon>add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New Schema</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(item, index) in menu" :key="index" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>CMS</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-if="$store.state.isAuthorized"
        >
          <v-avatar>
            <img :src="$store.state.user.image || 'https://randomuser.me/api/portraits/men/1.jpg'">
          </v-avatar>
          <span class="pl-2">
            {{ $store.state.user.name.fullName }}
          </span>
        </v-btn>
        <v-btn
          v-if="$store.state.isAuthorized"
          flat
          @click="logout"
        >
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    menu() {
      return this.$store.state.schemas.map(schema => (
        { icon: 'done', title: schema.name, to: `/content/${schema.name}` }
      ))
    }
  },
  methods: {
    logout() {
      Cookie.remove('auth')
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
