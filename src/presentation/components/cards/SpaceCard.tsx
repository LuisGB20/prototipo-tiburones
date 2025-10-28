import React from "react";
import { Link } from "react-router-dom";
import { Space } from "../../../core/entities/Space";

interface SpaceCardProps {
  space: Space;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const previewImage = space.images[0] || "/placeholder.jpg"; // Imagen por defecto

  return (
    <Link to={`/space/${space.id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition max-w-sm mx-auto cursor-pointer">
        {/* Imagen principal */}
        <div className="h-48 w-full overflow-hidden">
          <img
            src={previewImage}
            alt={space.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col">
          <h2 className="font-bold text-xl mb-1 line-clamp-2">{space.title}</h2>
          <p className="text-gray-700 text-sm mb-2 line-clamp-3">{space.description}</p>
          <p className="text-gray-500 text-sm mb-2">{space.location.toString()}</p>
          <p className="font-semibold text-secondary text-lg">{space.price.format()}</p>
        </div>
      </div>
    </Link>
  );
};
