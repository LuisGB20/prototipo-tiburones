import { v4 as uuidv4 } from "uuid";

/* Keys usadas por los repositorios */
const USERS_KEY = "users";
const SPACES_KEY = "spaces";
const RENTALS_KEY = "rentals";

/* Helpers para generar datos */
const makeUser = (overrides: Partial<any> = {}) => ({
    id: overrides.id ?? uuidv4(),
    name: overrides.name ?? "Usuario Demo",
    email: overrides.email ?? `demo+${Math.floor(Math.random() * 1000)}@example.com`,
    role: overrides.role ?? "owner", // 'owner' o 'renter'
    rating: overrides.rating ?? +((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 - 5.0
});

const makeSpace = (overrides: Partial<any> = {}) => ({
    id: overrides.id ?? uuidv4(),
    ownerId: overrides.ownerId ?? uuidv4(),
    title: overrides.title ?? "Espacio sin título",
    description: overrides.description ?? "Lugar céntrico, bien iluminado y accesible.",
    type: overrides.type ?? "room", // wall, garage, room, hall, other
    location: overrides.location ?? { city: "Cancún", address: "Av. Tulum 123, Centro" },
    price: overrides.price ?? { amount: 250, currency: "MXN" }, // objeto simple
    available: overrides.available ?? true,
    images: overrides.images ?? [
        "https://via.placeholder.com/600x400?text=Espacio+Cancun"
    ],
});

/* Rangos de fecha en ISO para rentas */
const isoDate = (y: number, m: number, d: number) => new Date(y, m - 1, d).toISOString();

export function getSeedData() {
    // Usuarios: propietarios y rentadores
    const owners = [
        makeUser({
            id: "owner-juan",
            name: "Juan Pérez",
            email: "juan.perez@ejemplo.com",
            role: "owner",
            rating: 4.8
        }),
        makeUser({
            id: "owner-maria",
            name: "María López",
            email: "maria.lopez@ejemplo.com",
            role: "owner",
            rating: 4.6
        }),
    ];

    const renters = [
        makeUser({
            id: "renter-carlos",
            name: "Carlos Gómez",
            email: "carlos.gomez@ejemplo.com",
            role: "renter",
            rating: 4.5
        }),
        makeUser({
            id: "renter-ana",
            name: "Ana Martínez",
            email: "ana.martinez@ejemplo.com",
            role: "renter",
            rating: 4.7
        }),
    ];

    // Espacios (en Cancún)
    const spaces = [
        makeSpace({
            id: "space-wall-1",
            ownerId: "owner-juan",
            title: "Muro para publicidad - Zona Hotelera",
            description: "Muro amplio en avenida principal de la Zona Hotelera. Alto flujo peatonal y vehicular.",
            type: "wall",
            location: { city: "Cancún", address: "Boulevard Kukulcán Km 9, Zona Hotelera" },
            price: { amount: 1500, currency: "MXN" },
            images: ["https://via.placeholder.com/600x400?text=Muro+Zona+Hotelera"],
        }),
        makeSpace({
            id: "space-garage-1",
            ownerId: "owner-juan",
            title: "Cochera segura - Centro",
            description: "Cochera cerrada con vigilancia, ideal para dejar vehículo por horas o días.",
            type: "garage",
            location: { city: "Cancún", address: "Av. Tulum 45, Centro" },
            price: { amount: 120, currency: "MXN" },
            images: ["https://via.placeholder.com/600x400?text=Cochera+Centro"],
        }),
        makeSpace({
            id: "space-room-1",
            ownerId: "owner-maria",
            title: "Sala pequeña para grabación - SM 21",
            description: "Sala con buena acústica, iluminación y fondo neutro, cerca de universidades.",
            type: "room",
            location: { city: "Cancún", address: "Sm 21, Calle Satélite 7" },
            price: { amount: 400, currency: "MXN" },
            images: ["https://via.placeholder.com/600x400?text=Sala+grabacion"],
        }),
        makeSpace({
            id: "space-hall-1",
            ownerId: "owner-maria",
            title: "Salón para eventos pequeños - SM 50",
            description: "Salón con capacidad para 50 personas, ideal para pop-ups o talleres.",
            type: "hall",
            location: { city: "Cancún", address: "Sm 50, Av. Nichupté 200" },
            price: { amount: 1200, currency: "MXN" },
            images: ["https://via.placeholder.com/600x400?text=Salon+SM50"],
        }),
    ];

    // Renta de ejemplo
    const rentals = [
        {
            id: "rental-1",
            spaceId: "space-room-1",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 11, 10), end: isoDate(2025, 11, 12) },
            totalCost: 800
        },
        {
            id: "rental-2",
            spaceId: "space-garage-1",
            renterId: "renter-ana",
            dateRange: { start: isoDate(2025, 10, 18), end: isoDate(2025, 10, 20) },
            totalCost: 240
        },
    ];

    // Reviews
    const reviews = [
        {
            id: "rev-1",
            reviewerId: "renter-carlos",
            reviewedUserId: "owner-maria",
            rating: 5,
            comment: "La sala estaba perfecta para la grabación, muy buen host.",
            date: isoDate(2025, 9, 3)
        },
        {
            id: "rev-2",
            reviewerId: "renter-ana",
            reviewedUserId: "owner-juan",
            rating: 4,
            comment: "Cochera segura y céntrica, puntualidad en la entrega.",
            date: isoDate(2025, 8, 26)
        },
    ];

    return {
        users: [...owners, ...renters],
        spaces,
        rentals,
        reviews,
    };
}

/**
 * seedLocalStorage - escribe los datos en localStorage
 * Si ya hay datos y quieres forzar reescritura, usa { force: true }
 */
export function seedLocalStorage(options: { force?: boolean } = { force: false }) {
    const { users, spaces, rentals } = getSeedData();

    const existingUsers = localStorage.getItem(USERS_KEY);
    const existingSpaces = localStorage.getItem(SPACES_KEY);
    const existingRentals = localStorage.getItem(RENTALS_KEY);

    if (!options.force && (existingUsers || existingSpaces || existingRentals)) {
        console.warn("LocalStorage ya contiene datos. Usa seedLocalStorage({force: true}) para sobrescribir.");
        return {
            users: JSON.parse(existingUsers || "[]"),
            spaces: JSON.parse(existingSpaces || "[]"),
            rentals: JSON.parse(existingRentals || "[]"),
            message: "No se sobrescribieron datos. Usa force: true para forzar.",
        };
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(users, null, 2));
    localStorage.setItem(SPACES_KEY, JSON.stringify(spaces, null, 2));
    localStorage.setItem(RENTALS_KEY, JSON.stringify(rentals, null, 2));

    return { users, spaces, rentals, message: "Datos sembrados correctamente." };
}

/** Limpiar los keys del seeder */
export function clearSeedData() {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SPACES_KEY);
    localStorage.removeItem(RENTALS_KEY);
    return { message: "Datos de seed eliminados." };
}

/** Simula un "endpoint" que lee lo sembrado */
export function getSeedFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const spaces = JSON.parse(localStorage.getItem(SPACES_KEY) || "[]");
    const rentals = JSON.parse(localStorage.getItem(RENTALS_KEY) || "[]");
    return { users, spaces, rentals };
}
