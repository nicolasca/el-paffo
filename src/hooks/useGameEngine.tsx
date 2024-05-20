import { PlayerState, useMultiplayerState, usePlayersList } from "playroomkit";
import React from "react";

type GameEngineContextType = {
  players: PlayerState[];
  step: string;
  messages: Message[];
  startGame: () => void;
  chooseFaction: (id: string, faction: string) => void;
  addMessage: (message: Message) => void;
};

type Message = {
  player: string;
  text: string;
};

const GameEngineContext = React.createContext<GameEngineContextType>(
  {} as GameEngineContextType
);

export const GameEngineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useMultiplayerState("step", "");
  const [messages, setMessages] = useMultiplayerState("messages", []);

  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id)); // we sort players by id to have a consistent order through all clients

  const gameState = {
    players,
    step,
    messages,
  };

  const startGame = () => {
    setStep("factionChoice");
  };

  const addMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  const chooseFaction = (id: string, faction: string) => {
    console.log("chooseFaction", faction);
    const player = players.find((p) => p.id === id);
    if (player) player.setState("faction", faction);

    if (players.every((p) => p.getState("faction"))) {
      setStep("setDeck");
    }
  };

  return (
    <GameEngineContext.Provider
      value={{
        ...gameState,
        startGame,
        chooseFaction,
        addMessage,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => {
  const context = React.useContext(GameEngineContext);
  if (context === undefined) {
    throw new Error("useGameEngine must be used within a GameEngineProvider");
  }
  return context;
};
