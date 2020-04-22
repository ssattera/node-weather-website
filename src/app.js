const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/foreCast')


const app = express()

const pathDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



app.use(express.static(pathDirectory))


app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Starky'

    })


})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Starky'

    })


})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help Me',
        name: 'Starky'

    })


})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('Idiot');

    }
  
        geocode(req.query.address, (error,{latitude, longitude, location} = {}) =>{

            if (error){ 
            
                return res.send({error});
            }
            
            forecast(longitude,latitude,(error,{weather_desc,temperature})=>{
            
                if(error){
            
                    return res.send({error});
                }
            
               
                res.send(
                    {
                        location: location,
                        forecast: weather_desc+'. It is currently '+temperature+' degrees!',
                        address: req.query.address
            
                    })
                
                
                })
            
            })


})
app.get('/help/*',(req,res)=>{
    
    res.render('404',{
        title: '404',
        name: 'Stark',
        error: 'Help Not Found!'


    })

})
app.get('*',(req,res)=>{
    
    res.render('404',{
        title: '404',
        name: 'Stark',
        error: 'Not Found!'


    })

})
app.listen(3000, () =>{

    console.log('Server is up!')

})