<template>
  <div>
    <h4>{{ forcast.date }}</h4>
    <div>{{ forcast.high }}&deg;F</div>
    <div>{{ forcast.low }}&deg;F</div>
    <img :src="icon" alt="Weather icon">
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
  created() {  }
}
</script>
