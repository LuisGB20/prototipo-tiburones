import React, { useState, useEffect } from "react";
import { SpaceType } from "../../../core/entities/Space";

interface Props {
    onSubmit: (data: Record<string, unknown>) => void;
    initialData?: Record<string, unknown>;
    isSubmitting?: boolean;
}

export const SpaceForm: React.FC<Props> = ({ onSubmit, initialData, isSubmitting = false }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [title, setTitle] = useState((initialData?.title as string) || "");
    const [description, setDescription] = useState((initialData?.description as string) || "");
    const [type, setType] = useState<SpaceType>((initialData?.type as SpaceType) || SpaceType.OTHER);
    const [city, setCity] = useState(((initialData?.location as Record<string, string>)?.city) || "");
    const [address, setAddress] = useState(((initialData?.location as Record<string, string>)?.address) || "");
    const [price, setPrice] = useState(((initialData?.price as Record<string, number>)?.amount) || 0);
    const [images, setImages] = useState<string[]>((initialData?.images as string[]) || []);
    const [newImage, setNewImage] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setTitle((initialData.title as string) || "");
            setDescription((initialData.description as string) || "");
            setType((initialData.type as SpaceType) || SpaceType.OTHER);
            setCity(((initialData.location as Record<string, string>)?.city) || "");
            setAddress(((initialData.location as Record<string, string>)?.address) || "");
            setPrice(((initialData.price as Record<string, number>)?.amount) || 0);
            setImages((initialData.images as string[]) || []);
            setNewImage("");
        }
    }, [initialData]);

    const addImage = () => {
        if (newImage.trim() !== "") {
            setImages([...images, newImage.trim()]);
            setNewImage("");
        }
    };

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!title.trim()) newErrors.title = "El título es obligatorio";
            if (!description.trim()) newErrors.description = "La descripción es obligatoria";
            if (!type) newErrors.type = "Selecciona un tipo de espacio";
        } else if (step === 2) {
            if (!city.trim()) newErrors.city = "La ciudad es obligatoria";
            if (!address.trim()) newErrors.address = "La dirección es obligatoria";
            if (price <= 0) newErrors.price = "El precio debe ser mayor a 0";
        } else if (step === 3) {
            if (images.length === 0) newErrors.images = "Agrega al menos una imagen";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            onSubmit({
                title,
                description,
                type,
                location: { city, address },
                price: { amount: price, currency: "MXN" },
                images
            });

            if (!initialData) {
                setTitle("");
                setDescription("");
                setCity("");
                setAddress("");
                setPrice(0);
                setImages([]);
                setNewImage("");
                setCurrentStep(1);
            }
        }
    };

    const getSpaceTypeLabel = (type: SpaceType) => {
        const labels: Record<SpaceType, string> = {
            [SpaceType.WALL]: "Pared",
            [SpaceType.GARAGE]: "Cochera",
            [SpaceType.ROOM]: "Habitación",
            [SpaceType.HALL]: "Salón",
            [SpaceType.STUDIO]: "Estudio",
            [SpaceType.OFFICE]: "Oficina",
            [SpaceType.WAREHOUSE]: "Bodega",
            [SpaceType.TERRACE]: "Terraza",
            [SpaceType.ROOFTOP]: "Azotea",
            [SpaceType.GARDEN]: "Jardín",
            [SpaceType.PARKING_SPOT]: "Estacionamiento",
            [SpaceType.SHOP]: "Local",
            [SpaceType.EVENT_SPACE]: "Eventos",
            [SpaceType.ADVERTISEMENT_SPOT]: "Publicidad",
            [SpaceType.OTHER]: "Otro"
        };
        return labels[type.toUpperCase() as SpaceType] || type;
    };

    const steps = [
        { number: 1, title: "Información Básica", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { number: 2, title: "Ubicación y Precio", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
        { number: 3, title: "Imágenes", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    ];

    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Progress Bar */}
            {!initialData && (
                <div className="px-6 pt-6">
                    <div className="flex items-center justify-between mb-6">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep >= step.number
                                            ? "bg-linear-to-br from-primary to-secondary text-white shadow-lg scale-110"
                                            : "bg-gray-200 text-gray-600"
                                        }`}>
                                        {currentStep > step.number ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            step.number
                                        )}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium hidden sm:block ${currentStep >= step.number ? "text-primary" : "text-gray-500"
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${currentStep > step.number ? "bg-linear-to-r from-primary to-secondary" : "bg-gray-200"
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                        <div
                            className="absolute top-0 left-0 h-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Paso 1: Información Básica */}
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                                <p className="text-sm text-gray-600">Describe tu espacio de manera atractiva</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Título del Espacio *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Ej: Cochera céntrica en Zona Hotelera"
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${errors.title ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Descripción *
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={5}
                                placeholder="Describe las características, amenidades y beneficios de tu espacio..."
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none ${errors.description ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.description ? (
                                    <p className="text-red-500 text-sm">{errors.description}</p>
                                ) : (
                                    <p className="text-gray-500 text-xs">Mínimo 50 caracteres recomendados</p>
                                )}
                                <p className="text-gray-500 text-xs">{description.length} caracteres</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                                Tipo de Espacio *
                            </label>
                            <div className="relative">
                                <select
                                    id="type"
                                    value={type}
                                    onChange={e => setType(e.target.value as SpaceType)}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none ${errors.type ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    {Object.values(SpaceType).map(t => (
                                        <option key={t} value={t}>{
                                            getSpaceTypeLabel(t)
                                        }</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                        </div>
                    </div>
                )}

                {/* Paso 2: Ubicación y Precio */}
                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Ubicación y Precio</h3>
                                <p className="text-sm text-gray-600">Indica dónde se encuentra y cuánto cuesta</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ciudad *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <input
                                        id="city"
                                        type="text"
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        placeholder="Cancún"
                                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${errors.city ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                </div>
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Dirección *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="Av. Tulum 123, Centro"
                                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                </div>
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                Precio por hora (MXN) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 font-semibold">$</span>
                                </div>
                                <input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(Number(e.target.value))}
                                    placeholder="250"
                                    min="1"
                                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${errors.price ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 text-sm">MXN/hora</span>
                                </div>
                            </div>
                            {errors.price ? (
                                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                            ) : (
                                <p className="text-gray-500 text-xs mt-1">Define un precio competitivo para atraer más usuarios</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Paso 3: Imágenes */}
                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Imágenes del Espacio</h3>
                                <p className="text-sm text-gray-600">Agrega fotos atractivas de tu espacio</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                URL de la imagen *
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="url"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    value={newImage}
                                    onChange={e => setNewImage(e.target.value)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={addImage}
                                    className="px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                                >
                                    Agregar
                                </button>
                            </div>
                            {errors.images && images.length === 0 && (
                                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">Agrega URLs de imágenes de alta calidad</p>
                        </div>

                        {images.length > 0 && (
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-3">
                                    Imágenes agregadas ({images.length})
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative group">
                                            <img
                                                src={img}
                                                alt={`Preview ${i}`}
                                                className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            {i === 0 && (
                                                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-lg font-semibold">
                                                    Principal
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Botones de Navegación */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    {!initialData && currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center space-x-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 font-semibold transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Anterior</span>
                        </button>
                    ) : (
                        <div />
                    )}

                    {!initialData && currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            <span>Siguiente</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 px-8 py-3 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Publicando...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{initialData ? "Guardar Cambios" : "Publicar Espacio"}</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
