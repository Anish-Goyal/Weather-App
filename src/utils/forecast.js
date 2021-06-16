const request = require('request')

const forecast =(long,lat,callback)=>{

const url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&units=metric&appid=a3d6c40d31089c87ce691ba2d5011d06'
//using shorthand for url
request({ url, json:true},(error,response)=>{
   
   if(error){
 return callback("Weather app can't be loaded!",undefined)
}
const {body} =response
const {message,list} =body
    if(message)
      callback("Unable to find a location! Give a diffrent location.",undefined)
       else{
   //  const data = body;
    //const d = data.current.weather;
    callback(undefined,"Current temperature is: "+list[0].main.temp+" deegres and weather is "+ list[0].weather[0].description)
  }
})
}
module.exports = forecast;
