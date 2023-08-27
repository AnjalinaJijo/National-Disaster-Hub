import React from 'react';
import styled from 'styled-components';
import {useRef,useState,useEffect} from 'react';
import {faCheck,faTimes,faInfoCircle}from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from '../api/axios';

//to validate username and password
const USER_REGEX=/^[A-z][A-z0-9-_]{3,23}$/;//total 4 to 24 chars
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;//8 to 24 chars
const REGISTER_URL = '/partner';//end point for our backend

const Partner = () => {

     const userRef = useRef();
     const errRef =useRef();

     const [user,setUser]=useState('');
     const[validName,setValidName]=useState(false);
     const[userFocus,setUserFocus]=useState(false);

     const [pwd,setPwd]=useState('');
     const[validPwd,setValidPwd]=useState(false);
     const[pwdFocus,setPwdFocus]=useState(false);

     const [matchPwd,setMatchPwd]=useState('');
     const[validMatch,setValidMatch]=useState(false);
     const[matchFocus,setMatchFocus]=useState(false);

     const[errMsg,setErrMsg]=useState('');
     const[success,setSuccess]=useState(false);

     useEffect(()=>{
        userRef.current.focus();
     },[]);

     useEffect(()=>{
        const result=USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
     },[user])

     useEffect(()=>{
        const result=PWD_REGEX.test(pwd);
        console.log(pwd);
        console.log(result);
        setValidPwd(result);
        const match=(pwd===matchPwd);
        setValidMatch(match);
     },[pwd,matchPwd])

     //when user is editing remove the error message
     useEffect(()=>{
        setErrMsg('');
     },[user,pwd,matchPwd])


   const handleSubmit = async(event)=>{
      event.preventDefault();
      //incase button enabled with JS hack
      const v1=USER_REGEX.test(user);
      const v2=PWD_REGEX.test(pwd);
      if(!v1||!v2){
         setErrMsg("Invalid Entry");
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
         setSuccess(true);
         //clear state and controlled inputs
         //need value attrib on inputs for this
         setUser('');
         setPwd('');
         setMatchPwd('');
      }
      catch(err){
         if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
      }
   }

  return (
   <>
   {success ? (<Success>
      <Successbox>
      <h1 style={{"color":"white","fontSize":"50px"}}>Success!</h1>
      <Para><a href="/Login">Sign In</a></Para>
      </Successbox>
   </Success>
   ):(<Section>
      {/* display error msg at top of field if it exist */}
      <section className="signBox">
      <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
      <Heading>Register</Heading>
      <form onSubmit={handleSubmit} className="Form" autoComplete='off'>
          <label htmlFor="username">UserName:
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
          </label>
          <input type="text"
                id="username"
                ref={userRef}
                // autoComplete="off"
                autocomplete="new-password"
                onChange={(event)=>setUser(event.target.value)}
                value={user}
                required
                aria-invalid={validName?"false":"true"}
                aria-describedby="uidnote"
                onFocus={()=>setUserFocus(true)}
                onBlur={()=>setUserFocus(false)}
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
                    onChange={(e)=>setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false":"true"}
                    aria-describedby="pwdnote"
                    onFocus={()=> setPwdFocus(true)}
                    onBlur={()=> setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus &&!validPwd? "instructions":"offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                          </p>
                          <label htmlFor="confirm_pwd">
                          Confirm Password:
                          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                          </label>

                          <input type="password"
                                 id="confirm_pwd"
                                 onChange={(e) => setMatchPwd(e.target.value)}
                                 value={matchPwd}
                                 required
                                 aria-invalid={validMatch ? "false" : "true"}
                                 aria-describedby="confirmnote"
                                 onFocus={() => setMatchFocus(true)}
                          />
                           <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Must match the first password input field.
                      </p>
                      <button disabled={!validName || !validPwd || !validMatch ? true:false}>
                         Sign Up
                      </button>
      </form>
      <Para> Already Registered? <br/>
          <span className="line">
             <a href="/Login">Sign In</a>
          </span></Para>
      </section>
      {/* <section>
         <h1>What does it mean to become an NDH Partner?</h1>
      </section> */}
  </Section>)}
    </>
  )
}

const Section=styled.section`
background: url("/images/bg1.jpg") center center / cover
no-repeat fixed;
height:100vh;
display:flex;
justify-content: center;
align-items: center;
position:relative;

`;
const Heading=styled.h1`
font-size:60px;
font-weight:bold;
color:white;
`;

const Para=styled.p`
font-size:20px;
color:white;
`;

const Success=styled.section`
background: url("/images/bg1.jpg") center center / cover
no-repeat fixed;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
`;
const Successbox=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
position:absolute;
background-color: rgba(0,0,0,0.5);
padding:5rem;
`;

export default Partner
