const request=require('request')

const forecast=(longitude,latitude,callback)=>{
 url='https://api.darksky.net/forecast/56714721f047e6f4e6a64fcacf749894/'+latitude+','+longitude+'?units=si'
 request({url,json:true},(error,{body})=>{        //using shorthand notation
     if(error){
         callback("can't able to reach the api server",undefined)
     }
     else if(body.error){
        callback("data is insufficient",undefined)
     }
     else{
         callback(undefined,"Currently temperature is "+body.currently.temperature+" degee celcius. "+
         " There is "+body.currently.precipProbability+" chances of rain. "+" Overall climate is "+
         body.currently.summary )
     }
    // else{
    //     callback(undefined,{
    //         temperature:body.currently.temperature,
    //         rain:body.currently.precipProbability,
    //         summary:body.currently.summary
    //     })
    // }
 })
}

module.exports=forecast
