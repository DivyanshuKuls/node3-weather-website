const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=218d0c3fd6b8c3044cff7ad39230957a&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to Weatherstack services')
        } else if (body.error) {
            callback('API request failed. Please check query parameter or check again')
        } else if (!body.location.name) {
              callback('No data for the location')
        } else {
            callback(undefined,
                // temperatue: response.body.current.temperature,
                // feelslike: response.body.current.feelslike
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It is feeling like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.'
            )
            
        }
    })
}
module.exports = forecast

// const forecast = (latitude, longitude, callback) => {
//     console.log(latitude, longitude)
// }
// module.exports = forecast