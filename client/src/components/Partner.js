import React from 'react';
import styled from 'styled-components';
import {useRef,useEffect} from 'react';
import {faCheck,faTimes,faInfoCircle}from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from '../api/axios';

import { useDispatch,useSelector } from 'react-redux';
import{
   setUser,
   setValidName,
   setUserFocus,
   setPwd,
   setValidPwd,
   setPwdFocus,
   setMatchPwd,
   setValidMatch,
   setMatchFocus,
   setSuccess,
   setErrorMsg
} from "../features/user/userSlice"

//to validate username and password
const USER_REGEX=/^[A-z][A-z0-9-_]{3,23}$/;//total 4 to 24 chars
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;//8 to 24 chars
const REGISTER_URL = '/partner';//end point for our backend

const Partner = () => {

     const userRef = useRef();
     const errRef =useRef();

   const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value.user);
  const validName = useSelector((state) => state.user.value.validName);
  const userFocus= useSelector((state) => state.user.value.userFocus);

  const pwd = useSelector( (state) => state.user.value.pwd);
  const validPwd = useSelector((state) => state.user.value.validPwd);
  const pwdFocus= useSelector((state) => state.user.value.pwdFocus);

  const matchPwd= useSelector((state) => state.user.value.matchPwd);
  const validMatch= useSelector((state) => state.user.value.validMatch);
  const matchFocus = useSelector((state) => state.user.value.matchFocus);

  const success= useSelector( (state) => state.user.value.success);

  const errMsg= useSelector((state) => state.user.value.errMsg);

     useEffect(()=>{
        userRef.current.focus();
     },[]);

     useEffect(()=>{
        const result=USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        dispatch(setValidName({validName:result}));
     },[user])

     useEffect(()=>{
        const result=PWD_REGEX.test(pwd);
        console.log(pwd);
        console.log(result);
        dispatch(setValidPwd({validPwd:result}));
        console.log(validPwd)
        const match=(pwd===matchPwd);
        dispatch(setValidMatch({validMatch:match}));
     },[pwd,matchPwd])

     //when user is editing remove the error message
     useEffect(()=>{
      dispatch(setErrorMsg({errMsg:""}));
     },[user,pwd,pwdFocus])


   const handleSubmit = async(event)=>{
      event.preventDefault();
      //incase button enabled with JS hack
      const v1=USER_REGEX.test(user);
      const v2=PWD_REGEX.test(pwd);
      if(!v1||!v2){
         dispatch(setErrorMsg({errMsg:"Invalid Entry"}));
         return;
      }
     
      try{
         const response = await axios.post(REGISTER_URL,JSON.stringify({user,pwd}),
         {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
         }
         );
         console.log(response?.data);
         console.log(response?.accessToken);
         console.log(JSON.stringify(response))
         dispatch(setSuccess({success:true}));
         //clear state and controlled inputs
         //need value attrib on inputs for this
         dispatch(setUser({user:''}));
         dispatch(setPwd({pwd:''}));
         dispatch(setMatchPwd({matchPwd:''}));
      }
      catch(err){
         if (!err?.response) {
            dispatch(setErrorMsg({errMsg:"No Server Response"}));
        } else if (err.response?.status === 409) {
         dispatch(setErrorMsg({errMsg:"User name taken"}));
        } else {
         dispatch(setErrorMsg({errMsg:"Registration Failed"}))
        }
        errRef.current.focus();
      }
   }

  return (
   <>
   {success ? (<div className='Success'>
      <div className='Successbox'>
      <h1 style={{"color":"white","fontSize":"50px"}}>Success!</h1>
      <p className='Para'><a href="/Login">Sign In</a></p>
      </div>
   </div>
   ):(<section className="signin-box">
      {/* display error msg at top of field if it exist */}
      <section className="signBox">
      <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 className='Heading'>Register</h1>
      <form onSubmit={handleSubmit} className="Form" autoComplete='off'>
          <label htmlFor="username">UserName:
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
          </label>
          <input type="text"
                id="username"
                ref={userRef}
                // autoComplete="off"
                autoComplete="new-password"
                onChange={(e)=>dispatch(setUser({user:e.target.value}))}
                value={user}
                required
                aria-invalid={validName?"false":"true"}
                aria-describedby="uidnote"
                onFocus={()=>dispatch(setUserFocus({userFocus:true}))}
                onBlur={()=>dispatch(setUserFocus({userFocus:false}))}
                />

             <p id="uidnote" className={userFocus && user && !validName? "instructions":"offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
             </p> 

             <label htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
             </label>  
             <input type="password"
                    id="password"
                    onChange={(e)=>dispatch(setPwd({pwd:e.target.value}))}
                    value={pwd}
                    required
                    autoComplete="new-password"
                    aria-invalid={validPwd ? "false":"true"}
                    aria-describedby="pwdnote"
                    onFocus={()=> dispatch(setPwdFocus({pwdFocus:true}))}
                    onBlur={()=> dispatch(setPwdFocus({pwdFocus:false}))}
            />
            <p id="pwdnote" className={pwdFocus &&!validPwd? "instructions":"offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                          </p>
                          <label htmlFor="confirm_pwd">
                          Confirm Password:
                          <FontAwesomeIcon icon={faCheck} className={validMatch && pwdFocus ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validMatch || !pwdFocus ? "hide" : "invalid"} />
                          </label>

                          <input type="password"
                                 id="confirm_pwd"
                                 onChange={(e) => dispatch(setMatchPwd({matchPwd:e.target.value}))}
                                 value={matchPwd}
                                 required
                                 autoComplete="new-password"
                                 aria-invalid={validMatch ? "false" : "true"}
                                 aria-describedby="confirmnote"
                                 onFocus={() => dispatch(setMatchFocus({matchFocus:true}))}
                          />
                           <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Must match the first password input field.
                      </p>
                      <button disabled={!validName || !validPwd || !validMatch ? true:false}>
                         Sign Up
                      </button>
      </form>
      <p className='Para'> Already Registered? <br/>
          <span className="line">
             <a href="/Login">Sign In</a>
          </span></p>
      </section>
      {/* <section>
         <h1>What does it mean to become an NDH Partner?</h1>
      </section> */}
  </section>)}
    </>
  )
}








export default Partner
