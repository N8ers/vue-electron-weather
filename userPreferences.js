const fs = require('fs')

function setUserPreferences (data) {
  try {
    fs.writeFileSync('userPreferences.json', JSON.stringify(data), 'utf-8')
  } catch (error) {
    console.log('FAILED TO SYNC: ', error)
    alert('ALERT FAILED TO SYNC: ', error)
  }
}

function getUserPreferences () {
  try {
    let data = fs.readFile('userPreferences.json')
    console.log('data ', data)
    return data
  } catch (error) {
    console.log('FAILED TO SYNC: ', error)
    alert('ALERT FAILED TO SYNC: ', error)
  }
}

module.exports = {
  setUserPreferences,
  getUserPreferences
}