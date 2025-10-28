import React, { useEffect, useState } from "react";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { Space } from "../../../core/entities/Space";
import { SpaceCard } from "../../components/cards/SpaceCard";

export const SpacesPage: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);

    useEffect(() => {
        const repo = new LocalStorageSpaceRepository();
        repo.getAll().then(setSpaces);
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
            {spaces.map(space => <SpaceCard key={space.id} space={space} />)}
        </div>
    );
};
