console.log("Main page!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(location)
       
       msg1.innerHTML ='<bold>Loading..</bold> <button id="load"></button>'
  
    msg2.textContent = "";
    
        fetch('/weather?address='+location).then((responce)=>{
    responce.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        return msg1.textContent= data.error;    }
    msg1.textContent= "You are currently in: "+data.location;
        msg2.innerHTML= "<p>"+data.Fdata+"</p>";
    }) 
    })
    
    

    console.log('testing');
})