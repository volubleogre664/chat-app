function setUser(user, payload) {
  return {
    ...user,
    id: payload._id,
    name: payload.userName,
    email: payload.userEmail,
    loggedIn: !user.loggedIn,
  };
}

function setContacts(contacts, payload) {
  return [...contacts, payload.contact];
}

export default function Reducer(state, action) {
  switch (action?.type) {
    case "user/loggedIn": {
      return {
        ...state,
        user: setUser(state.user, action.payload),
      };
    }

    case "contact/added": {
      return {
        ...state,
        contacts: setContacts(state.contacts, action.payload),
      };
    }

    case "currentContact/toggled": {
      return {
        ...state,
        user: { ...state.user, currentChat: action.payload.currentChat },
      };
    }

    case "messages/added": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.message],
      };
    }

    case "messages/cleared": {
      return {
        ...state,
        messages: new Array(0),
      };
    }

    case "load/toggled": {
      return {
        ...state,
        isPageLoad: !state.isPageLoad,
      };
    }

    default:
      return state;
  }
}
