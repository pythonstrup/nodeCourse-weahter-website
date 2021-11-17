const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=f9160b44fe2513d49f429b086cbd2a52&query="+ latitude + "," + longitude + "&units=m"

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error){
            callback("Unable to find location", undefined)
        } else {
            

            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + 
            " degrees out." + " It's feelslike " + body.current.feelslike + ", and humidity is " + body.current.humidity +
             ". There is a " + body.current.precip + "% chance of rain." )

            // callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + 
            // " degrees out. There is a " + response.body.current.precip + "% chance of rain." )
        }
    })
}

module.exports = forecast