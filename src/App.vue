<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Weather
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="$route.name !== 'Settings'" to="/settings">
        <span>Settings</span>
      </v-btn>

      <v-btn v-else to="/">
        <span>Weather</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({ }),
  mounted() {
    this.$store.dispatch('getData')
  }
};
</script>
