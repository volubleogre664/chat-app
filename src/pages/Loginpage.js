import React, { useState, useRef } from 'react';
import Nav from "../components/Nav";
import Login from '../components/Login';
import Signup from '../components/Signup';
import "./Loginpage.css";

function Loginpage() {
    const [state, setstate] = useState("login")

    const handleState = input => setstate(input)

    return (
        <>
            <Nav />
            <div className='body'>
                <div className="wrapper">
                    <div className="form-container" style={{paddingBottom: state === "signup" ? "20px" : "30px" }} >
                        <div className="slide-controls">
                            <button onClick={()=>handleState("login")} className="slide login">Login</button>
                            <button onClick={()=>handleState("signup")} className="slide signup">Signup</button>
                        </div>
                        {state === "login" ?  <Login /> : <Signup />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginpage
