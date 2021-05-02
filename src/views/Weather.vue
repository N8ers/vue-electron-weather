<template>
  <div>
    <h2>Weather</h2>
    <v-btn color="success">Update Weather</v-btn>

    <current-weather />

    <div v-for="(day, index) in forcast" :key="day.high + index">
      <forcast-card :forcast="day" />
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import CurrentWeather from '../components/CurrentWeather.vue'
import ForcastCard from '../components/ForcastCard.vue'

export default {
  name: 'Weather',
  components: {
    CurrentWeather,
    ForcastCard
  },
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
