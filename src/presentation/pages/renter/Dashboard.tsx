import React, { useEffect, useState } from "react";
import { SpaceCard } from "../../components/cards/SpaceCard";
import { ListSpacesUseCase } from "../../../application/usecases/spaces/ListSpacesUseCase";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";

const spaceRepo = new LocalStorageSpaceRepository();
const listSpacesUC = new ListSpacesUseCase(spaceRepo);

export const RenterDashboard: React.FC = () => {
    const [spaces, setSpaces] = useState<any[]>([]);

    const loadSpaces = async () => {
        const all = await listSpacesUC.execute();
        setSpaces(all);
    };

    useEffect(() => { loadSpaces(); }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">Espacios disponibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spaces.map((s) => <SpaceCard key={s.id} space={s} />)}
                </div>
            </main>
        </div>
    );
};
