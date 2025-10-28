import React, { useState } from "react";
import { clearSeedData, getSeedFromLocalStorage, seedLocalStorage } from "../../../infrastructure/seeds/SeedData";


export const DebugPage: React.FC = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState<any>(null);

    const handleSeed = () => {
        const result = seedLocalStorage({ force: true });
        setMessage(result.message);
        setData(result);
    };

    const handleClear = () => {
        const result = clearSeedData();
        setMessage(result.message);
        setData(null);
    };

    const handleView = () => {
        const result = getSeedFromLocalStorage();
        console.log("Datos actuales en LocalStorage:", result);
        setMessage("Revisa la consola para ver los datos actuales.");
        setData(result);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-8 flex justify-center items-start">
                <div className="p-6 border rounded shadow bg-gray-100 space-y-4">
                    <h2 className="text-xl font-bold">Panel de Debug / Seeder</h2>
                    <div className="flex space-x-2">
                        <button onClick={handleSeed} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sembrar datos</button>
                        <button onClick={handleView} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ver datos</button>
                        <button onClick={handleClear} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Limpiar datos</button>
                    </div>

                    {message && <p className="text-gray-800 font-medium">{message}</p>}

                    {data && (
                        <div className="overflow-auto max-h-96 mt-4 border p-2 bg-white rounded">
                            <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )

};