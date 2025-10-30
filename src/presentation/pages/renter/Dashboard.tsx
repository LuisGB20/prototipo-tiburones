import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { SpaceCard } from "../../components/cards/SpaceCard";
import { Space, SpaceType } from "../../../core/entities/Space";
import { ListSpacesUseCase } from "../../../application/usecases/spaces/ListSpacesUseCase";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";

const spaceRepo = new LocalStorageSpaceRepository();
const listSpacesUC = new ListSpacesUseCase(spaceRepo);

export const RenterDashboard: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<string>("all");
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const loadSpaces = async () => {
        setIsLoading(true);
        const all = await listSpacesUC.execute();
        setSpaces(all);
        setIsLoading(false);
    };

    useEffect(() => { loadSpaces(); }, []);

    // Filtrar espacios
    const filteredSpaces = useMemo(() => {
        return spaces.filter(space => {
            // Filtro por búsqueda
            const matchesSearch = space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                space.location.city.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Filtro por tipo
            const matchesType = selectedType === "all" || space.type === selectedType;
            
            // Filtro por rango de precio
            let matchesPrice = true;
            if (priceRange === "low") matchesPrice = space.price.amount < 100;
            else if (priceRange === "medium") matchesPrice = space.price.amount >= 100 && space.price.amount < 300;
            else if (priceRange === "high") matchesPrice = space.price.amount >= 300;
            
            return matchesSearch && matchesType && matchesPrice;
        });
    }, [spaces, searchTerm, selectedType, priceRange]);

    const stats = {
        total: spaces.length,
        available: spaces.filter(s => s.available).length,
        types: new Set(spaces.map(s => s.type)).size,
    };

    const hasActiveFilters = searchTerm || selectedType !== "all" || priceRange !== "all";

    // Group spaces by category
    const spacesByCategory = useMemo(() => {
        const grouped: Record<string, Space[]> = {};
        filteredSpaces.forEach(space => {
            if (!grouped[space.type]) {
                grouped[space.type] = [];
            }
            grouped[space.type].push(space);
        });
        return grouped;
    }, [filteredSpaces]);

    // Category Carousel Component
    const CategoryCarousel: React.FC<{ category: string; spaces: Space[] }> = ({ category, spaces }) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null);

        const scroll = (direction: 'left' | 'right') => {
            if (scrollContainerRef.current) {
                const scrollAmount = 320;
                const newScrollLeft = scrollContainerRef.current.scrollLeft + 
                    (direction === 'left' ? -scrollAmount : scrollAmount);
                scrollContainerRef.current.scrollTo({
                    left: newScrollLeft,
                    behavior: 'smooth'
                });
            }
        };

        return (
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            {category}
                        </h2>
                        <p className="text-sm text-gray-600 mt-0.5">
                            {spaces.length} espacio{spaces.length !== 1 ? 's' : ''} disponible{spaces.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {spaces.length > 3 && (
                        <div className="hidden sm:flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                                aria-label="Scroll izquierda"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                                aria-label="Scroll derecha"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                    {spaces.map((space) => (
                        <Link
                            key={space.id}
                            to={`/space/${space.id}`}
                            className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-gray-200"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={space.images[0]} 
                                    alt={space.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg text-sm font-bold text-primary shadow-md">
                                    {space.price.format()}
                                    <span className="text-xs text-gray-600 font-normal"> /hora</span>
                                </div>
                                {!space.available && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-gray-900">
                                            No disponible
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                                    {space.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {space.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="line-clamp-1">{space.location.city}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Search Header - Professional */}
            <div className="bg-white sticky top-0 z-40 shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Header Row */}
                    <div className="py-4 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                                Explora Espacios
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {stats.available} espacios disponibles en {stats.types} categorías
                            </p>
                        </div>
                        <Link 
                            to="/my-reservations"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="hidden sm:inline">Mis Reservas</span>
                        </Link>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="pb-4 flex gap-2">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar espacios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                                hasActiveFilters 
                                    ? 'bg-primary text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <span className="hidden sm:inline">Filtros</span>
                        </button>
                    </div>

                    {/* Filter Panel - Collapsible */}
                    {showFilters && (
                        <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-slideDown">
                            {/* Type Filter */}
                            <div>
                                <label className="text-xs font-medium text-gray-700 mb-1.5 block">Tipo de espacio</label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="all">Todos</option>
                                    {Object.values(SpaceType).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Filter */}
                            <div>
                                <label className="text-xs font-medium text-gray-700 mb-1.5 block">Rango de precio</label>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="all">Todos</option>
                                    <option value="low">Menos de $100/hora</option>
                                    <option value="medium">$100 - $300/hora</option>
                                    <option value="high">Más de $300/hora</option>
                                </select>
                            </div>

                            {/* Clear Filters Button */}
                            {hasActiveFilters && (
                                <div className="flex items-end">
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSelectedType("all");
                                            setPriceRange("all");
                                        }}
                                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-lg transition-colors text-sm"
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Loading State */}
                {isLoading ? (
                    <div className="space-y-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                                <div className="flex gap-4 overflow-hidden">
                                    {[1, 2, 3].map(j => (
                                        <div key={j} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm overflow-hidden">
                                            <div className="h-48 bg-gray-200"></div>
                                            <div className="p-4 space-y-3">
                                                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredSpaces.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No se encontraron espacios
                        </h3>
                        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                            Intenta ajustar tus filtros o realizar una búsqueda diferente
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedType("all");
                                setPriceRange("all");
                                setShowFilters(false);
                            }}
                            className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Ver todos los espacios
                        </button>
                    </div>
                ) : hasActiveFilters ? (
                    /* Filtered Results - Grid View */
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Resultados de búsqueda
                            </h2>
                            <p className="text-sm text-gray-600">
                                {filteredSpaces.length} espacio{filteredSpaces.length !== 1 ? 's' : ''} encontrado{filteredSpaces.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSpaces.map((space) => (
                                <SpaceCard key={space.id} space={space} viewMode="grid" />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Category Carousels - No Filters Active */
                    <div className="space-y-8">
                        {Object.entries(spacesByCategory).map(([category, categorySpaces]) => (
                            <CategoryCarousel
                                key={category}
                                category={category}
                                spaces={categorySpaces}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Bottom Spacing */}
            <div className="h-8"></div>
        </div>
    );
};
