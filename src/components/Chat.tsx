import { useState, useEffect, useRef } from "react";
import { myPlayer } from "playroomkit";
import { Button } from "@/components/ui/button";

import { useGameEngine } from "../hooks/useGameEngine";

export const Chat = () => {
  const { messages, addMessage } = useGameEngine();
  const me = myPlayer();
  const playerName = me ? me.getState("profile").name : "La chèvre";
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleSend = () => {
    if (messageText.trim()) {
      addMessage({ player: playerName, text: messageText.trim() });
      setMessageText("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{
        backgroundColor: "white",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "300px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 999,
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{message.player}:</strong> {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", padding: "10px" }}>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          style={{ flex: 1, resize: "none" }}
          rows={2}
        />
        <Button
          variant={"outline"}
          onClick={handleSend}
          style={{ marginLeft: "10px" }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
