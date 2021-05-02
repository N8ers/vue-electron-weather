<template>
  <div>
    <h4>{{ date }}</h4>
    <div>{{ currentWeather.temp }}&deg;F</div>
    <div>{{ currentWeather.temp }}%</div>
    <img :src="icon" alt="Weather icon">
    <div>{{ currentWeather.description }}</div>
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
    ...mapState({
      currentWeather: state => state.currentWeather,
    })
  },
  mounted () {  },
  created() {  }
}
</script>
