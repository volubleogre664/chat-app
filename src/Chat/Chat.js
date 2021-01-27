import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [state, setState] = useState(false);

  const handleInputChange = (e) => setText(e.target.value);

  const handleCheckChange = (e) => setState(!state);

  const handleSendClick = (e) => {
    e.preventDefault();

    const regex = / /gi;
    const str = text.replace(regex, "");
    if (text === "" || str === "") return;

    const d = new Date();
    setMessages([
      ...messages,
      {
        text: text,
        time: `${formatTime(d.getHours())}:${formatTime(d.getMinutes())}`,
        sent: state,
      },
    ]);

    setText("");
    document.querySelector(".footerInput").value = "";
    // console.log(messages);
  };

  const formatTime = (val) => (val >= 10 ? val : `0${val}`);

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <header className="chat__sidebarHeader">
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          <span>Chat</span>
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
            <div className="body__chatsContact">
              <div className="contact__imgContainer">
                <i className="fas fa-user"></i>
              </div>

              <div className="contact__userInfo">
                <div className="contact__userInfoHead">
                  <h3 className="contact__userInfoName">Demo Name</h3>
                  <small className="contact__userInfoMsg">
                    <sup>3</sup>
                  </small>
                </div>

                <p className="contact__userInfoText">Placeholder message.</p>
              </div>
            </div>

            <div className="body__chatsContact">
              <div className="contact__imgContainer">
                <i className="fas fa-user"></i>
              </div>

              <div className="contact__userInfo">
                <div className="contact__userInfoHead">
                  <h3 className="contact__userInfoName">Demo Name</h3>
                  <small className="contact__userInfoMsg">
                    <sup>309</sup>
                  </small>
                </div>

                <p className="contact__userInfoText">Placeholder message.</p>
              </div>
            </div>
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
          {messages.map((item, i) => {
            return (
              <div
                className={
                  item.sent ? "sent chat__bodyMainMsg" : "chat__bodyMainMsg"
                }
                key={i}
              >
                <div className="chat__bodyMainMsgLeft">
                  <div className="msg__imgContainer">
                    <i className="fas fa-user"></i>
                  </div>

                  <div className="msg__textContainer">{item.text}</div>
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
