import React, { useReducer } from "react";
import Chat from "./Chat/Chat";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import reducer from "./api/reducer";

function App() {
  const [state] = useReducer(reducer());

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {state?.user.loggedIn ? <Redirect to="/chat" /> : ""}

            <Loginpage />
          </Route>

          <Route path="/chat">
            {state?.user.loggedIn ? <Redirect to="/" /> : <Chat />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
