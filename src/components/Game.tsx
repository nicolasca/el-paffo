import { useState } from "react";
import { Button } from "@/components/ui/button";

import { FactionChoice } from "./FactionChoice";
import { useGameEngine } from "../hooks/useGameEngine";
import { DeckChoice } from "./DeckChoice";
import { Chat } from "./Chat";

export const Game = () => {
  const { step } = useGameEngine();
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div>
      {step === "factionChoice" && <FactionChoice />}
      {step === "setDeck" && <DeckChoice />}
      <Button
        onClick={toggleChatVisibility}
        style={{
          position: "fixed",
          bottom: isChatVisible ? "330px" : "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {isChatVisible ? "Hide Chat" : "Show Chat"}
      </Button>
      {isChatVisible && <Chat />}
    </div>
  );
};
