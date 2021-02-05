import React, { useReducer, useState } from "react";
import Chat from "./Chat/Chat";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import reducer from "./reducer";

function App() {
  const [userState, setUserState] = useState("login");
  const [state] = useReducer(reducer());

  const handleState = (input) => setUserState(input);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {state?.user.loggedIn ? <Redirect to="/chat" /> : ""}

            <button onClick={() => handleState("login")}>login</button>
            <button onClick={() => handleState("signup")}>signup</button>

            {userState === "login" ? <Login /> : <Signup />}
          </Route>

          <Route path="/chat">
            {state?.user.loggedIn ? <Redirect to="/" /> : ""}
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
