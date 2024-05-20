import { myPlayer, useMultiplayerState, usePlayersList } from "playroomkit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameEngine } from "../hooks/useGameEngine";

export const Lobby = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setGameState] = useMultiplayerState("gameState", "lobby");
  const { startGame } = useGameEngine();

  const me = myPlayer();
  const players = usePlayersList(true);
  players.sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-8">
        Lobby
      </h1>
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {players.map((player, index) => (
          <div
            className="flex flex-col items-center w-full my-2"
            key={player.id}
          >
            <span className="text-lg font-semibold">
              {index === 0 ? "Player 1" : "Player 2"}
            </span>
            {player.id === me.id ? (
              <Input
                type="text"
                value={player.getState("profile").name || player.id}
                onChange={(e) =>
                  player.setState("profile", { name: e.target.value })
                }
                className="mt-2"
              />
            ) : (
              <div className="mt-2">
                {player.getState("profile").name || player.id}
              </div>
            )}
          </div>
        ))}
      </div>
      {players.length === 2 && (
        <Button
          onClick={() => {
            setGameState("loading");
            setTimeout(() => {
              setGameState("game");
              startGame();
            }, 500);
          }}
          className="mt-6"
        >
          Start Game
        </Button>
      )}
    </div>
  );
};
