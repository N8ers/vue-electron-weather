<template>
  <div>

    <div v-if="weatherAlert && weatherAlert.type && weatherAlert.message">
      <v-alert text :type="weatherAlert.type">{{ weatherAlert.message }}</v-alert>
    </div>

    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="6" md="4">
          <current-weather />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" md="4">
          <v-btn color="success">Update Weather</v-btn>
        </v-col>
      </v-row>

      <v-row v-if="fourDayForcast && fourDayForcast.day2 && fourDayForcast.day2.high">     
        <v-col cols="12" sm="3" v-for="(day, index) in fourDayForcast" :key="day.date + index">
          <forcast-card :forcast="day" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { format } from 'date-fns'

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
      // with out network: uses dummyPayload.json
      // let data = require('../../dummyPayload.json')
      // this.$store.dispatch('cleanWeatherData', data)
      if (!this.stateCity || !this.stateApiKey) {
        let payload = {
            type: 'error',
            message: 'looks like you\'re missing an API key or Locaiton. Go to Settings.'
          }
          this.$store.commit('setWeatherAlert', payload)
      } else {
              this.$http.get(`forecast?q=${this.stateCity}&units=imperial&appid=${this.stateApiKey}`)
        .then(response => {
          this.$store.dispatch('cleanWeatherData', response.data)
        })
        .catch((error) => {
          let payload = {
            type: 'error',
            message: error.message
          }
          this.$store.commit('setWeatherAlert', payload)
        });
      }
    }
  },
  computed: {
    date: function () {
      return format(Date.now(), 'EEEE, MMM do')
    },
    ...mapState({
      stateApiKey: state => state.apiKey,
      stateCity: state => state.city,
      weatherAlert: state => state.weatherAlert,
      forcast: state => state.forcast,
      fiveDayForcast: state => state.fiveDayForcast,
      fourDayForcast: state => state.fourDayForcast,
      city: state => state.city,
    })
  },
  created () {
    if (this.stateApiKey && this.stateCity) {
      this.getWeather();
    }
  }
}
</script>
