const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5pc2hnIiwiYSI6ImNrcGQ4azNibzA2aDcyd252ZjV2amx6Y2wifQ.uHQ5ngD631ZYllDnib1gpw&limit=1'

    request({ url:url, json:true},(error,response)=>{
        if(error){
          return callback('Unable to connect to services!',undefined)
        }
        const {body} = response
     if ( body.features.length === 0){
    callback('Unable to find the location!')
    }else
    {
       callback(undefined, {
           latitude: body.features[0].center[1],
           longitude:body.features[0].center[0],
           location: body.features[0].place_name
       }) 
    }
    })
}
module.exports = geocode