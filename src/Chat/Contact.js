import React, { useContext } from "react";
import { Context } from "../api/store";

function Contact({ item }) {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context);

  const handleClick = (id) => {
    if (id !== state.user.currentChat) {
      dispatch({
        type: "currentContact/toggled",
        payload: { currentChat: id },
      });

      dispatch({
        type: "messages/cleared",
        payload: { message: [] },
      });
    }

    if (window.innerWidth <= 556) toggleChats(id, state);
  };

  return (
    <div
      onClick={() => handleClick(item._id)}
      className={`body__chatsContact ${
        state.user.currentChat === item._id && "active"
      }`}
    >
      <div className="contact__imgContainer">
        <i className="fas fa-user"></i>
      </div>

      <div className="contact__userInfo">
        <div className="contact__userInfoHead">
          <h3 className="contact__userInfoName">{item.userName}</h3>
          <small className="contact__userInfoMsg">
            <sup>3</sup>
          </small>
        </div>

        <p className="contact__userInfoText">Placeholder message.</p>
      </div>
    </div>
  );
}

function toggleChats(id, state) {
  const chatsBody = document.querySelector(".chat > .chat__body");

  if (chatsBody.classList.contains("opening") && id === state.user.currentChat)
    return;
  else {
    if (chatsBody.classList.contains("closing"))
      chatsBody.classList.toggle("closing");

    chatsBody.classList.toggle("opening");
  }
}

export default Contact;
