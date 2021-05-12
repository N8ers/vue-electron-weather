<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <div class="text-h4">{{ Math.round(currentWeather.temp) }}&deg;F</div>
          <img :src="icon" alt="Weather icon">
          <div class="text-subtitle-2">{{ currentWeather.description }}</div>
        </v-col>
        <v-col class="text-subtitle-2">
          <h4>{{ city }}</h4>
          <h4>{{ date }}</h4>
          <div class="mt-2">High: {{ todaysHigh }}&deg;F</div>
          <div>Low: {{ todaysLow }}&deg;F</div>
          <div>Humidity: {{ currentWeather.humidity }}%</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { format } from 'date-fns'

export default {
  name: 'Settings',
  components: { },
  props: {  },
  data: function () {
    return {  }
  },
  methods: {  },
  computed: {
    date: function () {
      return format(Date.now(), 'EEEE, MMM do')
    },
    icon: function () {
      if (this.currentWeather && this.currentWeather.icon) {
        return `http://openweathermap.org/img/w/${this.currentWeather.icon}.png`
      }
      return ''
    },
    todaysHigh: function () {
      if (this.forcast && this.forcast.day1 && this.forcast.day1.high) {
        return this.forcast.day1.high
      }
      return 'this.forcast.day1.high'
    },
    todaysLow: function () {
      if (this.forcast && this.forcast.day1 && this.forcast.day1.low) {
        return this.forcast.day1.low
      }
      return ''
    },
    ...mapState({
      currentWeather: state => state.currentWeather,
      forcast: state => state.forcast,
      city: state => state.city,
    })
  },
  mounted () {  },
  created() {  }
}
</script>
