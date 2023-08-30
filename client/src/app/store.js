import {configureStore} from '@reduxjs/toolkit'
import personReducer from '../features/person/personSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer:{
        person:personReducer,
        user:userReducer
    },
    
})


export default store