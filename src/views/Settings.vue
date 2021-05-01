<template>
  <div> 
    <h2>Settings</h2>

    <div v-if="settingsAlert && settingsAlert.type && settingsAlert.message">
      <v-alert text :type="settingsAlert.type">{{ settingsAlert.message }}</v-alert>
    </div>

    <v-form @submit.prevent="updateUserData">
      <v-text-field v-model="apiKey" label="API key" required></v-text-field>
      <v-text-field v-model="city" label="City" required></v-text-field>
      <v-btn color="success" class="mr-4" type="submit">Update</v-btn>
    </v-form>

  </div>
</template>

<script>
// import { setUserPreferences, getUserPreferences } from '../../userPreferences.js'
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  components: { },
  data: function () {
    return {
      apiKey: '',
      city: ''
    }
  },
  methods: {
    // updateUserPreferences: function () {
    //   this.alertBanner = false;
    //   this.alertBanner = true;
    // }
    updateUserData: function () {
      let data = {
        apiKey: this.apiKey,
        city: this.city
      }
      this.$store.dispatch('setData', data)
    }
  },
  computed: {
    ...mapState({
      stateApiKey: state => state.apiKey,
      stateCity: state => state.city,
      settingsAlert: state => state.settingsAlert
    })
  },
  mounted () {
    this.apiKey = this.stateApiKey
    this.city = this.stateCity
  },
  created() {
    // this.$http
    //   .get(`/weather?q=${this.query}&units=metric&&appid=${this.apiKey}`)
    //   .then(response => {
    //     this.city = response.data.name;
    //     this.country = response.data.sys.country;
    //     this.weatherDescription = response.data.weather[0].description;
    //     this.temp = response.data.main.temp;
    //     this.tempMin = response.data.main.temp_min;
    //     this.tempMax = response.data.main.temp_max;
    //     this.humidity = response.data.main.humidity;
    //     this.icon = `http://openweathermap.org/img/w/${
    //       response.data.weather[0].icon
    //     }.png`;
    //     this.error = false;
    //   })
    //   .catch(() => {
    //     this.error = true;
    //     this.city = '';
    //   });
  }
}
</script>
