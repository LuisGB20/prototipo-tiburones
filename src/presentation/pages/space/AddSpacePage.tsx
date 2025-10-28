import React from "react";
import { useNavigate } from "react-router-dom";
import { SpaceForm } from "../../components/forms/SpaceForm";
import { CreateSpaceUseCase } from "../../../application/usecases/spaces/CreateSpaceUseCase";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";

export const AddSpacePage: React.FC = () => {
    const navigate = useNavigate();
    const spaceRepo = new LocalStorageSpaceRepository();
    const createSpaceUC = new CreateSpaceUseCase(spaceRepo);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const handleSubmit = async (data: any) => {
        console.log(data)
        await createSpaceUC.execute({ ...data, ownerId: currentUser.id });
        alert("¡Espacio agregado!");
        navigate("/my-spaces");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Espacio</h1>
            <SpaceForm onSubmit={handleSubmit} />
        </div>
    );
};
