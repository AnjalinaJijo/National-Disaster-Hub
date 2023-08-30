import React,{useState} from 'react'
import axios from '../api/axios';
import { useDispatch,useSelector} from 'react-redux';
import {
  setPersonFirstName,
  setPersonLastName,
  setPersonProvidedLocation,
  setPersonFamily,
  setPersonLocation,
  setSuccess,
  setError
} from "../features/person/personSlice"

const LOGIN_URL = '/find';

const FindPerson = () => {

  const dispatch = useDispatch();

   
  const firstName = useSelector((state) => state.person.value.firstName);
  const lastName = useSelector((state) => state.person.value.lastName);
  const providedLocation= useSelector((state) => state.person.value.providedLocation);
  const familyMember = useSelector( (state) => state.person.value.familyMember);
  const country = useSelector((state) => state.person.value.country);
  const region= useSelector((state) => state.person.value.region);
  const city= useSelector((state) => state.person.value.city);
  const loc = useSelector((state) => state.person.value.loc);
  const success= useSelector((state) => state.person.value.success);
  const error= useSelector((state) => state.person.value.error);


  // const [firstName,setfirstName] = useState("")
  // const [lastName,setlastName] = useState("")


  // const [providedLocation,setprovidedLocation] = useState("")
  // const [familyMember,setfamilyMember] = useState("")
  // const [country,setCountry] = useState("")
  // const [region,setRegion] = useState("")
  // const [city,setCity] = useState("")
  // const [lat,setlat] = useState("")
  // const [long,setlong] = useState("")


  // const[success,setSuccess] = useState(false)
  // const[error,setError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(LOGIN_URL,JSON.stringify({firstName,lastName}),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res)=>{console.log(res.data)
      const data=res.data
    // setprovidedLocation(res.data.providedLocation)
    // setfamilyMember(res.data.familyMember)
    // setCountry(res.data.country)
    // setRegion(res.data.region)
    // setCity(res.data.city)
    // setlat(res.data.lat)
    // setlong(res.data.long)
    dispatch(
      setPersonProvidedLocation({
        providedLocation:data.providedLocation
      })
    )
    dispatch(
      setPersonFamily({
        familyMember:data.familyMember
      })
    )
    dispatch(
      setPersonLocation({
      country:data.country,
      region:data.region,
      city:data.city,
      loc:data.loc,
    })
      )
      dispatch(
        setSuccess({success:true})
      )

    })
    .catch((err)=>{
      console.log(err)
      dispatch(setError({error:true}))
    })
  }

  return (
    <>
    
  {(error) && (<div className="founddetails">
      <div className='found'>
        <h1>Sorry Couldn't find Person</h1>
      </div>
      </div>)}

    {success ?
     
    (<div className="founddetails">
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
            <p>Last Tracked Location:  <p className='info'>{city}, {region}, {country}</p></p>
            </div>
            <div>
            <p>Location :  <p className='info'>{loc}</p> </p>
            </div>
            </div>
      </div>

    ):
    (<div className='Find'>
      <div className="logo-div-sub">
        <h1 className="logo-sub">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
        </div>

      <form className="checkin">
      <h1>Find</h1>
      <input onChange={e=>{dispatch(setPersonFirstName({firstName:(e.target.value).toUpperCase()}))}} placeholder="First Name" type="text" />
      <input onChange={e=>{dispatch(setPersonLastName({lastName:(e.target.value).toUpperCase()}))}} placeholder="Last Name" type="text"/>
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
