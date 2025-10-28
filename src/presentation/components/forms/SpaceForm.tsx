import React, { useState, useEffect } from "react";
import { SpaceType } from "../../../core/entities/Space";

interface Props {
    onSubmit: (data: any) => void;
    initialData?: any; // Para edición
}

export const SpaceForm: React.FC<Props> = ({ onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [type, setType] = useState<SpaceType>(initialData?.type || SpaceType.OTHER);
    const [city, setCity] = useState(initialData?.location?.city || "");
    const [address, setAddress] = useState(initialData?.location?.address || "");
    const [price, setPrice] = useState(initialData?.price?.amount || 0);
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [newImage, setNewImage] = useState("");

    useEffect(() => {
        setTitle(initialData?.title || "");
        setDescription(initialData?.description || "");
        setType(initialData?.type || SpaceType.OTHER);
        setCity(initialData?.location?.city || "");
        setAddress(initialData?.location?.address || "");
        setPrice(initialData?.price?.amount || 0);
        setImages(initialData?.images || []);
        setNewImage("");
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            type,
            location: { city, address },
            price: { amount: price, currency: "MXN" },
            images
        });

        if (!initialData) {
            setTitle(""); setDescription(""); setCity(""); setAddress(""); setPrice(0); setImages([]); setNewImage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-gray-200 rounded-xl shadow-lg max-w-lg mx-auto bg-white">
            <div>
                <label className="block font-medium mb-1">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Descripción</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Tipo de espacio</label>
                <select
                    value={type}
                    onChange={e => setType(e.target.value as SpaceType)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                    {Object.values(SpaceType).map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Ciudad</label>
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Dirección</label>
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium mb-1">Precio (MXN/hora)</label>
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Imágenes</label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={newImage}
                        onChange={e => setNewImage(e.target.value)}
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button type="button" onClick={addImage} className="bg-secondary text-white px-4 rounded-lg hover:bg-accent transition">
                        Agregar
                    </button>
                </div>

                {images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {images.map((img, i) => (
                            <div key={i} className="relative w-20 h-20 border rounded overflow-hidden">
                                <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-secondary text-white font-semibold p-3 rounded-lg hover:bg-accent transition"
            >
                {initialData ? "Guardar cambios" : "Agregar Espacio"}
            </button>
        </form>
    );
};
