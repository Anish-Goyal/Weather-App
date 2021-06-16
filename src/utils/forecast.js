const request = require('request')

const forecast =(long,lat,callback)=>{

const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&units=metric&appid=a3d6c40d31089c87ce691ba2d5011d06'
//using shorthand for url
request({ url, json:true},(error,response)=>{
   
   if(error){
 return callback("Weather app can't be loaded!",undefined)
}
const {body} =response
const {message,weather,main,wind} =body;

let unix_timestamp = body.dt;
var date = new Date(unix_timestamp*1000);
var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var day = days[date.getDay()];
  var month = months[date.getMonth()];
var hours = date.getHours();
var minutes = "0" + date.getMinutes();

var date = date.getDate();

var formattedTime = hours + ':' + minutes.substr(-2);

    if(message)
      callback("Unable to find a location! Give a diffrent location.",undefined)
       else{
    callback(undefined,{
      temp: main.temp,
      wdiscription: weather[0].description,
      humidity: main.humidity,
      windsp: wind.speed,
      date,
      day,
      month,
      formattedTime
    })
  }
})
}
module.exports = forecast;
