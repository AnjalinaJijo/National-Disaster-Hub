import {useState} from 'react';
import axios from '../api/axios';

const Weather = () => {
    const [place,setPlace] = useState("");

    const[main,setMain] = useState("");
    const[maxtemp,setMaxTemp] = useState("");
    const[mintemp,setMinTemp] = useState("");
    const[high,setHigh] = useState("");
    const[pressure,setPressure] = useState("");
    const[windSpeed,setWindSpeed] = useState("");
    const[windDeg,setWindDeg] = useState("");
    const[humidity,setHumidity] = useState("");
    const[icon,setIcon] = useState("");
    const[sunrise,setSunrise] = useState("");
    const[sunset,setSunset] = useState("");
    const[description,setdescription] = useState("");
    const[date,setDate] = useState("");
    

    const[success,setSuccess] = useState(false)

    const handleSubmit =(event)=>{
      event.preventDefault();

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=`)
      .then(response =>{

        setDate(new Date(response.data.dt *1000))

        setMain(response.data['weather'][0]['main'])
        setIcon(`http://openweathermap.org/img/wn/${response.data['weather'][0]['icon']}@2x.png`)
        setdescription(response.data['weather'][0]['description'])
        setMinTemp(response.data['main']['temp_max'])
        setMaxTemp(response.data['main']['temp_min'])
        setHigh(response.data['main']['feels_like'])
        setPressure(response.data['main']['pressure'])
        setWindSpeed(response.data['wind']['speed'])
        setHumidity(response.data['main']['humidity'])
        setWindDeg(response.data['wind']['deg'])
        setSunrise(new Date(response.data['sys']['sunrise'] *1000).toTimeString())
        setSunset(new Date(response.data['sys']['sunset'] *1000).toTimeString())
     
        setSuccess(true)
        
      })
      .catch((err)=>{
        console.log(err)
      })
    }

  return (
    <>
  {success ?(
    <div className="weather">
      <div className="weather-box">
      <p>{date.toDateString()}</p>
      <h1 className="card-title"><p>{main}</p></h1>
      
      <img src={icon} className="card-img-top" alt={description}/>
      <h3 className="card-text">High Feels like {high}&deg;C</h3>
      
      <p className="card-text">High {maxtemp}&deg;C Low {mintemp}&deg;C</p>
      <p className="card-text">Sunrise {sunrise}</p>
      <p className="card-text">Sunset {sunset}</p>

      <div className='bottom'>
        <div>
        <p className="card-text">{pressure}mb</p>
        <p>Pressure </p>
        </div>
      <div>
        <p className="card-text">{humidity}%</p>
        <p>Humidity </p>
      </div>
      
      <div>
      <p className="card-text">{windSpeed}m/s,{windDeg}&deg;</p>
      <p>Wind </p>
      </div>
     
      </div>
      </div>
    </div>
  ):
    (
    <div className='weather-city'>
      <div className="logobox">
        <h1 className="logo">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
        </div>
    <form className="signin">
      <input onChange={(e)=>{setPlace(e.target.value)}} placeholder="Enter city" type="text" />
      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>)
}
    </>
  )
}

export default Weather
{/* <p className="card-text">High Feels like ${day.feels_like.day}&deg;C</p> */}
                  {/* <p className="card-text">UV Index ${day.uvi}</p> */}
                  {/* <p className="card-text">Precipitation ${day.pop * 100}%</p> */}
                  {/* <p className="card-text">Dewpoint ${day.dew_point}</p> */}
