const Store = require('electron-store');
const store = new Store();

function get () {
  console.log('GET')
  return store.get('unicorn')
}

function set () {
  let randomNumber = Math.floor(Math.random() * 100)
  console.log('SET ', randomNumber)
  store.set('unicorn', '🦄 ' +randomNumber)
}

module.exports = {
  get,
  set
}
