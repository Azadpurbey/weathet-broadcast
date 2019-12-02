const request=require('request')

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoiYXphZHB1cmJleSIsImEiOiJjazNrMHNpbDkwb3g4M2VudTBleHQ4YjhwIn0.qyod_l3Xd762p5K57s0ceQ'
    request({url:url,json:true},(error,{body})=>{
       if(error){
        callback("don't able to reach the api server",undefined)
       } 
       else if(body.features.length===0){
        callback("Address is not correct, try another location",undefined) 
       }
       else{
          callback(undefined,{
            longitude :body.features[0].center[0],
            latitude :body.features[0].center[1],
            location :body.features[0].place_name,
          }) 
       }
       
    })
}

module.exports=geoCode