import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
    initialState:{value:{user:"",validName:false,userFocus:false,pwd:"",validPwd:false,pwdFocus:false,matchPwd:"",validMatch:false,matchFocus:false,success:false,errMsg:""}},
    reducers:{
        setUser:(state,action)=>{
            state.value.user = action.payload.user;
        },
        setValidName:(state,action)=>{
            state.value.validName = action.payload.validName;
        },
        setUserFocus:(state,action)=>{
            state.value.userFocus = action.payload.userFocus;
        },
        setPwd:(state,action)=>{
            state.value.pwd = action.payload.pwd;
        },
        setValidPwd:(state,action)=>{
            state.value.validPwd = action.payload.validPwd;
        },
        setPwdFocus:(state,action)=>{
            state.value.pwdFocus = action.payload.pwdFocus;
        },
        
        setMatchPwd:(state,action)=>{
            state.value.matchPwd = action.payload.matchPwd;
        },
        setValidMatch:(state,action)=>{
            state.value.validMatch = action.payload.validMatch;
        },
        setMatchFocus:(state,action)=>{
            state.value.matchFocus = action.payload.matchFocus;
        },
        setSuccess:(state,action)=>{
            state.value.success = action.payload.success;
        },
        setErrorMsg:(state,action)=>{
            state.value.errMsg = action.payload.errMsg;
        }
    }
})

export const {setUser,setValidName,setUserFocus,setPwd,setValidPwd,setPwdFocus,setMatchPwd,setValidMatch,setMatchFocus,setSuccess,setErrorMsg} = userSlice.actions
export default userSlice.reducer