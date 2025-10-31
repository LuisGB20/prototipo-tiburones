import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Space, SpaceType } from "../../../core/entities/Space";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { ReviewService } from "../../../application/services/ReviewService";
import { Review } from "../../../core/entities/Review";
import { useAuth } from "../../context/AuthContext";

export const SpaceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [space, setSpace] = useState<Space | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const fetchSpace = async () => {
            try {
                const repo = new LocalStorageSpaceRepository();
                const reviewService = new ReviewService();
                const s = await repo.getById(id!);
                setSpace(s);
                if (s && user) {
                    if (s.ownerId === user.id) {
                        setIsOwner(true);
                        const ownerReviews = await reviewService.getReviewsForUser(s.ownerId);
                        setReviews(ownerReviews);
                    }
                }
            } catch (error) {
                console.error("Error al cargar espacio:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSpace();
    }, [id, user]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    if (!space) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Espacio no encontrado</h2>
                    <p className="mt-2 text-gray-600">El espacio que buscas no existe o fue eliminado</p>
                    <Link
                        to="/spaces"
                        className="mt-6 inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver a espacios
                    </Link>
                </div>
            </div>
        );
    }

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % space.images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + space.images.length) % space.images.length);

    const getSpaceTypeLabel = (type: SpaceType) => {
        const labels: Record<SpaceType, string> = {
            [SpaceType.WALL]: "Pared para Arte",
            [SpaceType.GARAGE]: "Cochera",
            [SpaceType.ROOM]: "Habitación",
            [SpaceType.HALL]: "Salón de Eventos",
            [SpaceType.STUDIO]: "Estudio",
            [SpaceType.OFFICE]: "Oficina",
            [SpaceType.WAREHOUSE]: "Bodega",
            [SpaceType.TERRACE]: "Terraza",
            [SpaceType.ROOFTOP]: "Azotea",
            [SpaceType.GARDEN]: "Jardín",
            [SpaceType.PARKING_SPOT]: "Espacio de Estacionamiento",
            [SpaceType.SHOP]: "Local Comercial",
            [SpaceType.EVENT_SPACE]: "Espacio para Eventos",
            [SpaceType.ADVERTISEMENT_SPOT]: "Espacio Publicitario",
            [SpaceType.OTHER]: "Otro"
        };
        return labels[type] || type;
    };

    const getSpaceTypeIcon = (type: SpaceType) => {
        switch (type) {
            case SpaceType.GARAGE:
            case SpaceType.PARKING_SPOT:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                );
            case SpaceType.HALL:
            case SpaceType.EVENT_SPACE:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                );
            case SpaceType.OFFICE:
            case SpaceType.SHOP:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
            case SpaceType.STUDIO:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            case SpaceType.WALL:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                );
            case SpaceType.GARDEN:
            case SpaceType.TERRACE:
            case SpaceType.ROOFTOP:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pb-12">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
                            Inicio
                        </Link>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link to="/spaces" className="text-gray-500 hover:text-primary transition-colors">
                            Espacios
                        </Link>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium truncate max-w-xs">{space.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header con título y botón */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna Izquierda - Imágenes y Descripción */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Galería de imágenes mejorada */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Imagen principal */}
                            <div className="relative h-[500px] bg-gray-900">
                                {space.images.length > 0 ? (
                                    <>
                                        <img
                                            src={space.images[currentImage]}
                                            alt={`${space.title} - ${currentImage + 1}`}
                                            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                                            onClick={() => setShowImageModal(true)}
                                        />
                                        
                                        {/* Overlay con contador de imágenes */}
                                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                                            {currentImage + 1} / {space.images.length}
                                        </div>

                                        {/* Botones de navegación mejorados */}
                                        {space.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-lg">No hay imágenes disponibles</p>
                                    </div>
                                )}
                            </div>

                            {/* Miniaturas */}
                            {space.images.length > 1 && (
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    <div className="flex space-x-3 overflow-x-auto pb-2">
                                        {space.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImage(idx)}
                                                className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                                    idx === currentImage
                                                        ? "border-primary scale-105 shadow-md"
                                                        : "border-gray-300 hover:border-primary/50 opacity-70 hover:opacity-100"
                                                }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Miniatura ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Información detallada del espacio */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            {getSpaceTypeIcon(space.type)}
                                        </div>
                                        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                            {getSpaceTypeLabel(space.type)}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        {space.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Ubicación */}
                            <div className="flex items-start space-x-3 mb-6 p-4 bg-gray-50 rounded-xl">
                                <svg className="w-6 h-6 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-gray-900">Ubicación</p>
                                    <p className="text-gray-600">{space.location.toString()}</p>
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Descripción
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {space.description}
                                </p>
                            </div>
                        </div>

                        {/* Reviews para propietarios */}
                        {isOwner && reviews.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <svg className="w-7 h-7 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Comentarios de Usuarios
                                </h2>
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                                                        U
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">Usuario</p>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(review.date).toLocaleDateString('es-MX', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-1 bg-highlight/20 px-3 py-1 rounded-full">
                                                    <svg className="w-5 h-5 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="font-bold text-gray-900">{review.rating}</span>
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Columna Derecha - Card de Reserva */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                                {/* Precio destacado */}
                                <div className="mb-6 p-6 bg-linear-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                                    <p className="text-sm text-gray-600 mb-1">Precio por hora</p>
                                    <p className="text-4xl font-bold text-primary">
                                        {space.price.format()}
                                    </p>
                                </div>

                                {/* Características rápidas */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-700">Reserva instantánea</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span className="text-sm text-gray-700">Pago seguro</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-700">Soporte 24/7</span>
                                    </div>
                                </div>

                                {/* Botón de acción */}
                                {!isOwner ? (
                                    <Link
                                        to={`/rental/${space.id}`}
                                        className="w-full block text-center px-6 py-4 bg-linear-to-r from-secondary to-primary text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        Reservar Ahora
                                    </Link>
                                ) : (
                                    <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl text-center">
                                        <svg className="w-12 h-12 mx-auto mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <p className="text-sm font-semibold text-primary">Este es tu espacio</p>
                                        <p className="text-xs text-gray-600 mt-1">No puedes reservar tu propio espacio</p>
                                    </div>
                                )}

                                {/* Información adicional */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 text-center">
                                        Al reservar, aceptas los términos y condiciones de MeXpace
                                    </p>
                                </div>
                            </div>

                            {/* Card de contacto */}
                            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    ¿Tienes dudas?
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Contacta al propietario o nuestro equipo de soporte para resolver cualquier pregunta.
                                </p>
                                <button className="w-full px-4 py-2 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200 font-semibold">
                                    Contactar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de imagen ampliada */}
            {showImageModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setShowImageModal(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setShowImageModal(false)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={space.images[currentImage]}
                        alt={space.title}
                        className="max-w-full max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold">
                        {currentImage + 1} / {space.images.length}
                    </div>
                </div>
            )}
        </div>
    );
};
