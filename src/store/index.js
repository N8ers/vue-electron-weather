import Vue from 'vue'
import Vuex from 'vuex'

import { get, set } from '../db.js';
import { formatCurrentWeather, formatForcast } from '../helpers/weatherData.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: null,
    city: null,
    currentWeather: {},
    forcast: {},
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
    setCurrentWeather (state, data) {
      state.currentWeather = data
    },
    setForcast (state, data) {
      state.forcast = data
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
      let currentWeather = formatCurrentWeather(data.list[0])
      let forcast = formatForcast(data)

      commit('setCurrentWeather', currentWeather)
      commit('setForcast', forcast)
    }
  }
})
