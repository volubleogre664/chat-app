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
        contacts: [...state.contacts],
        messages: [...state.messages],
      };
    }

    case "contact/added": {
      return {
        ...state,
        user: { ...state.user },
        contacts: setContacts(state.contacts, action.payload),
        messages: [...state.messages],
      };
    }

    case "currentContact/toggled": {
      console.log(action.payload.currentChat);
      return {
        ...state,
        user: { ...state.user, currentChat: action.payload.currentChat },
        contacts: [...state.contacts],
        messages: [...state.messages],
      };
    }

    case "messages/added": {
      return {
        ...state,
        user: { ...state.user },
        contacts: [...state.contacts],
        messages: [...state.messages, ...action.payload.message],
      };
    }

    case "messages/cleared": {
      return {
        ...state,
        user: { ...state.user },
        contacts: [...state.contacts],
        messages: [],
      };
    }

    default:
      return state;
  }
}
