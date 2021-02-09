import React, { useContext, useState } from "react";
import axios from "../api/axios";
import { Context } from "../api/store.js";
import { Link, Redirect } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as RiIcons from "react-icons/ri"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(Context);

  if (state?.user?.loggedIn) return <Redirect to="/chat" />;

  const loginUser = () => {
    const user = {
      email: email,
      password: password,
    };

    (async function () {
      await axios
        .post("/login", user)
        .then((data) => {
          if (data.status === 200) {
            dispatch({
              type: "user/loggedIn",
              payload: { ...data.data[0] },
            });

            //data.data[0] contains the currently authenticated user and data.data[1] has all the other users
            data.data[1].forEach((item) => {
              if (item.userEmail === data.data[0].userEmail) return;

              dispatch({
                type: "contact/added",
                payload: { contact: item },
              });
            });
          }
        })
        .catch((err) => {
          alert("Could not contact moongodb");
          console.error(err);
        });
    })();
  };

  return (
    <>
      <form action="#" className="form login">
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
                  <div className="pass-link">
                      <Link className="forgot" to="#/">Forgot Password?</Link>
                  </div>
                  <div className="pass-link">
                      <Link className="help" to="#/">help!</Link>
                  </div>
                  <div className="login-btn">
                      <input type="submit"
                      value="Login"
                      onClick={loginUser}
                      />
                  </div>
                  <p className="or">or</p>
                  <div className="_social-media">
                        <Link to="#/"><FaIcons.FaFacebook className="icon facebook" /></Link>
                        <Link to="/#"><AiIcons.AiFillTwitterCircle className="icon twitter" /></Link>
                        <Link to="#/"><RiIcons.RiInstagramFill className="icon instagram" /></Link>
                  </div>
                  <div className="signup-link" >Not a Memeber? <Link to="#/">Signup here!</Link></div>
              </form>
    </>
  );
}

export default Login;
