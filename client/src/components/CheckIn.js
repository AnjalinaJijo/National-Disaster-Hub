
import React,{useState,useEffect} from 'react'
import axios from '../api/axios';

const LOGIN_URL = '/checkin';

const CheckIn = () => {

  const [firstName,setfirstName] = useState("")
  const [lastName,setlastName] = useState("")
  const [providedLocation,setprovidedLocation] = useState("")
  const [familyMember,setfamilyMember] = useState("")
  const [country,setCountry] = useState("")
  const [region,setRegion] = useState("")
  const [city,setCity] = useState("")
  const [lat,setlat] = useState("")
  const [long,setlong] = useState("")


  // const [errMsg, setErrMsg] = useState('');
  const[success,setSuccess] = useState(false)


  useEffect(()=>{
       //to find location info
       axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        setCountry(data.country_name)
        setRegion(data.region)
        setCity(data.city)
        setlat(data.latitude)
        setlong(data.longitude)
    })
    .catch((error) => {
        console.log(error);
    });  

  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();


        const response = axios.post(LOGIN_URL,
          JSON.stringify({ firstName,lastName,providedLocation,familyMember,country,region,city,lat,long }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      )
      .then((res)=>{
        setSuccess(true)
        console.log(res.data)
      })
      .catch((err)=>{
        console.log("error")
      })
    }
  
  
  return (
    <>
    {success ? (
      <div className='Section'>
        <div className="logobox">
        <h1 className="logo">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
        </div>
        <section className='checkedinnote'>
        <p>Thank you for checking in {firstName}.
        <br/>We are relieved to hear you are safe. Checking in will help your loved ones find that same relief.
        </p>
        <p>What your loved ones will be able to see:</p>
        <section className='data'>
          <p>First Name : {firstName}</p>
          <p>Last Name : {lastName}</p>
          <p>Provided Location : {providedLocation}</p>
          <p>Family Member : {familyMember}</p>
        </section>
        <p>Last tracked location. Keep in mind this location might not be accurate. We do our best to lock in correct location.</p>
        <section className='data'>
          <p>Country : {country}</p>
          <p>Region : {region}</p>
          <p>City : {city}</p>
          <p>Latitude : {lat}</p>
          <p>Longitude : {long}</p>
        </section>
      </section>
      </div>
    )
    :(
    <div className="Section">
      <div className="logobox">
    <h1 className="logo">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
    </div>
    <form className="signin">
      <input onChange={e=>{setfirstName(e.target.value)}} placeholder="First Name" type="text" />
      <input onChange={e=>{setlastName(e.target.value)}} placeholder="Last Name" type="text"/>
      <input onChange={e=>{setprovidedLocation(e.target.value)}} placeholder="Provided Location" type="text"/>
      <input onChange={e=>{setfamilyMember(e.target.value)}} placeholder="Family Member" type="text"/>
      {/* <button onClick={addMore}>Add more familyMemberatives</button> */}
      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>
    )
}
    </>
  )
};

export default CheckIn
