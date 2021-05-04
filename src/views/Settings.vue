<template>
  <div> 
    <div v-if="settingsAlert && settingsAlert.type && settingsAlert.message">
      <v-alert text :type="settingsAlert.type">{{ settingsAlert.message }}</v-alert>
    </div>

    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="pa-2" outlined tile>
            <v-form @submit.prevent="updateUserData">
              <v-text-field v-model="apiKey" :rules="apiKeyRules" label="API key" required></v-text-field>
              <v-text-field v-model="city" :rules="cityRules" label="City" required></v-text-field>
              <v-btn :disabled="!apiKey.length || !city.length" color="success" class="mr-4 mt-4" type="submit">Update</v-btn>
            </v-form>

            <v-card-text>For this application to work, you need to obtain an a free 'API Key' from 
              <a href="openweathermap.org" target="_blank">openweathermap.org</a>.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  components: { },
  data: function () {
    return {
      apiKey: '',
      city: '',
      apiKeyRules: [
        value => !!value || 'API Key is required',
      ],
      cityRules: [
        value => !!value || 'City is required',
      ]
    }
  },
  methods: {
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
