import React, { useEffect, useState, useMemo } from "react";
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    <div className="text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Encuentra tu espacio ideal
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            Descubre espacios únicos en Cancún para tus necesidades
                        </p>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold">{stats.total}</div>
                                <div className="text-blue-100 mt-2">Espacios Totales</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold">{stats.available}</div>
                                <div className="text-blue-100 mt-2">Disponibles Ahora</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold">{stats.types}</div>
                                <div className="text-blue-100 mt-2">Categorías</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar por nombre, descripción o ubicación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none cursor-pointer"
                        >
                            <option value="all">Todos los tipos</option>
                            {Object.values(SpaceType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        {/* Price Range Filter */}
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none cursor-pointer"
                        >
                            <option value="all">Todos los precios</option>
                            <option value="low">Menos de $100</option>
                            <option value="medium">$100 - $300</option>
                            <option value="high">Más de $300</option>
                        </select>

                        {/* Clear Filters */}
                        {(searchTerm || selectedType !== "all" || priceRange !== "all") && (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedType("all");
                                    setPriceRange("all");
                                }}
                                className="px-6 py-3 text-gray-600 hover:text-red-500 font-semibold transition-colors whitespace-nowrap"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {filteredSpaces.length === spaces.length 
                            ? "Todos los espacios" 
                            : `${filteredSpaces.length} resultado${filteredSpaces.length !== 1 ? 's' : ''} encontrado${filteredSpaces.length !== 1 ? 's' : ''}`
                        }
                    </h2>
                    <Link 
                        to="/my-reservations"
                        className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-secondary font-semibold transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Mis Reservas</span>
                    </Link>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-300"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-6 bg-gray-300 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredSpaces.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron espacios</h3>
                        <p className="text-gray-600 mb-6">
                            Intenta ajustar tus filtros o buscar con otros términos
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedType("all");
                                setPriceRange("all");
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                            Ver todos los espacios
                        </button>
                    </div>
                ) : (
                    /* Spaces Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSpaces.map((space) => (
                            <SpaceCard key={space.id} space={space} />
                        ))}
                    </div>
                )}
            </main>

            {/* Quick Categories Section */}
            {!isLoading && filteredSpaces.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Categorías populares</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.values(SpaceType).slice(0, 4).map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`p-6 rounded-xl border-2 transition-all ${
                                    selectedType === type
                                        ? "border-primary bg-primary/5 shadow-lg"
                                        : "border-gray-200 hover:border-primary/50 hover:shadow-md"
                                }`}
                            >
                                <div className="text-4xl mb-2">
                                    {type === SpaceType.GARAGE ? "🚗" : 
                                     type === SpaceType.OFFICE ? "�" :
                                     type === SpaceType.STUDIO ? "🎨" : "🏢"}
                                </div>
                                <div className="font-semibold text-gray-900">{type}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {spaces.filter(s => s.type === type).length} disponibles
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
