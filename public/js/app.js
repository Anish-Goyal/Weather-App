console.log("Main page!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const msg3 = document.querySelector('#msg3');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(location)
       
       msg1.innerHTML ='<bold>Loading..</bold> <button id="load"></button>'
    msg2.textContent = "";
    msg3.textContent = "";
    
        fetch('/weather?address='+location).then((responce)=>{
    responce.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        return msg1.textContent= data.error;    }
        msg1.textContent = data.Fdata.date+data.Fdata.month+" "+data.Fdata.day;
        msg2.textContent= data.location;
        msg3.innerHTML= "<p>Current Temperature:"+data.Fdata.temp+"Degrees &nbsp Humidity: "+data.Fdata.humidity+"%<br>Weather: "+data.Fdata.wdiscription+" &nbsp&nbsp Wind-speed:"+data.Fdata.windsp+"m/s</p>";
    }) 
    })
    
    

    console.log('testing');
})