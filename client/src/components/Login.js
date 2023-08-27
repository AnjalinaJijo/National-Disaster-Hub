import { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';

import CheckIn from './CheckIn';


const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <CheckIn />
                // <section>
                //     <h1>You are logged in!</h1>
                //     <br />
                //     <p>
                //         <a href="#">Go to Home</a>
                //     </p>
                // </section>
            ) : (
                <div className="Section">
                    <div className="logobox">
                    <h1 className="logo">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
                    </div>
                <section className="signin">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/partner">Sign Up</a>
                        </span>
                    </p>
                </section>
                </div>
            )}
        </>
    )
}


const Section=styled.section`
background: url("bg1.jpg") center center / cover
no-repeat fixed;
height:100vh;
display:flex;
justify-content: center;
align-items: center;
// position:relative;
`;

const SignIn=styled.section`
width:100%;
max-width:400px;
min-height:400px;
position:relative;
// left:120px;
padding:5rem;
background-color: rgba(0,0,0,0.5);

input{
    margin-top:0.5rem;
    margin-bottom:0.5rem;
  }
`;

export default Login
