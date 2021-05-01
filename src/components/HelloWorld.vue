<template>
  <v-container>
    <div>Hi</div>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: function () {
    return {
      apiKey: '',
      query: 'indianapolis',
      lat: '39.6867251',
      lng: '-86.2898475',
      alertBanner: null
    }
  },
  created() {
    this.$http
      .get(`/weather?q=${this.query}&units=metric&&appid=${this.apiKey}`)
      .then(response => {
        console.log('response ', response)
        // this.city = response.data.name;
        // this.country = response.data.sys.country;
        // this.weatherDescription = response.data.weather[0].description;
        // this.temp = response.data.main.temp;
        // this.tempMin = response.data.main.temp_min;
        // this.tempMax = response.data.main.temp_max;
        // this.humidity = response.data.main.humidity;
        // this.icon = `http://openweathermap.org/img/w/${
        //   response.data.weather[0].icon
        // }.png`;
        // this.error = false;
      })
      .catch(() => {
        console.log('CATCH')
        this.error = true;
        this.city = '';
      });
  }
}
</script>
