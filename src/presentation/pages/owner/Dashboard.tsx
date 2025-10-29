import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { SpaceCard } from "../../components/cards/SpaceCard";
import { Space } from "../../../core/entities/Space";
import { Rental } from "../../../core/entities/Rental";
import { ListSpacesUseCase } from "../../../application/usecases/spaces/ListSpacesUseCase";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { LocalStorageRentalRepository } from "../../../infrastructure/repositories/LocalStorageRentalRepository";

const spaceRepo = new LocalStorageSpaceRepository();
const rentalRepo = new LocalStorageRentalRepository();
const listSpacesUC = new ListSpacesUseCase(spaceRepo);

export const OwnerDashboard: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [stats, setStats] = useState({
        totalSpaces: 0,
        activeSpaces: 0,
        totalRentals: 0,
        monthlyRevenue: 0,
    });
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const loadData = useCallback(async () => {
        const allSpaces = await listSpacesUC.execute();
        const mySpaces = allSpaces.filter((s: Space) => s.ownerId === currentUser.id);
        setSpaces(mySpaces);

        const allRentals = await rentalRepo.getAll();
        const myRentals = allRentals.filter((r: Rental) => r.ownerId === currentUser.id);

        // Calcular estadísticas
        const totalRevenue = myRentals.reduce((sum: number, r: Rental) => sum + r.totalCost, 0);
        
        setStats({
            totalSpaces: mySpaces.length,
            activeSpaces: mySpaces.filter((s: Space) => s.available).length,
            totalRentals: myRentals.length,
            monthlyRevenue: totalRevenue,
        });
    }, [currentUser.id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const recentSpaces = spaces.slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Panel de Propietario
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Bienvenido, <span className="font-semibold text-primary">{currentUser.name}</span>
                            </p>
                        </div>
                        <Link
                            to="/spaces/new"
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Nuevo Espacio</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Espacios */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    Total Espacios
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.totalSpaces}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Todos tus espacios
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Espacios Activos */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    Activos
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.activeSpaces}
                                </p>
                                <p className="text-xs text-green-600 mt-2 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Disponibles
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total Rentas */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    Reservas
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.totalRentals}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Total realizadas
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Ingresos */}
                    <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/80 mb-1">
                                    Ingresos Totales
                                </p>
                                <p className="text-3xl font-bold">
                                    ${stats.monthlyRevenue.toLocaleString()}
                                </p>
                                <p className="text-xs text-white/70 mt-2">
                                    MXN acumulados
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Link
                        to="/my-spaces"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Ver Mis Espacios</h3>
                                <p className="text-sm text-gray-600">Gestiona todos tus espacios</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/spaces/new"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-secondary group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                                <svg className="w-6 h-6 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Agregar Espacio</h3>
                                <p className="text-sm text-gray-600">Publica un nuevo espacio</p>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-accent group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                                <svg className="w-6 h-6 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Ver Estadísticas</h3>
                                <p className="text-sm text-gray-600">Análisis detallado</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Espacios Recientes */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Espacios Recientes</h2>
                            <p className="text-sm text-gray-600">Últimos espacios publicados</p>
                        </div>
                        <Link
                            to="/my-spaces"
                            className="text-primary hover:text-secondary font-semibold text-sm flex items-center space-x-1 transition-colors"
                        >
                            <span>Ver todos</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {recentSpaces.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentSpaces.map((space) => (
                                <SpaceCard key={space.id} space={space} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Aún no tienes espacios
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Comienza publicando tu primer espacio para empezar a generar ingresos
                            </p>
                            <Link
                                to="/spaces/new"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Publicar Primer Espacio</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
