import { useEffect, useState, useCallback, useRef } from "react";
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

type ViewTab = "overview" | "spaces" | "rentals";

export const OwnerDashboard: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [activeTab, setActiveTab] = useState<ViewTab>("overview");
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
        setRentals(myRentals);

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

    // Carousel component for spaces
    const SpacesCarousel: React.FC<{ spaces: Space[]; title: string }> = ({ spaces, title }) => {
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600 mt-0.5">{spaces.length} espacio{spaces.length !== 1 ? 's' : ''}</p>
                    </div>
                    {spaces.length > 2 && (
                        <div className="hidden sm:flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
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
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2"
                >
                    {spaces.map((space) => (
                        <div key={space.id} className="flex-shrink-0 w-72 sm:w-80">
                            <SpaceCard space={space} viewMode="grid" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Header with Tabs */}
            <div className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Header Row */}
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Panel de Propietario
                            </h1>
                            <p className="text-sm text-gray-600 mt-0.5">
                                Hola, {currentUser.name?.split(' ')[0] || 'Propietario'}
                            </p>
                        </div>
                        <Link
                            to="/spaces/new"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">Nuevo Espacio</span>
                        </Link>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-1 border-b border-gray-200 -mb-px">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium text-sm transition-all relative ${
                                activeTab === "overview"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Resumen
                        </button>
                        <button
                            onClick={() => setActiveTab("spaces")}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium text-sm transition-all relative ${
                                activeTab === "spaces"
                                    ? "text-secondary border-b-2 border-secondary"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Espacios
                            {stats.totalSpaces > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    activeTab === "spaces" ? "bg-secondary/10 text-secondary" : "bg-gray-100 text-gray-600"
                                }`}>
                                    {stats.totalSpaces}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("rentals")}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium text-sm transition-all relative ${
                                activeTab === "rentals"
                                    ? "text-accent border-b-2 border-accent"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Reservas
                            {stats.totalRentals > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    activeTab === "rentals" ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-600"
                                }`}>
                                    {stats.totalRentals}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Stats Carousel */}
                        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                            <div className="flex gap-4 pb-2" style={{ minWidth: 'min-content' }}>
                                {/* Total Spaces */}
                                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 min-w-[160px]">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stats.totalSpaces}</p>
                                            <p className="text-xs text-gray-600 font-medium">Espacios</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Rentals */}
                                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 min-w-[160px]">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-secondary/10 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stats.totalRentals}</p>
                                            <p className="text-xs text-gray-600 font-medium">Reservas</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Monthly Revenue */}
                                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 min-w-[160px]">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-50 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</p>
                                            <p className="text-xs text-gray-600 font-medium">Ingresos</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Spaces */}
                                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 min-w-[160px]">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-accent/10 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stats.activeSpaces}</p>
                                            <p className="text-xs text-gray-600 font-medium">Activos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Link
                                to="/spaces/new"
                                className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Publicar Espacio</h3>
                                        <p className="text-white/80 text-xs">Añade un nuevo espacio</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                to="/owner/spaces"
                                className="bg-gradient-to-br from-secondary to-secondary/90 text-white rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Mis Espacios</h3>
                                        <p className="text-white/80 text-xs">Gestiona publicaciones</p>
                                    </div>
                                </div>
                            </Link>

                            <button className="bg-gradient-to-br from-accent to-accent/90 text-white rounded-lg p-4 hover:shadow-md transition-shadow text-left">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Estadísticas</h3>
                                        <p className="text-white/80 text-xs">Ver análisis detallado</p>
                                    </div>
                                </div>
                            </button>
                        </div>

                        {/* Recent Spaces Preview */}
                        {spaces.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Espacios Recientes</h3>
                                    <button
                                        onClick={() => setActiveTab("spaces")}
                                        className="text-primary text-sm font-medium hover:underline"
                                    >
                                        Ver todos
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {spaces.slice(0, 3).map((space) => (
                                        <SpaceCard
                                            key={space.id}
                                            space={space}
                                            viewMode="grid"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Spaces Tab */}
                {activeTab === "spaces" && (
                    <div className="space-y-6">
                        {spaces.length > 0 ? (
                            <>
                                <SpacesCarousel
                                    spaces={spaces}
                                    title="Todos los Espacios"
                                />
                            </>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes espacios aún</h3>
                                <p className="text-gray-600 mb-6 text-sm">Comienza publicando tu primer espacio para empezar a recibir reservas</p>
                                <Link
                                    to="/spaces/new"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Publicar Espacio</span>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Rentals Tab */}
                {activeTab === "rentals" && (
                    <div className="space-y-4">
                        {rentals.length > 0 ? (
                            <div className="space-y-3">
                                {rentals.map((rental) => {
                                    const space = spaces.find(s => s.id === rental.spaceId);
                                    const now = new Date();
                                    const start = new Date(rental.dateRange.start);
                                    const end = new Date(rental.dateRange.end);
                                    
                                    let status: "upcoming" | "active" | "past" = "past";
                                    if (now < start) status = "upcoming";
                                    else if (now >= start && now <= end) status = "active";

                                    const statusColors = {
                                        upcoming: "bg-blue-50 text-blue-700 border-blue-200",
                                        active: "bg-green-50 text-green-700 border-green-200",
                                        past: "bg-gray-100 text-gray-700 border-gray-200"
                                    };

                                    const statusLabels = {
                                        upcoming: "Próxima",
                                        active: "Activa",
                                        past: "Completada"
                                    };

                                    return (
                                        <div key={rental.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{space?.title || "Espacio desconocido"}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {new Date(rental.dateRange.start).toLocaleDateString()} - {new Date(rental.dateRange.end).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
                                                    {statusLabels[status]}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    Reservado por: <span className="font-medium text-gray-900">{rental.renterId}</span>
                                                </p>
                                                <p className="font-semibold text-primary">${rental.totalCost.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay reservas aún</h3>
                                <p className="text-gray-600 text-sm">Las reservas de tus espacios aparecerán aquí</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
