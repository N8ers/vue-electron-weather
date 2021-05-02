import Vue from 'vue'
import Vuex from 'vuex'
import { 
  isSameDay, 
  // format, 
  // toDate 
} from 'date-fns'

import { get, set } from '../db.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: null,
    city: null,
    weather: null,
    settingsAlert: {
      type: null,
      message: null
    },
    weatherAlert: {
      type: null,
      message: null
    }
  },
  mutations: {
    setData (state, data) {
      state.apiKey = data.apiKey
      state.city = data.city
    },
    setSettingsAlert (state, data) {
      state.settingsAlert = data
    },
    setWeather (state, data) {
      state.weather = data
    }
  },
  actions: {
    getData ({ commit }) {
      const data = get()
      if (data.apiKey && data.city) {
        commit('setData', data)
      } else {
        commit('setSettingsAlert', { type: 'error', message: 'Try again' })
      }
    },
    setData ({ dispatch, commit }, data) {
      commit('setSettingsAlert', { type: null, message: null })
      set(data)
      dispatch('getData')
      commit('setSettingsAlert', { type: 'success', message: 'Data updated' })
    },
    cleanWeatherData ({ commit }, data) {
      let cleanData = removeExtraniousData(data)
      let dataByDay = organizeDataByDay(cleanData)
      let formatedData = formatHighsAndLows(dataByDay)
      let formatedIcon = formatIcon(formatedData)

      console.log('formatedIcon ', formatedIcon)
      commit('setWeather', dataByDay)
    }
  }
})

function removeExtraniousData (data) {
  return data.list.map((item) => {
    return {
      time: new Date(item.dt * 1000),
      temp: item.main.temp,
      tempMax: item.main.temp_max,
      tempMin: item.main.temp_min,
      main: item.weather[0].main,
      icon: item.weather[0].icon
    }
  })
}

function organizeDataByDay (cleanData) {
  let dataByDay = { 
    day1: []
  }
  dataByDay.day1.push(cleanData[0])
  let dayCounter = 1;
  
  for (let i = 1; i < cleanData.length; i++) {
    if (!isSameDay(cleanData[i].time, cleanData[i - 1].time)) {
      dayCounter = dayCounter + 1
      let newDay = `day${dayCounter}`
      dataByDay[newDay] = []
    }
    dataByDay[`day${dayCounter}`].push(cleanData[i])
  }
  
  return dataByDay
}

function formatHighsAndLows (data) {
  for (const iteratedDay in data) {
    let day = data[iteratedDay]
    day['high'] = day[0].tempMax
    day['low'] = day[0].tempMin

    for (let i = 0; i < day.length; i ++) {
      if (day[i].tempMax > day.high) {
        day.high = day[i].tempMax
      }
      if (day[i].tempMin < day.low) {
        day.low = day[i].tempMin
      }
      delete day[i].tempMax
      delete day[i].tempMin
    }
  }
  return data
}

function formatIcon (data) {
  for (const day in data) {
    let iconFrequency = {}

    for (const item of data[day]) {
      if (!iconFrequency[item.icon]) {
        iconFrequency[item.icon] = 0
      }
  
      iconFrequency[item.icon] = iconFrequency[item.icon] + 1
      delete item.icon
    }

    let mostFrequentIcon = 0
    for (const item in iconFrequency){
      if (iconFrequency[item] > mostFrequentIcon) {
        mostFrequentIcon = item
      }
    }
    data[day]['icon'] = mostFrequentIcon
  }
  return data
}