import { useEffect, useState } from "react";
import { SpaceForm } from "../../components/forms/SpaceForm";
import { SpaceCard } from "../../components/cards/SpaceCard";
import { ListSpacesUseCase } from "../../../application/usecases/spaces/ListSpacesUseCase";
import { CreateSpaceUseCase } from "../../../application/usecases/spaces/CreateSpaceUseCase";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository"; 

const spaceRepo = new LocalStorageSpaceRepository();
const listSpacesUC = new ListSpacesUseCase(spaceRepo);
const createSpaceUC = new CreateSpaceUseCase(spaceRepo);

export const OwnerDashboard: React.FC = () => {
    const [spaces, setSpaces] = useState<any[]>([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const loadSpaces = async () => {
        const all = await listSpacesUC.execute();
        setSpaces(all);
    };

    useEffect(() => { loadSpaces(); }, []);

    const handleCreate = async (data: any) => {
        await createSpaceUC.execute({ ...data, ownerId: currentUser.id });
        loadSpaces();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">Tus Espacios</h2>
                <SpaceForm onSubmit={handleCreate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {spaces.map((s) => <SpaceCard key={s.id} space={s} />)}
                </div>
            </main>
        </div>
    );
};
