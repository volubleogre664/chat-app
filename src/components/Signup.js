import React, { useState } from "react";
import axios from "../api/axios";
// import { Context } from "../api/store.js";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as RiIcons from "react-icons/ri"
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [state] = useContext(Context);

  const signupUser = function () {
    if (password === password2) {
      const user = {
        userName: name,
        userEmail: email,
        userPassword: password,
      };

      axios.post("/signup", user).then((data) => {
        alert("User signed up. Now Login to continue" + data[0]);
      });
    } else window.alert("Passwords do not match");
  };

  return (
    <>
        <form action="#" className="form signup">
                    <div className="field">
                        <input
                        type="text"
                        name="Username"
                        placeholder="Username"
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field">
                        <input type="text"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field">
                        <input type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field">
                        <input type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        />
                    </div>
                    <div className="signup-btn">
                        <input
                        type="submit"
                        value="Signup"
                        onClick={signupUser}
                        />
                    </div>
                    <p className="or">or</p>
                    <div className="_social-media">
                        <Link to="#/"><FaIcons.FaFacebook className="icon facebook" /></Link>
                        <Link to="#/"><AiIcons.AiFillTwitterCircle className="icon twitter" /></Link>
                        <Link to="#/"><RiIcons.RiInstagramFill className="icon instagram" /></Link>
                    </div>
                    {/* <p>{state?.user.name || "Whats this man"}</p> */}
                  </form>
    </>
  );
}

export default Signup;
