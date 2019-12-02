const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forcast=require('./utils/forecast.js')
const geoCode=require('./utils/geoCode.js')


const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/views')
const partialDirectoryPath=path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'I am going to tell you about weather condition',
        name:'Azad'
    })
})

app.get('/about',(req,res)=>{
   res.render("about",{
       title:'I am a title',
       first:"I am first",
       second:"I am second",
       name:'Azad'
   })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        msg:"I want to help you but I have condition for that",
        name:'Azad'
    })
})
 
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address is not provided"
        })
    }
    console.log(req.query.address)

    geoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        else{
            forcast(longitude,latitude,(error,response)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                else{
                    return res.send({
                        forecast:response,
                        location:location
                        // temperature,
                        // rain,
                        // summary,
                        // address:req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg:"Help article is not found",
        name:"Azad"
    })
 })
 app.get('*',(req,res)=>{
    res.render('404',{
        msg:"page not found",
        name:"Azad"
    })
 })


 app.listen(3000,()=>{
    console.log("server is up on port 3000")
})