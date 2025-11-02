import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Space, SpaceType } from "../../../core/entities/Space";

type SortOption = "price-asc" | "price-desc" | "newest" | "title";
type ViewMode = "categories" | "list";

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
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("categories");

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
            result = result.filter(s => s.type.toUpperCase() == selectedType.toUpperCase());
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

    const getSpaceTypeLabel = (type: SpaceType) => {
        const labels: Record<SpaceType, string> = {
            [SpaceType.WALL]: "Pared",
            [SpaceType.GARAGE]: "Cochera",
            [SpaceType.ROOM]: "Habitación",
            [SpaceType.HALL]: "Salón",
            [SpaceType.STUDIO]: "Estudio",
            [SpaceType.OFFICE]: "Oficina",
            [SpaceType.WAREHOUSE]: "Bodega",
            [SpaceType.TERRACE]: "Terraza",
            [SpaceType.ROOFTOP]: "Azotea",
            [SpaceType.GARDEN]: "Jardín",
            [SpaceType.PARKING_SPOT]: "Estacionamiento",
            [SpaceType.SHOP]: "Local",
            [SpaceType.EVENT_SPACE]: "Eventos",
            [SpaceType.ADVERTISEMENT_SPOT]: "Publicidad",
            [SpaceType.OTHER]: "Otro"
        };
        return labels[type.toUpperCase() as SpaceType] || type;
    };

    // Agrupar espacios por tipo para vista de categorías
    const spacesByCategory = useMemo(() => {
        const categories: Record<string, Space[]> = {};
        
        filteredSpaces.forEach(space => {
            const typeKey = space.type;
            if (!categories[typeKey]) {
                categories[typeKey] = [];
            }
            categories[typeKey].push(space);
        });

        // Ordenar categorías por cantidad de espacios
        return Object.entries(categories)
            .sort(([, a], [, b]) => b.length - a.length)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Record<string, Space[]>);
    }, [filteredSpaces]);

    // Componente Carousel individual
    const CategoryCarousel: React.FC<{ title: string; spaces: Space[]; categoryType: SpaceType }> = ({ title, spaces }) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null);

        const scroll = (direction: 'left' | 'right') => {
            if (scrollContainerRef.current) {
                const scrollAmount = 320;
                const newScrollPosition = scrollContainerRef.current.scrollLeft + 
                    (direction === 'left' ? -scrollAmount : scrollAmount);
                scrollContainerRef.current.scrollTo({
                    left: newScrollPosition,
                    behavior: 'smooth'
                });
            }
        };

        return (
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {spaces.length} {spaces.length === 1 ? 'espacio' : 'espacios'}
                        </p>
                    </div>
                    
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {spaces.map((space) => (
                            <Link
                                key={space.id}
                                to={`/space/${space.id}`}
                                className="shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary group"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {space.images && space.images.length > 0 ? (
                                        <img
                                            src={space.images[0]}
                                            alt={space.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                                            <span className="text-lg font-bold text-primary">
                                                ${space.price.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {space.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm truncate">{space.location.city}</span>
                                    </div>
                                    
                                    {space.description && (
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                            {space.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                                            ✓ Disponible
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {space.price.currency}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-gray-50 to-transparent pointer-events-none" />
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-gray-50 to-transparent pointer-events-none" />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Search */}
            <section className="bg-linear-to-r from-primary to-secondary text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        Encuentra tu espacio ideal
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8">
                        {filteredSpaces.length} espacios disponibles en Cancún
                    </p>

                    {/* Quick Search Bar - Estilo Booking */}
                    <div className="bg-white rounded-lg shadow-xl p-3 sm:p-4 max-w-4xl">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="¿Qué tipo de espacio buscas?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            {/* Search Button */}
                            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors whitespace-nowrap">
                                Buscar
                            </button>
                        </div>

                        {/* Quick Filters - Mobile: Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="mt-3 w-full sm:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Filtros {hasActiveFilters && `(${[selectedType !== "all", selectedCity !== "all", minPrice, maxPrice].filter(Boolean).length})`}
                        </button>

                        {/* Filters Row - Desktop: Always visible, Mobile: Collapsible */}
                        <div className={`mt-3 flex-wrap gap-2 sm:gap-3 ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as SpaceType | "all")}
                                className="flex-1 min-w-[140px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-700"
                            >
                                <option value="all">Tipo de espacio</option>
                                {Object.values(SpaceType).map((type) => (
                                    <option key={type} value={type}>{getSpaceTypeLabel(type)}</option>
                                ))}
                            </select>

                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="flex-1 min-w-[140px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-700"
                            >
                                <option value="all">Ciudad</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                            <input
                                type="number"
                                placeholder="Precio mín"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full sm:w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-700"
                            />

                            <input
                                type="number"
                                placeholder="Precio máx"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full sm:w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm text-gray-700"
                            />

                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Filters Section */}
                                {/* Results Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    {/* Results Count */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {loading ? (
                                "Cargando espacios..."
                            ) : filteredSpaces.length === 0 ? (
                                "No se encontraron espacios"
                            ) : (
                                `${filteredSpaces.length} ${filteredSpaces.length === 1 ? "espacio" : "espacios"}`
                            )}
                        </h2>
                        {hasActiveFilters && (
                            <p className="text-sm text-gray-600 mt-1">
                                Filtros activos aplicados
                            </p>
                        )}
                    </div>

                    {/* View Toggle & Sort */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* View Mode Toggle */}
                        {!hasActiveFilters && (
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
                                <button
                                    onClick={() => setViewMode("categories")}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                                        viewMode === "categories"
                                            ? "bg-primary text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Categorías
                                    </span>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                                        viewMode === "list"
                                            ? "bg-primary text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        Lista
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:inline">
                                Ordenar:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm bg-white"
                            >
                                <option value="newest">Más recientes</option>
                                <option value="price-asc">Menor precio</option>
                                <option value="price-desc">Mayor precio</option>
                                <option value="title">A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State - Booking Style Skeletons */}
                {loading && (
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-pulse">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image Skeleton */}
                                    <div className="w-full sm:w-72 h-56 sm:h-64 bg-gray-300 shrink-0" />
                                    {/* Content Skeleton */}
                                    <div className="flex-1 p-4 sm:p-6 space-y-3">
                                        <div className="h-6 bg-gray-300 rounded w-3/4" />
                                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                                        <div className="h-4 bg-gray-300 rounded w-2/3" />
                                        <div className="flex gap-2 mt-4">
                                            <div className="h-6 w-20 bg-gray-300 rounded-full" />
                                            <div className="h-6 w-24 bg-gray-300 rounded-full" />
                                        </div>
                                    </div>
                                    {/* Price Skeleton */}
                                    <div className="p-4 sm:p-6 border-t sm:border-t-0 sm:border-l border-gray-200">
                                        <div className="h-8 w-24 bg-gray-300 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredSpaces.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <svg
                            className="w-20 h-20 text-gray-400 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No se encontraron espacios
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {hasActiveFilters 
                                ? "Intenta ajustar los filtros o realiza una nueva búsqueda."
                                : "Aún no hay espacios disponibles. ¡Sé el primero en publicar uno!"}
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-semibold"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                )}

                {/* Vista de Categorías con Carrouseles */}
                {!loading && filteredSpaces.length > 0 && viewMode === "categories" && !hasActiveFilters && (
                    <div className="space-y-6">
                        {Object.entries(spacesByCategory).map(([typeKey, categorySpaces]) => (
                            <CategoryCarousel
                                key={typeKey}
                                title={getSpaceTypeLabel(typeKey as SpaceType)}
                                spaces={categorySpaces}
                                categoryType={typeKey as SpaceType}
                            />
                        ))}
                    </div>
                )}

                {/* Vista de Lista - Booking.com Style Cards */}
                {!loading && filteredSpaces.length > 0 && (viewMode === "list" || hasActiveFilters) && (
                    <div className="space-y-4">
                        {filteredSpaces.map((space) => (
                            <Link
                                key={space.id}
                                to={`/space/${space.id}`}
                                className="block bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary group"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image Section */}
                                    <div className="relative w-full sm:w-72 md:w-80 h-56 sm:h-64 shrink-0 overflow-hidden bg-gray-100">
                                        {space.images && space.images.length > 0 ? (
                                            <img
                                                src={space.images[0]}
                                                alt={space.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
                                                <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        {/* Badge de Tipo */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-md">
                                                {getSpaceTypeLabel(space.type)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between min-w-0">
                                        {/* Title & Location */}
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {space.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-sm truncate">{space.location.city}</span>
                                            </div>

                                            {/* Description Preview */}
                                            {space.description && (
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                    {space.description}
                                                </p>
                                            )}

                                            {/* Features Badges */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {space.location.address && (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full truncate max-w-[200px]">
                                                        📍 {space.location.address}
                                                    </span>
                                                )}
                                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                                                    Disponible
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price Section */}
                                    <div className="p-4 sm:p-6 border-t sm:border-t-0 sm:border-l border-gray-200 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 bg-gray-50 sm:bg-transparent min-w-fit">
                                        <div className="text-right">
                                            <div className="text-xs sm:text-sm text-gray-500 mb-1">
                                                Desde
                                            </div>
                                            <div className="text-2xl sm:text-3xl font-bold text-primary whitespace-nowrap">
                                                ${space.price.amount.toLocaleString()}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">
                                                {space.price.currency}
                                            </div>
                                        </div>
                                        <button className="px-4 sm:px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm hover:shadow-md">
                                            Ver detalles
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
