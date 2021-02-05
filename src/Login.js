import React, { useContext, useState } from "react";
import axios from "axios";
import baseURL from "./axios";
import { Context } from "./store.js";
import { Redirect } from "react-router-dom";

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
        .post(baseURL + "/login", user)
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
    <div className="login">
      <>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button onClick={loginUser}>login</button>
      </>
    </div>
  );
}

export default Login;
