import { myPlayer } from "playroomkit";
import allCards from "../assets/cards.json";

import { Card, CardData } from "./Card";

export const DeckChoice = () => {
  const me = myPlayer();

  const faction = me?.getState("faction");
  console.log(faction);
  const cards: CardData[] = allCards[faction];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Deck Choice</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {cards?.map((card, index) => {
          return <Card data={card} key={index} />;
        })}
      </div>
    </div>
  );
};
