<template>
  <div class="text-no-wrap border text-center">
    <h4>{{ forcast.day }}</h4>
    <h4 class="grey--text">{{ forcast.date }}</h4>
    <img class="text-center" :src="icon" alt="Weather icon">
    <div>{{ Math.round(forcast.high) }}&deg;F | {{ Math.round(forcast.low) }}&deg;F</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { format } from 'date-fns'

export default {
  name: 'Settings',
  components: { },
  props: { 
    forcast: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data: function () {
    return {  }
  },
  methods: {  },
  computed: {
    date: function () {
      return format(Date.now(), 'EEEE')
    },
    icon: function () {
      return `http://openweathermap.org/img/w/${this.forcast.icon}.png`;
    },
    ...mapState({
      // forcast: state => state.forcast
    })
  },
  mounted () {  },
  created() { 
    this.$store.commit('clearAllAlerts')
  }
}
</script>

<style>
.border {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
