<template>
  <div>
    <h2>Weather</h2>
    <v-btn color="success">getWeather</v-btn>

    <div v-for="(data, index) in weather" :key="data.icon + index">
      <div>{{data}}</div>
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
      weather: state => state.weather
    })
  },
  mounted () {
    if (this.stateApiKey && this.stateCity) {
      this.getWeather();
    }
  }
}
</script>
