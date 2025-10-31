import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Space, SpaceType } from "../../../core/entities/Space";
import { SpaceCard } from "../../components/cards/SpaceCard";
import { Dialog } from "@headlessui/react";
import { SpaceForm } from "../../components/forms/SpaceForm";
import { Price } from "../../../core/valueObjects/Price";

type ViewMode = "grid" | "list";
type FilterType = "all" | "available" | "unavailable";

export const MySpacesPage: React.FC = () => {
    const navigate = useNavigate();
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
    const [currentUser] = useState(JSON.parse(localStorage.getItem("currentUser") || "{}"));
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [filter, setFilter] = useState<FilterType>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const repo = useMemo(() => new LocalStorageSpaceRepository(), []);

    const fetchSpaces = useCallback(() => {
        repo.getAll().then(all => {
            const mySpaces = all.filter(s => s.ownerId === currentUser.id);
            setSpaces(mySpaces);
            setFilteredSpaces(mySpaces);
        });
    }, [currentUser.id, repo]);

    useEffect(() => { 
        fetchSpaces(); 
    }, [fetchSpaces]);

    // Aplicar filtros
    useEffect(() => {
        let result = [...spaces];

        // Filtro por disponibilidad
        if (filter === "available") {
            result = result.filter(s => s.available);
        } else if (filter === "unavailable") {
            result = result.filter(s => !s.available);
        }

        // Filtro por tipo
        if (selectedType !== "all") {
            result = result.filter(s => s.type === selectedType);
        }

        // Búsqueda por texto
        if (searchTerm) {
            result = result.filter(s =>
                s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.location.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredSpaces(result);
    }, [filter, selectedType, searchTerm, spaces]);

    const handleDelete = async (space: Space) => {
        if (!window.confirm(`¿Seguro que deseas eliminar "${space.title}"?`)) return;
        setIsDeleting(true);
        await repo.delete(space.id);
        fetchSpaces();
        setIsDeleting(false);
    };

    const handleEdit = (space: Space) => {
        setSelectedSpace(space);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (updatedData: Record<string, unknown>) => {
        if (!selectedSpace) return;
        
        const updatedSpace: Space = {
            ...selectedSpace,
            title: updatedData.title as string,
            description: updatedData.description as string,
            type: updatedData.type as SpaceType,
            location: {
                city: (updatedData.location as Record<string, string>).city,
                address: (updatedData.location as Record<string, string>).address
            },
            price: new Price((updatedData.price as Record<string, number>).amount, "MXN"),
            images: updatedData.images as string[]
        };
        
        await repo.update(updatedSpace);
        setIsModalOpen(false);
        setSelectedSpace(null);
        fetchSpaces();
    };

    const toggleAvailability = async (space: Space) => {
        const updated = { ...space, available: !space.available };
        await repo.update(updated);
        fetchSpaces();
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Mis Espacios
                            </h1>
                            <p className="text-gray-600">
                                Gestiona y organiza tus {spaces.length} espacio{spaces.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/spaces/new")}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Nuevo Espacio</span>
                        </button>
                    </div>
                </div>

                {/* Filtros y Búsqueda */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Búsqueda */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, descripción o ciudad..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Filtro por Disponibilidad */}
                        <div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as FilterType)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            >
                                <option value="all">Todos los espacios</option>
                                <option value="available">Disponibles</option>
                                <option value="unavailable">No disponibles</option>
                            </select>
                        </div>

                        {/* Filtro por Tipo */}
                        <div>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            >
                                <option value="all">Todos los tipos</option>
                                {Object.values(SpaceType).map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Toggle de Vista y Contador */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Mostrando <span className="font-semibold text-primary">{filteredSpaces.length}</span> de {spaces.length} espacios
                        </p>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === "grid"
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === "list"
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenido - Grid o Lista */}
                {filteredSpaces.length > 0 ? (
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSpaces.map(space => (
                                <div key={space.id} className="relative group">
                                    <SpaceCard space={space} />
                                    
                                    {/* Overlay con acciones */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center space-x-3">
                                        <button
                                            onClick={() => toggleAvailability(space)}
                                            className={`p-3 rounded-xl backdrop-blur-sm border-2 transition-all ${
                                                space.available
                                                    ? "bg-green-500/90 border-green-400 hover:bg-green-600"
                                                    : "bg-gray-500/90 border-gray-400 hover:bg-gray-600"
                                            } text-white`}
                                            title={space.available ? "Marcar como no disponible" : "Marcar como disponible"}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {space.available ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                )}
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleEdit(space)}
                                            className="p-3 bg-blue-500/90 backdrop-blur-sm rounded-xl hover:bg-blue-600 text-white border-2 border-blue-400 transition-all"
                                            title="Editar"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(space)}
                                            disabled={isDeleting}
                                            className="p-3 bg-red-500/90 backdrop-blur-sm rounded-xl hover:bg-red-600 text-white border-2 border-red-400 transition-all disabled:opacity-50"
                                            title="Eliminar"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Badge de disponibilidad */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            space.available
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-500 text-white"
                                        }`}>
                                            {space.available ? "Disponible" : "No disponible"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredSpaces.map(space => (
                                <div
                                    key={space.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                                >
                                    <div className="flex items-center space-x-6">
                                        <img
                                            src={space.images[0] || "/placeholder.jpg"}
                                            alt={space.title}
                                            className="w-32 h-32 object-cover rounded-xl"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{space.title}</h3>
                                                    <p className="text-sm text-gray-600">{space.type}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    space.available
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}>
                                                    {space.available ? "Disponible" : "No disponible"}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-3 line-clamp-2">{space.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {space.location.city}
                                                    </span>
                                                    <span className="font-semibold text-primary text-lg">
                                                        {space.price.format()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => toggleAvailability(space)}
                                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                                            space.available
                                                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                    >
                                                        {space.available ? "Desactivar" : "Activar"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(space)}
                                                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-semibold text-sm transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(space)}
                                                        disabled={isDeleting}
                                                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold text-sm transition-colors disabled:opacity-50"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No se encontraron espacios
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Intenta ajustar tus filtros o búsqueda
                        </p>
                        <button
                            onClick={() => {
                                setFilter("all");
                                setSelectedType("all");
                                setSearchTerm("");
                            }}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Edición */}
            {isModalOpen && selectedSpace && (
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                                <Dialog.Title className="text-2xl font-bold text-gray-900">
                                    Editar Espacio
                                </Dialog.Title>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <SpaceForm 
                                    onSubmit={handleModalSubmit} 
                                    initialData={selectedSpace ? {
                                        title: selectedSpace.title,
                                        description: selectedSpace.description,
                                        type: selectedSpace.type,
                                        location: selectedSpace.location,
                                        price: selectedSpace.price,
                                        images: selectedSpace.images
                                    } : undefined} 
                                />
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </div>
    );
};
