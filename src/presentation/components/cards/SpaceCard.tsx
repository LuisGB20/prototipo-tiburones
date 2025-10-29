import React from "react";
import { Link } from "react-router-dom";
import { Space } from "../../../core/entities/Space";

interface SpaceCardProps {
  space: Space;
  viewMode?: "grid" | "list";
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, viewMode = "grid" }) => {
  const previewImage = space.images[0] || "/placeholder.jpg";

  // List View
  if (viewMode === "list") {
    return (
      <Link to={`/space/${space.id}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-80 h-48 md:h-auto overflow-hidden flex-shrink-0">
              <img
                src={previewImage}
                alt={space.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-bold text-2xl text-gray-900 flex-1">{space.title}</h2>
                  <span className="ml-4 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {space.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{space.description}</p>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{space.location.toString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-primary">{space.price.format()}</p>
                  <p className="text-sm text-gray-500">por hora</p>
                </div>
                
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View (default)
  return (
    <Link to={`/space/${space.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={previewImage}
            alt={space.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-md">
            {space.type}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-bold text-xl mb-2 text-gray-900 line-clamp-1">{space.title}</h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">{space.description}</p>
          
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{space.location.toString()}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div>
              <p className="font-bold text-2xl text-primary">{space.price.format()}</p>
              <p className="text-xs text-gray-500">por hora</p>
            </div>
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-sm">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
