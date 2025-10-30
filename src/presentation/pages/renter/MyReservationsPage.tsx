import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { LocalStorageRentalRepository } from "../../../infrastructure/repositories/LocalStorageRentalRepository";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Rental } from "../../../core/entities/Rental";
import { Space } from "../../../core/entities/Space";
import { formatDateTime } from "../../../application/utils/FormatDateTime";
import { ReviewService } from "../../../application/services/ReviewService";

type FilterType = "upcoming" | "active" | "past";

export const MyReservationsPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType>("upcoming");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const rentalRepo = useMemo(() => new LocalStorageRentalRepository(), []);
  const spaceRepo = useMemo(() => new LocalStorageSpaceRepository(), []);
  const reviewService = useMemo(() => new ReviewService(), []);

  const fetchRentals = useCallback(async () => {
    const all = await rentalRepo.getAll();
    const userRentals = all.filter(
      r => r.renterId === currentUser.id || r.ownerId === currentUser.id
    );
    setRentals(userRentals);
  }, [currentUser.id, rentalRepo]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const filteredRentals = useMemo(() => {
    const now = new Date();
    return rentals.filter(rental => {
      const startDate = new Date(rental.dateRange.start);
      const endDate = new Date(rental.dateRange.end);
      
      if (filter === "upcoming") return startDate > now;
      if (filter === "active") return startDate <= now && endDate >= now;
      if (filter === "past") return endDate < now;
      return false;
    });
  }, [rentals, filter]);

  const stats = {
    total: rentals.length,
    upcoming: rentals.filter(r => new Date(r.dateRange.start) > new Date()).length,
    active: rentals.filter(r => {
      const now = new Date();
      return new Date(r.dateRange.start) <= now && new Date(r.dateRange.end) >= now;
    }).length,
    past: rentals.filter(r => new Date(r.dateRange.end) < new Date()).length,
  };

  const openModal = async (rental: Rental) => {
    setSelectedRental(rental);
    const space = await spaceRepo.getById(rental.spaceId);
    setSelectedSpace(space);
    setCurrentImageIndex(0);

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
    setCurrentImageIndex(0);
  };

  const handleSubmitReview = async () => {
    if (!selectedRental || rating === 0) {
      alert("Por favor selecciona una calificación");
      return;
    }
    await reviewService.createReview({
      reviewerId: currentUser.id,
      reviewedUserId: selectedRental.ownerId,
      rating,
      comment,
    });
    alert("¡Tu calificación ha sido guardada!");
    closeModal();
  };

  const getStatusInfo = (rental: Rental) => {
    const now = new Date();
    const startDate = new Date(rental.dateRange.start);
    const endDate = new Date(rental.dateRange.end);

    if (now < startDate) {
      return { 
        status: "upcoming", 
        label: "Próxima", 
        color: "bg-blue-100 text-blue-800",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      };
    } else if (now > endDate) {
      return { 
        status: "past", 
        label: "Completada", 
        color: "bg-gray-100 text-gray-800",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      };
    } else {
      return { 
        status: "active", 
        label: "En curso", 
        color: "bg-green-100 text-green-800",
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header - Professional */}
      <div className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Mis Reservas
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {stats.total} reserva{stats.total !== 1 ? 's' : ''} en total
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Explorar</span>
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 border-b border-gray-200 -mb-px">
            <button
              onClick={() => setFilter("upcoming")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium text-sm transition-all relative ${
                filter === "upcoming"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Próximas
              {stats.upcoming > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  filter === "upcoming" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                }`}>
                  {stats.upcoming}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium text-sm transition-all relative ${
                filter === "active"
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Activas
              {stats.active > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  filter === "active" ? "bg-secondary/10 text-secondary" : "bg-gray-100 text-gray-600"
                }`}>
                  {stats.active}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 font-medium text-sm transition-all relative ${
                filter === "past"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pasadas
              {stats.past > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  filter === "past" ? "bg-gray-200 text-gray-900" : "bg-gray-100 text-gray-600"
                }`}>
                  {stats.past}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Reservations List */}
        {filteredRentals.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {filter === "upcoming" && "No tienes reservas próximas"}
              {filter === "active" && "No tienes reservas activas"}
              {filter === "past" && "No tienes reservas pasadas"}
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              {filter === "upcoming" && "Las reservas futuras aparecerán aquí"}
              {filter === "active" && "Tus reservas en curso aparecerán aquí"}
              {filter === "past" && "Tu historial de reservas aparecerá aquí"}
            </p>
            {filter === "upcoming" && (
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explorar espacios
              </Link>
            )}
          </div>
        ) : (
          /* Reservations Cards - Compact Mobile Design */
          <div className="space-y-3">
            {filteredRentals.map(rental => {
              const statusInfo = getStatusInfo(rental);
              return (
                <div
                  key={rental.id}
                  onClick={() => openModal(rental)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200"
                >
                  <div className="p-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">${rental.totalCost}</p>
                        <p className="text-xs text-gray-500">MXN</p>
                      </div>
                    </div>
                    
                    {/* Dates Row - Compact */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium mr-2">Inicio:</span>
                        <span className="text-gray-600">{formatDateTime(new Date(rental.dateRange.start))}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium mr-2">Fin:</span>
                        <span className="text-gray-600">{formatDateTime(new Date(rental.dateRange.end))}</span>
                      </div>
                    </div>

                    {/* Footer - View Details */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        ID: {rental.spaceId.slice(0, 12)}
                      </span>
                      <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Ver detalles
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="h-8"></div>

      {/* Modal */}
      {isModalOpen && selectedRental && selectedSpace && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="flex items-center justify-center min-h-screen px-4">

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Gallery */}
              <div className="relative h-80 bg-gray-200">
                <img
                  src={selectedSpace.images[currentImageIndex] || "/placeholder.jpg"}
                  alt={selectedSpace.title}
                  className="w-full h-full object-cover"
                />
                {selectedSpace.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === 0 ? selectedSpace.images.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === selectedSpace.images.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedSpace.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-8">
                <Dialog.Title className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedSpace.title}
                </Dialog.Title>

                {/* Space Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Descripción</p>
                        <p className="text-gray-900">{selectedSpace.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Ubicación</p>
                        <p className="text-gray-900">{selectedSpace.location.toString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Tipo</p>
                        <p className="text-gray-900">{selectedSpace.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Precio por hora</p>
                        <p className="text-gray-900 font-semibold">{selectedSpace.price.format()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Check-in</p>
                        <p className="text-gray-900">{formatDateTime(new Date(selectedRental.dateRange.start))}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Check-out</p>
                        <p className="text-gray-900">{formatDateTime(new Date(selectedRental.dateRange.end))}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Total Pagado</span>
                    <span className="text-3xl font-bold text-primary">${selectedRental.totalCost} MXN</span>
                  </div>
                </div>

                {/* Review Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Califica al propietario</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-10 h-10 ${
                            star <= (hoveredStar || rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-gray-600 font-medium">
                        {rating === 1 && "Muy malo"}
                        {rating === 2 && "Malo"}
                        {rating === 3 && "Regular"}
                        {rating === 4 && "Bueno"}
                        {rating === 5 && "Excelente"}
                      </span>
                    )}
                  </div>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Comparte tu experiencia (opcional)"
                    rows={4}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                  <button
                    onClick={handleSubmitReview}
                    disabled={rating === 0}
                    className="mt-4 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Guardar calificación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
