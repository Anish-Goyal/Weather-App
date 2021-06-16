const path = require('path')
const hbs = require('hbs')
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const pdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../temp/views')
const PARpath = path.join(__dirname,'../temp/partials')

app.set('views',viewsPath)//views is default path it will look for
app.set('view engine', 'hbs')
hbs.registerPartials(PARpath)

//static
app.use(express.static(pdir))//used to get the html files automatically

app.get('' , (req,res)=>{
    res.render('index',{
        title: 'Weather Page',
        name: 'Weather'
    })
})

app.get('/help' , (req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'Help Page',
        helpText: 'Some Tips to use this Weather app!'
    })
})

app.get('/about' , (req,res)=>{
    res.render('about',{
        title: 'About page',
        name: 'About App',
        aboutText: 'about'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter a Address!'
        })
    }
    //using destructuring directly by default value
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        return res.send({error});

        
             forecast(longitude,latitude,(error,Fdata)=>{
                if(error)
              return res.send({error});
              res.send({Fdata,location})
             })
         })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please enter a search data!'
        })
    }
    res.send({
        product: [
            req.query.search
        ]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error404',{
        title:'404💀 ERROR',
        name:'Help article not found!😢',
        Etext:'PLease enter another link or try Reconnecting'
    })
})

app.get('*', (req,res)=>{
    res.render('error404',{
        title:'404💀 ERROR',
        name:'404: Page not found 😢',
        Etext:'PLease enter another link or try Reconnecting'
    })
} )
app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})