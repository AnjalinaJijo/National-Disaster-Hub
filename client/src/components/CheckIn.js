
import React,{useEffect} from 'react'
import axios from '../api/axios';
import { useDispatch,useSelector} from 'react-redux';
import {
  setPersonFirstName,
  setPersonLastName,
  setPersonProvidedLocation,
  setPersonFamily,
  setPersonLocation,
  setSuccess
} from "../features/person/personSlice"

const LOGIN_URL = '/checkin';

const CheckIn = () => {

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


  useEffect(()=>{
       //to find location info
       axios.get(LOGIN_URL).then((response) => {
        let data = response.data;
        dispatch(
        setPersonLocation({
        country:data.country,
        region:data.region,
        city:data.city,
        loc:data.loc
      })
        )

    })
    .catch((error) => {
        console.log(error);
    });  

  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();

        const response = axios.post(LOGIN_URL,
          JSON.stringify({firstName,lastName,providedLocation,familyMember,country,region,city,loc}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      )
      .then((res)=>{
        console.log(res.data)
        dispatch(setSuccess({success:true}))
      })
      .catch((err)=>{
        console.log("error")
      })
    }
  
  
  return (
    <>
    {success ? (
      <div className='Section'>
        <div className="logo-div-sub">
        <div className="logo-sub">N   D   H <p className='logo-txt'>National Disaster Hub</p></div>
        </div>
        <section className='checkin-success'>
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
          <p>Location : {loc}</p>
        </section>
      </section>
      </div>
    )
    :(
    <div className="Section">
    <div className="logo-div-sub">
    <div className='logo-sub'>N   D   H <p className='logo-txt'>National Disaster Hub</p></div>
    </div>
    <form className="checkin">
      <h3>Check in for your dear ones to find you are safe</h3>
      <input onChange={e=>dispatch(setPersonFirstName({firstName:(e.target.value).toUpperCase()}))} placeholder="First Name" type="text" />
      <input onChange={e=>dispatch(setPersonLastName({lastName:(e.target.value).toUpperCase()}))} placeholder="Last Name" type="text"/>
      <input onChange={e=>dispatch(setPersonProvidedLocation({providedLocation:(e.target.value).toUpperCase()}))} placeholder="Provided Location" type="text"/>
      <input onChange={e=>dispatch(setPersonFamily({familyMember:(e.target.value).toUpperCase()}))} placeholder="Family Member" type="text"/>
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
