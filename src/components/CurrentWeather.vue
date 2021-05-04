<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h3>{{ Math.round(currentWeather.temp) }}&deg;F</h3>
          <img :src="icon" alt="Weather icon">
          <div>{{ currentWeather.description }}</div>
        </v-col>
        <v-col>
          <div>{{ currentWeather.humidity }}% humidity</div>
          <div>High: {{ todaysHigh }}&deg;F</div>
          <div>Low: {{ todaysLow }}&deg;F</div>
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
      return `http://openweathermap.org/img/w/${this.currentWeather.icon}.png`;
    },
    todaysHigh: function () {
      return this.forcast?.day1?.high
    },
    todaysLow: function () {
      return this.forcast?.day1?.low
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
