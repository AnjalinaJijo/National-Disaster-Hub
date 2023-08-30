import { useRef, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';

import CheckIn from './CheckIn';

import { useDispatch,useSelector } from 'react-redux';
import{
   setUser,
   setPwd,
   setSuccess,
   setErrorMsg
} from "../features/user/userSlice"

const LOGIN_URL = '/auth';

const Login = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value.user);
    const pwd = useSelector( (state) => state.user.value.pwd);

    const success= useSelector( (state) => state.user.value.success);
    const errMsg= useSelector((state) => state.user.value.errMsg);

    const { setAuth } = useContext(AuthContext);
   //to have first input being focussed automatically
    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        dispatch(setErrorMsg({errMsg:''}));
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
            dispatch(setUser({user:''}));
            dispatch(setPwd({pwd:''}));
            dispatch(setSuccess({success:true}));
        } catch (err) {
            if (!err?.response) {
                dispatch(setErrorMsg({errMsg:'No Server Response'}));
            } else if (err.response?.status === 400) {
                dispatch(setErrorMsg({errMsg:'Missing Username or Password'}));
            } else if (err.response?.status === 401) {
                dispatch(setErrorMsg({errMsg:'Unauthorized'}));
            } else {
                dispatch(setErrorMsg({errMsg:'Login Failed'}));
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <CheckIn />
            ) : (
                <div className="Section">
                    <div className="logo-div-sub">
                    <h1 className="logo-sub">N   D   H <p className='logo-txt'>National Disaster Hub</p></h1>
                    </div>
                <section className="checkin">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => dispatch(setUser({user:e.target.value}))}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => dispatch(setPwd({pwd:e.target.value}))}
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


export default Login
