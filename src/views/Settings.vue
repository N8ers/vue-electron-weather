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
import { setUserPreferences, getUserPreferences } from '../../userPreferences.js'

// const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
// const baseUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly&appid=${apiKey}&units=${units}`;

export default {
  name: 'Settings',
  components: { },
  data: function () {
    return {
      apiKey: '',
      lat: '39.6867251',
      lng: '-86.2898475',
      alertBanner: null
    }
  },
  methods: {
    updateUserPreferences: function () {
      this.alertBanner = false;
      this.alertBanner = true;
      setUserPreferences()
    }
  },
  created() {
    console.log('CREATED ')
    let preferences = getUserPreferences()
    console.log('preferences ', preferences)
    const units = 'imperial';
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lng}&exclude=hourly&appid=${this.apiKey}&units=${units}`;
    // let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    fetch(url)
    .then((res) => console.log('res ', res))
    .catch((err) => console.log('err ', err))
  }
}
</script>
