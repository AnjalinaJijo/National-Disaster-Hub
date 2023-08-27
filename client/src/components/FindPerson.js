import React,{useState} from 'react'
import axios from '../api/axios';

const LOGIN_URL = '/find';

const FindPerson = () => {
  const [firstName,setfirstName] = useState("")
  const [lastName,setlastName] = useState("")


  const [providedLocation,setprovidedLocation] = useState("")
  const [familyMember,setfamilyMember] = useState("")
  const [country,setCountry] = useState("")
  const [region,setRegion] = useState("")
  const [city,setCity] = useState("")
  const [lat,setlat] = useState("")
  const [long,setlong] = useState("")
  // const [providedLocation,setprovidedLocation] = useState("")

  const[success,setSuccess] = useState(false)
  // const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(LOGIN_URL,JSON.stringify({firstName,lastName}),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res)=>{console.log(res.data)
    setprovidedLocation(res.data.providedLocation)
    setfamilyMember(res.data.familyMember)
    setCountry(res.data.country)
    setRegion(res.data.region)
    setCity(res.data.city)
    setlat(res.data.lat)
    setlong(res.data.long)

    setSuccess(true)

    })
    .catch((err)=>{
      console.log("error")
    })
  }

  return (
    <>
    {success ?(
      <div className="founddetails">
        <div className='found'>
          <h1>We are happy to inform you that {firstName} is safe</h1>
            <div>
            <p>First Name : <p className='info'>{firstName}</p></p>
            </div>
            <div>
            <p>Last Name :  <p className='info'>{lastName}</p></p>
            </div>
            <div>
            <p>Home Town :  <p className='info'>{providedLocation}</p></p>
            </div>
            <div>
            <p>Family Member :  <p className='info'>{familyMember}</p></p>
            </div>
            <div>
            <p>Last Tracked Location:  <p className='info'>{city} {region} {country}</p></p>
            </div>
            <div>
            <p>Latitude :  <p className='info'>{lat}</p> , Longitude :  <p className='info'>{long} </p></p>
            </div>
            </div>
      </div>

    ):
    (<div className='findlogin'>
      <div className="logobox">
        <h1 className="logo">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
        </div>

      <form className="signin">
      <input onChange={e=>{setfirstName(e.target.value)}} placeholder="First Name" type="text" />
      <input onChange={e=>{setlastName(e.target.value)}} placeholder="Last Name" type="text"/>
      {/* <input onChange={e=>{setprovidedLocation(e.target.value)}} placeholder="ProvidedprovidedLocationation" type="text"/> */}
      {/* <input onChange={e=>{setfamilyMember(e.target.value)}} placeholder="FamilyMfamilyMemberative" type="text"/> */}
      {/* <button onClick={addMore}>Add more familyMemberatives</button> */}
      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>)
}
    </>
  )
}

export default FindPerson
