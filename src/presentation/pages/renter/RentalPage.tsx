import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { LocalStorageRentalRepository } from "../../../infrastructure/repositories/LocalStorageRentalRepository";
import { Space } from "../../../core/entities/Space";
import { Rental } from "../../../core/entities/Rental";
import { DateRange } from "../../../core/valueObjects/DateRange";
import { RentalForm } from "../../components/forms/RentalForm";

export const SpaceRentalPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [space, setSpace] = useState<Space | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const spaceRepo = useMemo(() => new LocalStorageSpaceRepository(), []);
    const rentalRepo = useMemo(() => new LocalStorageRentalRepository(), []);

    useEffect(() => {
        const fetchSpace = async () => {
            const s = await spaceRepo.getById(id!);
            setSpace(s);
        };
        fetchSpace();
    }, [id, spaceRepo]);

    if (!space) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando espacio...</p>
                </div>
            </div>
        );
    }

    const handleRentalSubmit = async (data: { spaceId: string; startDate: string; endDate: string }) => {
        if (!space) return;

        const parseLocalDateTime = (str: string) => {
            const [datePart, timePart] = str.split("T");
            const [year, month, day] = datePart.split("-").map(Number);
            const [hour, minute] = timePart.split(":").map(Number);
            return new Date(year, month - 1, day, hour, minute);
        };
        const start = parseLocalDateTime(data.startDate);
        const end = parseLocalDateTime(data.endDate);

        if (start >= end) {
            alert("La fecha de inicio debe ser anterior a la fecha de fin");
            return;
        }

        const range = new DateRange(start, end);
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

        const rental = new Rental({
            id: crypto.randomUUID(),
            spaceId: data.spaceId,
            renterId: currentUser.id,
            ownerId: space.ownerId,
            dateRange: range,
            totalCost: 0
        });

        await rentalRepo.create(rental);
        
        setTimeout(() => {
            alert(`¡Reserva confirmada para ${space.title}!`);
            navigate("/my-reservations");
        }, 500);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <a href="/" className="text-gray-600 hover:text-primary transition">Inicio</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <a href="/spaces" className="text-gray-600 hover:text-primary transition">Espacios</a>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium">{space.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Space Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="relative h-96 bg-gray-200">
                                <img
                                    src={space.images[currentImageIndex] || "/placeholder.jpg"}
                                    alt={space.title}
                                    className="w-full h-full object-cover"
                                />
                                {space.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setCurrentImageIndex((prev) =>
                                                    prev === 0 ? space.images.length - 1 : prev - 1
                                                )
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentImageIndex((prev) =>
                                                    prev === space.images.length - 1 ? 0 : prev + 1
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {space.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${
                                                        idx === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                                {space.available && (
                                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                                        Disponible
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {space.images.length > 1 && (
                                <div className="p-4 grid grid-cols-4 gap-2">
                                    {space.images.slice(0, 4).map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                idx === currentImageIndex
                                                    ? "border-primary shadow-lg scale-105"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                            {space.images.length > 4 && idx === 3 && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                                                    +{space.images.length - 4}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Space Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{space.title}</h1>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <span>{space.location.city}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            <span>{space.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600 text-sm">Desde</p>
                                    <p className="text-4xl font-bold text-primary">{space.price.format()}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                                <p className="text-gray-700 leading-relaxed">{space.description}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-600">Ciudad</p>
                                            <p className="text-gray-900 font-medium">{space.location.city}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-600">Dirección</p>
                                            <p className="text-gray-900 font-medium">{space.location.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="mt-6 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        <p className="text-gray-500">Mapa interactivo (próximamente)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span className="text-gray-900 font-medium">Seguro</span>
                                    </div>
                                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-900 font-medium">Verificado</span>
                                    </div>
                                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-900 font-medium">24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reserva tu espacio</h2>
                                    <p className="text-gray-600 text-sm">Selecciona las fechas de tu reserva</p>
                                </div>

                                <RentalForm onSubmit={handleRentalSubmit} spaceId={space.id} />

                                {/* Trust Badges */}
                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Cancelación flexible</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Confirmación instantánea</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Soporte 24/7</span>
                                    </div>
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="mt-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shrink-0">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">¿Necesitas ayuda?</h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Nuestro equipo está listo para asistirte con cualquier duda
                                        </p>
                                        <button className="text-primary font-semibold text-sm hover:underline">
                                            Contactar soporte →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
