const axios = require('axios')

const getWeather = async(req,res)=>{
    const {place}= req.body
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.openweatherapi}`)
    .then(response =>{
        console.log(response.data)
        res.json(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = {getWeather}