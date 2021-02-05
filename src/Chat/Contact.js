import React, { useContext } from "react";
import { Context } from "../store.js";

function Contact({ item }) {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context);

  const handleClick = (id) => {
    dispatch({
      type: "currentContact/toggled",
      payload: { currentChat: "" },
    });

    dispatch({
      type: "currentContact/toggled",
      payload: { currentChat: id },
    });
  };

  return (
    <div onClick={() => handleClick(item._id)} className="body__chatsContact">
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
