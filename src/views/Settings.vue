<template>
  <div> 
    <h2>Settings</h2>

    <div v-if="alertBanner">Save Successful/Nothing To Save/Save Failed</div>

    <form @submit.prevent="updateUserPreferences">
      <label for="apiKey">Dark Sky API key:</label>

      <input v-model="apiKey" type="text" name="apiKey" />

      <label for="lat">Latitude:</label>
      <input v-model="lat" type="text" name="lat" />

      <label for="lng">Longitude:</label>
      <input v-model="lng" type="text" name="lng" />

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
// import { setUserPreferences, getUserPreferences } from '../../userPreferences.js'

export default {
  name: 'Settings',
  components: { },
  data: function () {
    return {
      apiKey: '',
      query: '',
      lat: '39.6867251',
      lng: '-86.2898475',
      alertBanner: null
    }
  },
  methods: {
    updateUserPreferences: function () {
      this.alertBanner = false;
      this.alertBanner = true;
    }
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
