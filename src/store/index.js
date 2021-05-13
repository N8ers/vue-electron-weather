import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import { get, set } from '../db.js';
import { formatCurrentWeather, formatForcast } from '../helpers/weatherData.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: null,
    city: null,
    currentWeather: {},
    forcast: {},
    fiveDayForcast: {},
    fourDayForcast: {},
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
    setWeatherAlert (state, data) {
      state.weatherAlert.type = data.type
      state.weatherAlert.message = data.message + ' - Error loading weather, check settings.'
    },
    setCurrentWeather (state, data) {
      state.currentWeather = data
    },
    setForcast (state, data) {
      state.forcast = data
    },
    setFiveDayForcast (state, data) {
      let clonedData = cloneDeep(data)
      delete clonedData.day1
      state.fiveDayForcast = clonedData
    },
    setFourDayForcast (state, data) {
      let clonedData = cloneDeep(data)
      delete clonedData.day1
      delete clonedData.day6
      state.fourDayForcast = clonedData
    },
    clearAllAlerts(state) {
      state.settingsAlert.type = null
      state.settingsAlert.message = null
      state.weatherAlert.type = null
      state.weatherAlert.message = null
    }
  },
  actions: {
    getData ({ commit }) {
      const data = get()
      if (data.apiKey && data.city) {
        commit('setData', data)
      } else {
        this.$router.push('Settings')
        // commit('setSettingsAlert', { type: 'error', message: 'Try again' })
      }
    },
    setData ({ dispatch, commit }, data) {
      commit('setSettingsAlert', { type: null, message: null })
      set(data)
      dispatch('getData')
      commit('setSettingsAlert', { type: 'success', message: 'Data updated' })
    },
    cleanWeatherData ({ commit }, data) {
      let currentWeather = formatCurrentWeather(data.list[0])
      let forcast = formatForcast(data)

      commit('setCurrentWeather', currentWeather)
      commit('setFiveDayForcast', forcast)
      commit('setFourDayForcast', forcast)
      commit('setForcast', forcast)
    }
  }
})
