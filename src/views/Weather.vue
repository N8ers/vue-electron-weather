<template>
  <div>
    <h2>Weather</h2>
    <v-btn color="success">getWeather</v-btn>

    <div>
      <h4>Current Weather:</h4>
      <p>{{ currentWeather }}</p>
    </div>

    <div v-for="(data, index) in forcast" :key="data.icon + index">
      <h5>Day {{index}}:</h5>
      <p>{{data}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Weather',
  components: { },

  data: function () {
    return { }
  },
  methods: {
    getWeather: function () {
      this.$http.get(`forecast?q=${this.stateCity}&units=imperial&appid=${this.stateApiKey}`)
        .then(response => {
          this.$store.dispatch('cleanWeatherData', response.data)
        })
        .catch((err) => {
          console.log('ERROR ', err)
        });
    }
  },
  computed: {
    ...mapState({
      stateApiKey: state => state.apiKey,
      stateCity: state => state.city,
      weatherAlert: state => state.weatherAlert,
      currentWeather: state => state.currentWeather,
      forcast: state => state.forcast
    })
  },
  mounted () {
    if (this.stateApiKey && this.stateCity) {
      this.getWeather();
    }
  }
}
</script>
