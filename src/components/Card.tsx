import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CardData = {
  nom: string;
  type: string;
  ptsDeploiement: number;
  rPointsDeRegiment: number;
  cacTir: string;
  a: number;
  d: number;
  p: string;
  capacités?: string;
  imgPath: string;
};

export const Card = ({ data }: { data: CardData }) => {
  const backgroundImage = `/cards-images`; // Example for a specific card
  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden w-96 h-56 shadow-lg relative">
      {/* Top Section */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 p-2 rounded-md text-lg font-bold">
        {data.ptsDeploiement}
      </div>

      <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-md text-lg font-semibold">
        {data.rPointsDeRegiment}
      </div>
      <div className="absolute top-10 w-full text-center text-lg font-bold">
        {data.nom}
      </div>
      {/* Image Placeholder */}
      <div
        className="h-2/3 w-full bg-gray-600 flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage + data.imgPath})` }}
      >
        {/* You can add an overlay or additional styling here if needed */}
      </div>
      {/* Bottom Section */}
      <div className="h-1/3 w-full bg-gray-900 p-2 flex flex-col justify-between">
        <div className="text-sm grid grid-cols-3 gap-1">
          <div>
            <strong>Type:</strong> {data.type}
          </div>
          <div>
            <strong>Cac/Tir:</strong> {data.cacTir}
          </div>
          <div>
            <strong>A:</strong> {data.a}
          </div>
          <div>
            <strong>D:</strong> {data.d}
          </div>
          <div>
            <strong>P:</strong> {data.p}
          </div>
          {data.capacités && (
            <div className="col-span-3">
              <strong>Capacités:</strong> {data.capacités}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
