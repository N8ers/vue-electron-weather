const Store = require('electron-store');
const store = new Store();

function get () {
  let city = store.get('city')
  let apiKey = store.get('apiKey')
  return { city, apiKey }
}

function set (data) {

  // data = {
  //   city: 'indianapolis',
  //   apiKey: ''
  // }

  store.set('city', data.city)
  store.set('apiKey', data.apiKey)
}

module.exports = {
  get,
  set
}
