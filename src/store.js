import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    currentChat: "",
    loggedIn: false,
  },

  contacts: [],
  messages: [],
  pusher: {
    pushr: null,
    channel: null,
  },
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
