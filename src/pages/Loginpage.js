import React, { useState } from "react";
import Nav from "../components/Nav";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./Loginpage.css";

function Loginpage() {
  const [state, setstate] = useState("login");
  // const [heightState, heightSetstate] = useState("448px")

  const handleState = (input) => setstate(input);

  // const handleHeight = () => {
  //     if(heightState > heightSetstate) {
  //         heightSetstate()
  //     }
  // }

  //   const styles = {
  //     maxHeight: "",
  //   };

  //   const max = "448px";

  return (
    <>
      <Nav />
      <div className="body">
        <div className="wrapper">
          <div
            className="form-container"
            // style={(styles.maxHeight > max) & { paddingBottom: 20 + "px" }}
          >
            <div className="slide-controls">
              <button
                onClick={() => handleState("login")}
                className="slide login"
              >
                Login
              </button>
              <button
                onClick={() => handleState("signup")}
                className="slide signup"
              >
                Signup
              </button>
            </div>
            {state === "login" ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
