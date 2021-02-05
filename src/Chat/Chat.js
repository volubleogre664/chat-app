import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store.js";
import "./Chat.css";
import Contact from "./Contact.js";
import axios from "axios";
import baseURL from "../axios";

function Chat() {
  const [state, dispatch] = useContext(Context);
  const [text, setText] = useState("");
  const [textState, setTextState] = useState(false);
  const [lastMessage, setLastMessage] = useState(false);

  useEffect(() => {
    if (lastMessage) {
      (async function () {
        await axios
          .post(baseURL + "/message/new", lastMessage)
          .then((data) => {
            if (data.status === 201) {
              dispatch({
                type: "messages/added",
                payload: { message: [data.data] },
              });
              console.log(typeof data.data);
              setLastMessage(false);
            }
          })
          .catch(() => {
            alert(
              "Could not send message... Please check internet and try again"
            );
          });
      })();
    }
  }, [lastMessage, dispatch, setLastMessage]);

  useEffect(() => {
    (async function () {
      if (state.user.currentChat === "") return;

      await axios
        .get(baseURL + "/message/sync", {
          params: { from: state.user.id, to: state.user.currentChat },
        })
        .then((data) => {
          if (data.status === 200) {
            dispatch({
              type: "messages/cleared",
              payload: { message: [] },
            });

            dispatch({
              type: "messages/added",
              payload: { message: data.data },
            });
          }
        })
        .catch((err) => {
          alert("Error getting messages from mongodb");
          console.error(err);
        });
    })();
  }, [state.user.id, state.user.currentChat, dispatch]);

  const handleInputChange = (e) => setText(e.target.value);

  const handleCheckChange = () => setTextState(!textState);

  //Getting messages from database
  // ()();

  const handleSendClick = (e) => {
    e.preventDefault();

    if (state.user.currentChat === "") {
      alert("Please select who you chatting with on tthe left.");
      return;
    }

    const regex = / /gi;
    const str = text.replace(regex, "");
    if (text === "" || str === "") return;

    const d = new Date();

    setLastMessage({
      to: state.user.currentChat,
      from: state.user.id,
      time: `${formatTime(d.getHours())}:${formatTime(d.getMinutes())}`,
      message: text,
    });

    console.log(lastMessage);
    console.log(state.user.currentChat);

    setText("");
    document.querySelector(".footerInput").value = "";
  };

  const formatTime = (val) => (val >= 10 ? val : `0${val}`);

  if (!state.user.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <header className="chat__sidebarHeader">
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          <span>Chat | {state?.user?.name}</span>
          <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
        </header>

        <main className="chat__sidebarBody">
          <div className="body__search">
            <input
              type="text"
              placeholder="Search chats"
              className="body__searchInput"
            />
          </div>

          <div className="body__chats">
            {state.contacts.map((item, i) => {
              return <Contact item={item} key={i} />;
            })}
          </div>
        </main>
      </aside>

      <section className="chat__body">
        <header className="chat__bodyHeader">
          <div className="chat__bodyHeaderImgContainer">
            <i className="fas fa-user"></i>
          </div>

          <div className="chat__bodyHeaderUserInfo">
            <h3 className="user__name">Demo Name</h3>
            <span className="user__status">Last seen: 15:43</span>
          </div>

          <input
            type="checkbox"
            id="sim"
            onChange={(e) => handleCheckChange(e)}
          />

          <div className="chat__bodyHeaderIcons">
            <span className="iconContainer">
              <i className="fas fa-paperclip" aria-hidden="true"></i>
            </span>

            <span className="iconContainer">
              <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </span>
          </div>
        </header>

        <main className="chat__bodyMain">
          {state.messages.map((item, i) => {
            return (
              <div
                className={
                  item.from === state.user.id
                    ? "sent chat__bodyMainMsg"
                    : "chat__bodyMainMsg"
                }
                key={i}
              >
                <div className="chat__bodyMainMsgLeft">
                  <div className="msg__imgContainer">
                    <i className="fas fa-user"></i>
                  </div>

                  <div className="msg__textContainer">{item.message}</div>
                </div>

                <span className="msg__timestamp">{item.time}</span>
              </div>
            );
          })}
        </main>

        <footer className="chat__bodyFooter">
          <form className="chat__bodyFooterContainer">
            <span className="iconContainer">
              <i className="far fa-grin"></i>
            </span>

            <input
              type="text"
              placeholder="Type a message"
              className="footerInput"
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="iconContainer"
              onClick={handleSendClick}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
}

export default Chat;
