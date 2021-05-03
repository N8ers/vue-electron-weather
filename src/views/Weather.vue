<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="6" md="4">
          <current-weather />
        </v-col>
        <v-col cols="6" md="4">
          <v-btn color="success">Update Weather</v-btn>
        </v-col>
      </v-row>

      <hr >

      <v-row>     
        <v-col v-for="(day, index) in fiveDayForcast" :key="day.high + index" cols="2" md="4">
          <forcast-card :forcast="day" />
        </v-col>
      </v-row>
    </v-container>
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
      forcast: state => state.forcast,
      fiveDayForcast: state => state.fiveDayForcast
    })
  },
  mounted () {
    if (this.stateApiKey && this.stateCity) {
      this.getWeather();
    }
  }
}
</script>
