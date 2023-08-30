import {createSlice} from '@reduxjs/toolkit'

const personSlice = createSlice({
    name:"person",
    initialState:{ value:{ firstName:"",lastName:"", providedLocation:"",familyMember:"",country:"",region:"",city:"", loc:"",success:false,error:false}},
    reducers:{
    setPersonFirstName :(state,action) =>{
      //payload is another term for data inside the action that called the reducer
      state.value.firstName = action.payload.firstName;
    },
    setPersonLastName :(state,action)=>{
      state.value.lastName = action.payload.lastName;
    },
    setPersonFamily:(state,action)=>{
      
      state.value.familyMember = action.payload.familyMember;
    },
    setPersonProvidedLocation:(state,action)=>{
      state.value.providedLocation = action.payload.providedLocation;
    },
    setPersonLocation:(state,action)=>{
      state.value.country = action.payload.country;
      state.value.region = action.payload.region;
      state.value.city = action.payload.city;
      state.value.loc = action.payload.loc;
    },
    setSuccess:(state,action)=>{
      state.value.success = action.payload.success;
    },
    setError:(state,action)=>{
      state.value.error = action.payload.error;
    }

      
    },
    
})

export const { setPersonFirstName,setPersonLastName,setPersonFamily,setPersonProvidedLocation,setPersonLocation,setSuccess,setError} = personSlice.actions

//for UseSelector
// export const selectFirstName  = (state) => state.user.firstName;
// export const selectLastName = (state) => state.user.lastName;
// export const selectProvidedLocation = (state) => state.user.providedLocation;
// export const selectFamilyMember = (state) => state.user.familyMember;
// export const selectCountry = (state) => state.user.country;
// export const selectRegion = (state) => state.user.region;
// export const selectCity = (state) => state.user.city;
// export const selectLat = (state) => state.user.lat;
// export const selectLong = (state) => state.user.long;
// export const selectSuccess = (state) => state.user.success;

//for store
export default personSlice.reducer