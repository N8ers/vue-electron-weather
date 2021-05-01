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
      let cleanData = data.list.map((d) => {
        return {
          time: new Date(d.dt * 1000),
          temp: d.main.temp,
          tempMax: d.main.temp_max,
          tempMin: d.main.temp_min,
          main: d.weather[0].main,
          icon: d.weather[0].icon
        }
      })

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
      console.log('dataByDay ', dataByDay)
      commit('setWeather', cleanData)
    }
  }
})
