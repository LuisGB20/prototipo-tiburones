import { useState } from "react";

interface Props {
    onSubmit: (data: { spaceId: string; startDate: string; endDate: string }) => void;
    spaceId: string;
}

export const RentalForm: React.FC<Props> = ({ onSubmit, spaceId }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ spaceId, startDate, endDate });
        setStartDate("");
        setEndDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col">
                <label htmlFor="startDate" className="mb-1 font-semibold text-grayDark">
                    Fecha de inicio
                </label>
                <input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="endDate" className="mb-1 font-semibold text-grayDark">
                    Fecha de fin
                </label>
                <input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-secondary hover:bg-accent text-white font-semibold py-3 rounded-lg shadow transition-colors"
            >
                Alquilar
            </button>
        </form>
    );
};
