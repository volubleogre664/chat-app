import React, { useContext, useState } from "react";
import axios from "./axios";
import { Context } from "./store.js";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [state] = useContext(Context);

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
    <div className="signup">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
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
      <input
        type="text"
        placeholder="confirm password"
        onChange={(e) => setPassword2(e.target.value)}
      />{" "}
      <br />
      <button onClick={signupUser}>Sign up</button>
      <p>{state?.user.name || "Whats this man"}</p>
    </div>
  );
}

export default Signup;
