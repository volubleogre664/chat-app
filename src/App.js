import React, { useContext } from "react";
import Chat from "./Chat/Chat";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import { Context } from "./api/store";

function App() {
  const [state] = useContext(Context);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {state?.user.loggedIn ? <Redirect to="/chat" /> : ""}

            <Loginpage />

            <div
              className="loader-wrapper"
              style={{ display: state.isPageLoad ? "flex" : "none" }}
            >
              <span className="loader">
                <span className="loader-inner"></span>
              </span>
            </div>
          </Route>

          <Route exact path="/chat">
            {!state?.user.loggedIn ? <Redirect to="/" /> : <Chat />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
