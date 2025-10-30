import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpaceForm } from "../../components/forms/SpaceForm";
import { CreateSpaceUseCase } from "../../../application/usecases/spaces/CreateSpaceUseCase";
import { LocalStorageSpaceRepository } from "../../../infrastructure/repositories/LocalStorageSpaceRepository";
import { SpaceType } from "../../../core/entities/Space";

export const AddSpacePage: React.FC = () => {
    const navigate = useNavigate();
    const spaceRepo = new LocalStorageSpaceRepository();
    const createSpaceUC = new CreateSpaceUseCase(spaceRepo);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (data: Record<string, unknown>) => {
        setIsSubmitting(true);
        try {
            await createSpaceUC.execute({ 
                title: data.title as string,
                description: data.description as string,
                type: data.type as SpaceType,
                city: (data.location as Record<string, string>).city,
                address: (data.location as Record<string, string>).address,
                price: (data.price as Record<string, number>).amount,
                ownerId: currentUser.id,
                images: data.images as string[]
            });
            setShowSuccess(true);
            
            // Animación de éxito antes de redirigir
            setTimeout(() => {
                navigate("/my-spaces");
            }, 2000);
        } catch (error) {
            console.error("Error al crear espacio:", error);
            setIsSubmitting(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        ¡Espacio Publicado!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Tu espacio ha sido agregado exitosamente y ya está disponible para rentar.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Redirigiendo a Mis Espacios...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header con Breadcrumb */}
                <div className="mb-8">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        <button
                            onClick={() => navigate("/my-spaces")}
                            className="hover:text-primary transition-colors"
                        >
                            Mis Espacios
                        </button>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-primary font-semibold">Nuevo Espacio</span>
                    </nav>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Publica tu Espacio
                            </h1>
                            <p className="text-gray-600">
                                Completa la información para que los usuarios puedan encontrar y rentar tu espacio
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/my-spaces")}
                            className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>

                {/* Content con 2 columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna Izquierda - Formulario */}
                    <div className="lg:col-span-2">
                        <SpaceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                    </div>

                    {/* Columna Derecha - Tips y Preview */}
                    <div className="space-y-6">
                        {/* Tips Card */}
                        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-6 text-white">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold">Consejos para tu publicación</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-white/90">
                                <li className="flex items-start space-x-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Usa un título claro y descriptivo</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Agrega al menos 3 fotos de buena calidad</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Describe las características principales</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Define un precio competitivo</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Incluye la ubicación exacta</span>
                                </li>
                            </ul>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Estadísticas de MeXpace
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Espacios activos</span>
                                    <span className="text-2xl font-bold text-primary">500+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Usuarios registrados</span>
                                    <span className="text-2xl font-bold text-secondary">1000+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Rentas exitosas</span>
                                    <span className="text-2xl font-bold text-accent">2500+</span>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        ¿Necesitas ayuda?
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Consulta nuestra guía o contacta a soporte
                                    </p>
                                    <a
                                        href="#"
                                        className="text-sm text-primary hover:text-secondary font-semibold transition-colors"
                                    >
                                        Ver guía completa →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
