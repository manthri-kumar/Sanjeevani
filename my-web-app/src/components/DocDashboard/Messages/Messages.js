import React, { useState } from "react";
import "./Messages.css"; // Assuming you have a CSS file for styling

export default function Messages() {
  const [msgs, setMsgs] = useState([
    { id: "m1", from: "Beth Mccoy", text: "Doctor, can I reschedule?", time: "09:12" },
    { id: "m2", from: "Evan Henry", text: "Any diet suggestions?", time: "10:05" },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: String(Date.now()), from: "You", text, time: new Date().toLocaleTimeString().slice(0,5) }]);
    setText("");
  };

  return (
    <div className="page">
      <h1 className="title">Messages</h1>

      <div className="card">
        <div className="chat">
          {msgs.map((m) => (
            <div key={m.id} className={"bubble " + (m.from === "You" ? "me" : "")}>
              <div className="bubble-from">{m.from}</div>
              <div>{m.text}</div>
              <div className="bubble-time">{m.time}</div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message…"
          />
          <button className="btn" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
