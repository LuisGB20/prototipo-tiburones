import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Space } from "../../../core/entities/Space";
import { SpaceCard } from "../../components/cards/SpaceCard";
import { Dialog } from "@headlessui/react";
import { SpaceForm } from "../../components/forms/SpaceForm";

export const MySpacesPage: React.FC = () => {
    const navigate = useNavigate();
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [currentUser] = useState(JSON.parse(localStorage.getItem("currentUser") || "{}"));
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    const repo = new LocalStorageSpaceRepository();

    const fetchSpaces = () => {
        repo.getAll().then(all => setSpaces(all.filter(s => s.ownerId === currentUser.id)));
    };

    useEffect(() => { fetchSpaces(); }, []);

    const handleDelete = async (space: Space) => {
        if (!confirm(`¿Seguro que deseas eliminar "${space.title}"?`)) return;
        await repo.delete(space.id);
        fetchSpaces();
    };

    const handleEdit = (space: Space) => {
        setSelectedSpace(space);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (updatedData: any) => {
        if (!selectedSpace) return;
        const updatedSpace = { ...selectedSpace, ...updatedData };
        await repo.update(updatedSpace);
        setIsModalOpen(false);
        setSelectedSpace(null);
        fetchSpaces();
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mis Espacios</h1>
                <button
                    onClick={() => navigate("/spaces/new")}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-accent transition"
                >
                    Agregar Nuevo
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {spaces.map(space => (
                    <div key={space.id} className="relative">
                        <SpaceCard space={space} />
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                onClick={() => handleEdit(space)}
                                className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 text-white text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(space)}
                                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white text-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal edición */}
            {isModalOpen && selectedSpace && (
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <Dialog.Title className="text-xl font-bold mb-4">Editar Espacio</Dialog.Title>
                        <SpaceForm onSubmit={handleModalSubmit} initialData={selectedSpace} />
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    );
};
