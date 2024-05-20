import { useMultiplayerState } from "playroomkit";
import "./App.css";
import { Lobby } from "./components/Lobby";
import { Game } from "./components/Game";

function App() {
  const [gameState] = useMultiplayerState("gameState", "lobby");
  console.log(gameState);

  return (
    <>
      {gameState === "lobby" && <Lobby />}
      {gameState === "game" && <Game />}
    </>
  );
}

export default App;
