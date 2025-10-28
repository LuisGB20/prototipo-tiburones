import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { LocalStorageRentalRepository } from "../../../infrastructure/repositories/LocalStorageRentalRepository";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Rental } from "../../../core/entities/Rental";
import { Space } from "../../../core/entities/Space";
import { formatDateTime } from "../../../application/utils/FormatDateTime";
import { ReviewService } from "../../../application/services/ReviewService";

export const MyReservationsPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const rentalRepo = new LocalStorageRentalRepository();
  const spaceRepo = new LocalStorageSpaceRepository();
  const reviewService = new ReviewService();

  useEffect(() => {
    const fetchRentals = async () => {
      const all = await rentalRepo.getAll();
      const userRentals = all.filter(
        r => r.renterId === currentUser.id || r.ownerId === currentUser.id
      );
      setRentals(userRentals);
    };
    fetchRentals();
  }, [currentUser.id]);

  const openModal = async (rental: Rental) => {
    setSelectedRental(rental);
    const space = await spaceRepo.getById(rental.spaceId);
    setSelectedSpace(space);

    // Cargar calificación existente
    const reviews = await reviewService.getReviewsForUser(rental.ownerId);
    const myReview = reviews.find(r => r.reviewerId === currentUser.id);
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment);
    } else {
      setRating(0);
      setComment("");
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRental(null);
    setSelectedSpace(null);
    setRating(0);
    setComment("");
    setIsModalOpen(false);
  };

  const handleSubmitReview = async () => {
    if (!selectedRental) return;
    await reviewService.createReview({
      reviewerId: currentUser.id,
      reviewedUserId: selectedRental.ownerId,
      rating,
      comment,
    });
    alert("¡Tu calificación ha sido guardada!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mis reservas</h1>

      {rentals.length === 0 ? (
        <p>No tienes reservas activas.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {rentals.map(r => (
            <li
              key={r.id}
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50 transition"
              onClick={() => openModal(r)}
            >
              <strong>Espacio ID:</strong> {r.spaceId} <br />
              <strong>Fechas:</strong>{" "}
              {formatDateTime(new Date(r.dateRange.start))} -{" "}
              {formatDateTime(new Date(r.dateRange.end))} <br />
              <strong>Total:</strong> {r.totalCost}
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && selectedRental && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <Dialog.Panel className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
            <Dialog.Title className="text-xl font-bold mb-4">Detalles de la Reserva</Dialog.Title>
            {selectedSpace && (
              <>
                <img
                  src={selectedSpace.images[0] || "/placeholder.jpg"}
                  alt={selectedSpace.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <p><strong>Título:</strong> {selectedSpace.title}</p>
                <p><strong>Descripción:</strong> {selectedSpace.description}</p>
                <p><strong>Ubicación:</strong> {selectedSpace.location.toString()}</p>
                <p><strong>Tipo:</strong> {selectedSpace.type}</p>
                <p><strong>Precio:</strong> {selectedSpace.price.format()}</p>
              </>
            )}
            <hr className="my-4" />
            <p><strong>Fechas reservadas:</strong>{" "}
              {formatDateTime(new Date(selectedRental.dateRange.start))} - {formatDateTime(new Date(selectedRental.dateRange.end))}
            </p>
            <p><strong>Total:</strong> {selectedRental.totalCost}</p>

            {/* Sección de calificación */}
            <hr className="my-4" />
            <div>
              <strong>Califica al propietario:</strong>
              <div className="flex gap-2 mt-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full mt-2 p-2 border rounded"
                placeholder="Comentario (opcional)"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button
                onClick={handleSubmitReview}
                className="mt-2 w-full bg-secondary text-white py-2 rounded-lg hover:bg-accent transition"
              >
                Guardar calificación
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cerrar
            </button>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
};
