import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space } from "../../../core/entities/Space";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { ReviewService } from "../../../application/services/ReviewService";
import { Review } from "../../../core/entities/Review";

export const SpaceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [space, setSpace] = useState<Space | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isOwner, setIsOwner] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const reviewService = new ReviewService();

    useEffect(() => {
        const fetchSpace = async () => {
            const repo = new LocalStorageSpaceRepository();
            const s = await repo.getById(id!);
            setSpace(s);
            if (s) {
                if (s.ownerId === currentUser.id) {
                    setIsOwner(true);
                    const ownerReviews = await reviewService.getReviewsForUser(s.ownerId);
                    setReviews(ownerReviews);
                }
            }
        };
        fetchSpace();
    }, [id, currentUser.id]);

    if (!space) return <p className="text-center mt-20">Espacio no encontrado...</p>;

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % space.images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + space.images.length) % space.images.length);

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Carousel de imágenes */}
            <div className="relative w-full h-96 mb-6 rounded-xl overflow-hidden shadow-lg">
                {space.images.length > 0 ? (
                    <img
                        src={space.images[currentImage]}
                        alt={`${space.title} - ${currentImage}`}
                        className="w-full h-full object-cover transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">No hay imágenes</div>
                )}

                {/* Botones de navegación */}
                {space.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-3 py-1 rounded hover:bg-opacity-50 transition"
                        >
                            ◀
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-3 py-1 rounded hover:bg-opacity-50 transition"
                        >
                            ▶
                        </button>
                    </>
                )}
            </div>

            {/* Información del espacio */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{space.title}</h1>
                <p className="text-gray-600">{space.description}</p>
                <p className="text-gray-500">Ubicación: {space.location.toString()}</p>
                <p className="text-gray-500">Tipo de espacio: {space.type}</p>
                <p className="text-secondary text-2xl font-semibold">Precio: {space.price.format()}</p>

                {/* Botón de reserva solo si NO es propietario */}
                {!isOwner && (
                    <a
                        href={`/rental/${space.id}`}
                        className="bg-secondary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                    >
                        Reservar este espacio
                    </a>
                )}

                {/* Mostrar reviews si es propietario */}
                {isOwner && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Comentarios de usuarios</h2>
                        {reviews.length === 0 ? (
                            <p>No hay comentarios aún.</p>
                        ) : (
                            <ul className="space-y-4">
                                {reviews.map(r => (
                                    <li key={r.id} className="p-4 border rounded shadow">
                                        <p><strong>Usuario:</strong> {r.reviewerId}</p>
                                        <p><strong>Calificación:</strong> {r.rating} ★</p>
                                        {r.comment && <p><strong>Comentario:</strong> {r.comment}</p>}
                                        <p className="text-gray-400 text-sm">{r.date.toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
