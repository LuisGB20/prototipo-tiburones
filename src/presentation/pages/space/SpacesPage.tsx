import React, { useEffect, useState, useMemo } from "react";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Space, SpaceType } from "../../../core/entities/Space";
import { SpaceCard } from "../../components/cards/SpaceCard";

type SortOption = "price-asc" | "price-desc" | "newest" | "title";
type ViewMode = "grid" | "list";

export const SpacesPage: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<SpaceType | "all">("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCity, setSelectedCity] = useState<string>("all");
    
    // UI State
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    useEffect(() => {
        const loadSpaces = async () => {
            setLoading(true);
            const repo = new LocalStorageSpaceRepository();
            const data = await repo.getAll();
            setSpaces(data);
            setLoading(false);
        };
        loadSpaces();
    }, []);

    // Extract unique cities from spaces
    const cities = useMemo(() => {
        const citySet = new Set(spaces.map(s => s.location.city));
        return Array.from(citySet).sort();
    }, [spaces]);

    // Filter and sort spaces
    const filteredSpaces = useMemo(() => {
        let result = [...spaces];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                s => s.title.toLowerCase().includes(query) || 
                     s.description.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (selectedType !== "all") {
            result = result.filter(s => s.type === selectedType);
        }

        // City filter
        if (selectedCity !== "all") {
            result = result.filter(s => s.location.city === selectedCity);
        }

        // Price range filter
        if (minPrice) {
            result = result.filter(s => s.price.amount >= Number(minPrice));
        }
        if (maxPrice) {
            result = result.filter(s => s.price.amount <= Number(maxPrice));
        }

        // Sort
        switch (sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price.amount - b.price.amount);
                break;
            case "price-desc":
                result.sort((a, b) => b.price.amount - a.price.amount);
                break;
            case "title":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "newest":
            default:
                // Keep original order (newest first)
                break;
        }

        return result;
    }, [spaces, searchQuery, selectedType, selectedCity, minPrice, maxPrice, sortBy]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedType("all");
        setMinPrice("");
        setMaxPrice("");
        setSelectedCity("all");
        setSortBy("newest");
    };

    const hasActiveFilters = 
        searchQuery !== "" || 
        selectedType !== "all" || 
        minPrice !== "" || 
        maxPrice !== "" || 
        selectedCity !== "all";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Explora espacios disponibles
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Encuentra el espacio perfecto para tus necesidades. 
                        Filtra por tipo, ubicación y rango de precio.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[250px]">
                            <div className="relative">
                                <svg 
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar espacios..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value as SpaceType | "all")}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value={SpaceType.GARAGE}>Cocheras</option>
                            <option value={SpaceType.HALL}>Salones</option>
                            <option value={SpaceType.OFFICE}>Oficinas</option>
                            <option value={SpaceType.STUDIO}>Estudios</option>
                            <option value={SpaceType.WALL}>Paredes</option>
                        </select>

                        {/* City Filter */}
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="all">Todas las ciudades</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Precio:</label>
                            <input
                                type="number"
                                placeholder="Mín"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="number"
                                placeholder="Máx"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Results Counter */}
                    <div className="text-gray-700">
                        <span className="font-semibold">{filteredSpaces.length}</span> 
                        {filteredSpaces.length === 1 ? " espacio encontrado" : " espacios encontrados"}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm"
                        >
                            <option value="newest">Más recientes</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                            <option value="title">Nombre A-Z</option>
                        </select>

                        {/* View Toggle */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2.5 transition-colors ${
                                    viewMode === "grid" 
                                        ? "bg-primary text-white" 
                                        : "bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                                aria-label="Vista en cuadrícula"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2.5 transition-colors ${
                                    viewMode === "list" 
                                        ? "bg-primary text-white" 
                                        : "bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                                aria-label="Vista en lista"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                                <div className="h-48 bg-gray-300"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredSpaces.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg 
                            className="w-24 h-24 mx-auto mb-4 text-gray-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No se encontraron espacios
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {hasActiveFilters 
                                ? "Intenta ajustar los filtros para ver más resultados" 
                                : "No hay espacios disponibles en este momento"}
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                )}

                {/* Spaces Grid/List */}
                {!loading && filteredSpaces.length > 0 && (
                    <div className={
                        viewMode === "grid" 
                            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                            : "space-y-6"
                    }>
                        {filteredSpaces.map(space => (
                            <SpaceCard key={space.id} space={space} viewMode={viewMode} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
