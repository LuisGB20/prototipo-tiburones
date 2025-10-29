import React, { useState } from "react";
import { clearSeedData, getSeedFromLocalStorage, seedLocalStorage } from "../../../infrastructure/seeds/SeedData";

export const DebugPage: React.FC = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState<{
        users?: unknown[];
        spaces?: unknown[];
        rentals?: unknown[];
        reviews?: unknown[];
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSeed = () => {
        setLoading(true);
        setTimeout(() => {
            const result = seedLocalStorage({ force: true });
            setMessage(result.message);
            setData(result);
            setLoading(false);
        }, 500);
    };

    const handleClear = () => {
        setLoading(true);
        setTimeout(() => {
            const result = clearSeedData();
            setMessage(result.message);
            setData(null);
            setLoading(false);
        }, 300);
    };

    const handleView = () => {
        setLoading(true);
        setTimeout(() => {
            const result = getSeedFromLocalStorage();
            console.log("Datos actuales en LocalStorage:", result);
            setMessage("Datos cargados correctamente. Revisa la consola para más detalles.");
            setData(result);
            setLoading(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Panel de Desarrollo
                    </h1>
                    <p className="text-gray-600">
                        Gestión de datos de prueba para LocalStorage. Utiliza esta herramienta para sembrar, visualizar y limpiar datos de desarrollo.
                    </p>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <button
                            onClick={handleSeed}
                            disabled={loading}
                            className="flex flex-col items-center gap-3 p-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div className="text-center">
                                <div className="font-bold text-lg">Sembrar Datos</div>
                                <div className="text-sm text-white/80">Cargar datos de prueba</div>
                            </div>
                        </button>

                        <button
                            onClick={handleView}
                            disabled={loading}
                            className="flex flex-col items-center gap-3 p-6 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <div className="text-center">
                                <div className="font-bold text-lg">Ver Datos</div>
                                <div className="text-sm text-white/80">Visualizar almacenados</div>
                            </div>
                        </button>

                        <button
                            onClick={handleClear}
                            disabled={loading}
                            className="flex flex-col items-center gap-3 p-6 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <div className="text-center">
                                <div className="font-bold text-lg">Limpiar Datos</div>
                                <div className="text-sm text-white/80">Eliminar todos los datos</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div className={`rounded-lg p-4 mb-6 ${
                        message.includes("correctamente") || message.includes("cargados")
                            ? "bg-green-50 border border-green-200 text-green-800"
                            : message.includes("eliminados")
                            ? "bg-red-50 border border-red-200 text-red-800"
                            : "bg-blue-50 border border-blue-200 text-blue-800"
                    }`}>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{message}</span>
                        </div>
                    </div>
                )}

                {/* Data Summary */}
                {data && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                                <div className="text-sm text-gray-600 mb-1">Usuarios</div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {data.users?.length || 0}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
                                <div className="text-sm text-gray-600 mb-1">Espacios</div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {data.spaces?.length || 0}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-highlight">
                                <div className="text-sm text-gray-600 mb-1">Rentas</div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {data.rentals?.length || 0}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
                                <div className="text-sm text-gray-600 mb-1">Reviews</div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {data.reviews?.length || 0}
                                </div>
                            </div>
                        </div>

                        {/* JSON Data */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                                <h3 className="font-bold">Datos Completos (JSON)</h3>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                                        setMessage("JSON copiado al portapapeles");
                                    }}
                                    className="text-sm px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
                                >
                                    Copiar JSON
                                </button>
                            </div>
                            <div className="p-6 overflow-auto max-h-[600px] bg-gray-50">
                                <pre className="text-xs text-gray-800 font-mono">
                                    {JSON.stringify(data, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Procesando...</p>
                    </div>
                )}

                {/* Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Información de los datos
                    </h3>
                    <ul className="text-blue-800 text-sm space-y-2">
                        <li>• <strong>Usuarios:</strong> 5 propietarios y 4 rentadores con perfiles completos</li>
                        <li>• <strong>Espacios:</strong> 15 espacios variados (cocheras, salones, oficinas, estudios, paredes publicitarias)</li>
                        <li>• <strong>Ubicaciones:</strong> Diferentes zonas de Cancún (Centro, Zona Hotelera, diversas Supermanzanas)</li>
                        <li>• <strong>Precios:</strong> Rango desde $80 hasta $2,500 MXN por hora</li>
                        <li>• <strong>Rentas:</strong> 9 rentas (pasadas, actuales y futuras)</li>
                        <li>• <strong>Reviews:</strong> 6 reseñas completas con comentarios detallados</li>
                        <li>• <strong>Imágenes:</strong> URLs reales de Unsplash para visualización profesional</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};