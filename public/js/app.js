const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const place=search.value
   console.log(place)
  fetch('/weather?address='+place).then((response)=>{
    response.json().then((data)=>{
      // console.log(data)
      if(data.error){
        msg1.textContent=data.error
        msg2.textContent=""
      }
      else{
        msg2.textContent=data.forecast
        msg1.textContent=data.location
      }
    })
  })
})