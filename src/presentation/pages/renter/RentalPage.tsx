import React, { useEffect, useState } from "react";
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

    const spaceRepo = new LocalStorageSpaceRepository();
    const rentalRepo = new LocalStorageRentalRepository();

    useEffect(() => {
        const fetchSpace = async () => {
            const s = await spaceRepo.getById(id!);
            setSpace(s);
        };
        fetchSpace();
    }, [id]);

    if (!space) return <p className="text-center mt-20">Espacio no encontrado...</p>;

    const handleRentalSubmit = async (data: { spaceId: string; startDate: string; endDate: string }) => {
        if (!space) return;


        const parseLocalDateTime = (str: string) => {
            // str viene de datetime-local: "2025-10-28T14:00"
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

        // Crear rental
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const rental = new Rental({
            id: crypto.randomUUID(),
            spaceId: data.spaceId,
            renterId: currentUser.id,
            ownerId: space.ownerId, // asegúrate de pasar ownerId
            dateRange: range,
            totalCost: 0 // o calcular según duración
        });

        rentalRepo.create(rental);
        alert(`¡Reserva confirmada para ${space.title} desde ${data.startDate} hasta ${data.endDate}!`);
        navigate("/"); // redirige a landing o listado
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="h-64 w-full overflow-hidden">
                    <img src={space.images[0] || "/placeholder.jpg"} alt={space.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-3">{space.title}</h1>
                        <p className="text-gray-700 mb-2">{space.description}</p>
                        <p className="text-gray-500 mb-2">Ubicación: {space.location.toString()}</p>
                        <p className="text-gray-500 mb-2">Tipo: {space.type}</p>
                        <p className="text-secondary font-semibold text-2xl mt-2">{space.price.format()}</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-inner">
                        <h2 className="text-2xl font-bold mb-4">Reserva tu espacio</h2>
                        <RentalForm onSubmit={handleRentalSubmit} spaceId={space.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};
