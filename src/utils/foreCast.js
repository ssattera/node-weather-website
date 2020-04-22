
  const request = require('request')

  const foreCast = (lng,lat,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=ffe88d62507abae3665c61a1283879e9&query='+lat+','+lng+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to use services')

        }
        else if(body.error){
            callback('Wrong Location Coordinates')

        }
        else{
            callback(undefined,{
                    weather_desc:body.current.weather_descriptions[0],
                    temperature:body.current.temperature,
                    feelslike:body.current.feelslike

            })

        }



    })

  }
  
module.exports= foreCast