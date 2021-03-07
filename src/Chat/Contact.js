import React, { useContext } from "react";
import { Context } from "../api/store";

function Contact({ item }) {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context);

  const handleClick = (id) => {
    if (id !== state.user.currentChat.id) {
      dispatch({
        type: "currentContact/toggled",
        payload: { currentChat: { name: item.userName, id } },
      });

      dispatch({
        type: "messages/cleared",
        payload: { message: [] },
      });
    }

    window.innerWidth <= 556 &&
      document.querySelector(".chat > .chat__body").classList.toggle("opening");
  };

  return (
    <div
      onClick={() => handleClick(item._id)}
      className={`body__chatsContact ${
        state.user.currentChat.id === item._id && "active"
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

export default Contact;
