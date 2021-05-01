<template>
  <v-container>
    <div>Hi</div>
    <button @click="getMessages">get message</button>
    <form @submit.prevent="saveMessages">
      <label>Message:</label>
      <input v-model="message" type="text" />
      <button type="submit">submit</button>
    </form>

    <hr>
    <div>
      <label>GET:</label>
      <button @click="get">GET</button>
      <label>SET:</label>
      <button @click="set">SET</button>
    </div>
  </v-container>
</template>

<script>
// import DataStore from '../db.js'
// import { setUserPreferences, getUserPreferences } from '../background.js'
import { get, set } from '../db.js';

export default {
  name: 'HelloWorld',

  data: function () {
    return {
      apiKey: '',
      query: 'indianapolis',
      lat: '39.6867251',
      lng: '-86.2898475',
      alertBanner: null,
      message: ''
    }
  },
  methods: {
    saveMessages: function () {
      console.log('saving: ', this.message)
    },
    getMessages: function () {
      console.log('get messages')
    },
    get: function () {

      // let data = getUserPreferences()
      // let data = DataStore.getTodos()
      // console.log('data ', data)

      const huh = get()
      console.log('huh ', huh)
    },
    set: function () {
      set()
      // setUserPreferences()
    },
    getWeather () {
       this.$http
      .get(`/weather?q=${this.query}&units=metric&&appid=${this.apiKey}`)
      .then(response => {
        console.log('response ', response)
        // this.city = response.data.name;
        // this.country = response.data.sys.country;
        // this.weatherDescription = response.data.weather[0].description;
        // this.temp = response.data.main.temp;
        // this.tempMin = response.data.main.temp_min;
        // this.tempMax = response.data.main.temp_max;
        // this.humidity = response.data.main.humidity;
        // this.icon = `http://openweathermap.org/img/w/${
        //   response.data.weather[0].icon
        // }.png`;
        // this.error = false;
      })
      .catch(() => {
        console.log('CATCH')
        this.error = true;
        this.city = '';
      });
    }

  },
  mounted() {
  //  this.get()
  }
}
</script>
