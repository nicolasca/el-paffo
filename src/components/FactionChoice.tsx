import { useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const FactionChoice = () => {
  const { chooseFaction } = useGameEngine();
  const [faction, setFaction] = useState<string>();

  const me = myPlayer();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-8">
        Faction Choice
      </h1>
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <Select
          onValueChange={(value) => {
            setFaction(value);
          }}
        >
          <SelectTrigger className="w-[180px] my-4">
            <SelectValue placeholder="Faction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gobelins">Gobelins</SelectItem>
            <SelectItem value="sephosi">Sephosi</SelectItem>
          </SelectContent>
        </Select>
        {faction && (
          <Button
            onClick={() => chooseFaction(me?.id, faction)}
            disabled={!faction}
            className="mt-6"
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};
