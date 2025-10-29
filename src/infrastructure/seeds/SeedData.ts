import { v4 as uuidv4 } from "uuid";

/* Keys usadas por los repositorios */
const USERS_KEY = "users";
const SPACES_KEY = "spaces";
const RENTALS_KEY = "rentals";

/* Helpers para generar datos */
const makeUser = (overrides: Partial<Record<string, unknown>> = {}) => ({
    id: overrides.id ?? uuidv4(),
    name: overrides.name ?? "Usuario Demo",
    email: overrides.email ?? `demo+${Math.floor(Math.random() * 1000)}@example.com`,
    role: overrides.role ?? "owner", // 'owner' o 'renter'
    rating: overrides.rating ?? +((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 - 5.0
});

const makeSpace = (overrides: Partial<Record<string, unknown>> = {}) => ({
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
            name: "Juan Pérez Hernández",
            email: "juan.perez@spaceshare.mx",
            role: "owner",
            rating: 4.8
        }),
        makeUser({
            id: "owner-maria",
            name: "María López García",
            email: "maria.lopez@spaceshare.mx",
            role: "owner",
            rating: 4.9
        }),
        makeUser({
            id: "owner-roberto",
            name: "Roberto Sánchez Vega",
            email: "roberto.sanchez@spaceshare.mx",
            role: "owner",
            rating: 4.7
        }),
        makeUser({
            id: "owner-laura",
            name: "Laura Fernández Cruz",
            email: "laura.fernandez@spaceshare.mx",
            role: "owner",
            rating: 4.6
        }),
        makeUser({
            id: "owner-diego",
            name: "Diego Ramírez Torres",
            email: "diego.ramirez@spaceshare.mx",
            role: "owner",
            rating: 4.8
        }),
    ];

    const renters = [
        makeUser({
            id: "renter-carlos",
            name: "Carlos Gómez Ruiz",
            email: "carlos.gomez@gmail.com",
            role: "renter",
            rating: 4.5
        }),
        makeUser({
            id: "renter-ana",
            name: "Ana Martínez Silva",
            email: "ana.martinez@outlook.com",
            role: "renter",
            rating: 4.7
        }),
        makeUser({
            id: "renter-sofia",
            name: "Sofía Torres Mendoza",
            email: "sofia.torres@gmail.com",
            role: "renter",
            rating: 4.9
        }),
        makeUser({
            id: "renter-miguel",
            name: "Miguel Ángel Reyes",
            email: "miguel.reyes@hotmail.com",
            role: "renter",
            rating: 4.6
        }),
    ];

    // Espacios variados en Cancún con datos realistas
    const spaces = [
        // COCHERAS
        makeSpace({
            id: "space-garage-1",
            ownerId: "owner-juan",
            title: "Cochera segura en Centro de Cancún",
            description: "Cochera techada con vigilancia 24/7 y circuito cerrado. Acceso fácil desde Av. Tulum. Ideal para estacionamiento por horas o días. Portón automático y comprobante de entrada/salida.",
            type: "garage",
            location: { city: "Cancún", address: "Av. Tulum 145, Supermanzana 2, Centro" },
            price: { amount: 80, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600",
                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600",
                "https://images.unsplash.com/photo-1574182245530-967d84c5b2c8?w=600"
            ],
        }),
        makeSpace({
            id: "space-garage-2",
            ownerId: "owner-roberto",
            title: "Estacionamiento cubierto - Zona Hotelera",
            description: "Cochera techada en el corazón de la Zona Hotelera, a 5 minutos caminando de Playa Delfines. Perfecto para turistas o residentes. Seguridad privada y cámaras de vigilancia.",
            type: "garage",
            location: { city: "Cancún", address: "Boulevard Kukulcán Km 8.5, Zona Hotelera" },
            price: { amount: 150, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600",
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
            ],
        }),
        makeSpace({
            id: "space-garage-3",
            ownerId: "owner-laura",
            title: "Cochera amplia para vehículos grandes - SM 21",
            description: "Espacio amplio para camionetas, vans o vehículos grandes. Portón eléctrico, bien iluminado y ventilado. Cerca de Plaza Las Américas.",
            type: "garage",
            location: { city: "Cancún", address: "Calle Satélite 32, Supermanzana 21" },
            price: { amount: 100, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
            ],
        }),

        // SALONES PARA EVENTOS
        makeSpace({
            id: "space-hall-1",
            ownerId: "owner-maria",
            title: "Salón ejecutivo para 50 personas - SM 44",
            description: "Salón moderno con aire acondicionado, sillas y mesas incluidas. Ideal para conferencias, talleres, capacitaciones o reuniones corporativas. Proyector y pantalla disponibles. WiFi de alta velocidad.",
            type: "hall",
            location: { city: "Cancún", address: "Av. Nichupté 250, Supermanzana 44" },
            price: { amount: 800, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
                "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600",
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600"
            ],
        }),
        makeSpace({
            id: "space-hall-2",
            ownerId: "owner-diego",
            title: "Salón versátil para eventos sociales - Centro",
            description: "Salón para 80 personas con cocina equipada, baños completos y área de estacionamiento. Perfecto para cumpleaños, baby showers, presentaciones o eventos privados. Decoración básica incluida.",
            type: "hall",
            location: { city: "Cancún", address: "Av. Yaxchilán 89, Centro" },
            price: { amount: 1200, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1519167758481-83f29da8c8d0?w=600",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600"
            ],
        }),
        makeSpace({
            id: "space-hall-3",
            ownerId: "owner-roberto",
            title: "Salón boutique para presentaciones - SM 17",
            description: "Espacio íntimo y elegante para 30 personas. Ideal para lanzamientos de producto, showcases, pop-up stores o presentaciones exclusivas. Iluminación profesional y sistema de audio incluido.",
            type: "hall",
            location: { city: "Cancún", address: "Calle Pavo 15, Supermanzana 17" },
            price: { amount: 600, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600"
            ],
        }),

        // OFICINAS
        makeSpace({
            id: "space-office-1",
            ownerId: "owner-maria",
            title: "Oficina privada amueblada - Plaza Comercial",
            description: "Oficina privada de 20m² completamente amueblada en plaza comercial con alta afluencia. Incluye escritorio ejecutivo, sillas, archivero, WiFi, aire acondicionado y acceso a baños compartidos. Ideal para profesionistas independientes.",
            type: "office",
            location: { city: "Cancún", address: "Plaza Las Américas, Av. Tulum 260" },
            price: { amount: 350, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600"
            ],
        }),
        makeSpace({
            id: "space-office-2",
            ownerId: "owner-laura",
            title: "Coworking con escritorio dedicado - SM 20",
            description: "Espacio de coworking profesional con escritorio dedicado. Acceso a sala de juntas, cocina equipada, internet de alta velocidad y ambiente colaborativo. Perfecto para emprendedores y freelancers.",
            type: "office",
            location: { city: "Cancún", address: "Av. Cobá 503, Supermanzana 20" },
            price: { amount: 180, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600"
            ],
        }),
        makeSpace({
            id: "space-office-3",
            ownerId: "owner-diego",
            title: "Sala de juntas ejecutiva - Zona Hotelera",
            description: "Sala de juntas equipada para 12 personas con vista panorámica. Incluye pantalla grande, sistema de videoconferencia, pizarra interactiva y servicio de café. Ubicación prestigiosa para reuniones importantes.",
            type: "office",
            location: { city: "Cancún", address: "Torre Corporativa, Blvd. Kukulcán Km 12" },
            price: { amount: 500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600"
            ],
        }),

        // ESTUDIOS
        makeSpace({
            id: "space-studio-1",
            ownerId: "owner-juan",
            title: "Estudio de fotografía profesional - SM 23",
            description: "Estudio fotográfico de 40m² con ciclorama blanco/negro, equipo de iluminación profesional (softboxes, flashes), fondos varios y área de maquillaje. Ideal para sesiones fotográficas, catálogos de producto o retratos profesionales.",
            type: "studio",
            location: { city: "Cancún", address: "Calle Roble 43, Supermanzana 23" },
            price: { amount: 450, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
                "https://images.unsplash.com/photo-1542452255191-93a28c90df44?w=600"
            ],
        }),
        makeSpace({
            id: "space-studio-2",
            ownerId: "owner-roberto",
            title: "Estudio de grabación de audio - Centro",
            description: "Estudio de grabación insonorizado con cabina vocal, consola de mezcla profesional, micrófonos de condensador y monitores de estudio. Perfecto para podcasts, locuciones, grabación de música o audiolibros. Ingeniero de audio disponible con costo adicional.",
            type: "studio",
            location: { city: "Cancún", address: "Av. Uxmal 24, Centro" },
            price: { amount: 550, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
                "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600"
            ],
        }),
        makeSpace({
            id: "space-studio-3",
            ownerId: "owner-laura",
            title: "Set para video y streaming - SM 15",
            description: "Espacio versátil equipado para producción de video, streaming en vivo, entrevistas y contenido digital. Incluye cámaras 4K, iluminación LED, chroma key (pantalla verde), teleprompter y control de audio. WiFi gigabit para streaming sin interrupciones.",
            type: "studio",
            location: { city: "Cancún", address: "Av. Bonampak 77, Supermanzana 15" },
            price: { amount: 650, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1542452255191-93a28c90df44?w=600",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
            ],
        }),

        // PAREDES/MUROS PUBLICITARIOS
        makeSpace({
            id: "space-wall-1",
            ownerId: "owner-diego",
            title: "Muro publicitario - Avenida principal Zona Hotelera",
            description: "Espacio publicitario privilegiado en muro de 6x4 metros sobre Boulevard Kukulcán. Altísima visibilidad con flujo de más de 50,000 vehículos diarios. Perfecto para campañas de marca, eventos o promociones turísticas. Instalación de lona incluida.",
            type: "wall",
            location: { city: "Cancún", address: "Boulevard Kukulcán Km 9, Zona Hotelera" },
            price: { amount: 2500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
            ],
        }),
        makeSpace({
            id: "space-wall-2",
            ownerId: "owner-juan",
            title: "Pared comercial en Centro - Alta visibilidad",
            description: "Muro de 8x3 metros en esquina comercial de alta circulación peatonal y vehicular. Ubicación estratégica cerca de paradas de autobús y centros comerciales. Ideal para publicidad de negocios locales, restaurantes o servicios.",
            type: "wall",
            location: { city: "Cancún", address: "Av. Tulum esquina Uxmal, Centro" },
            price: { amount: 1800, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
            ],
        }),
    ];

    // Rentas variadas: pasadas, actuales y futuras
    const rentals = [
        // Rentas pasadas
        {
            id: "rental-1",
            spaceId: "space-studio-1",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 9, 15), end: isoDate(2025, 9, 15) },
            totalCost: 450
        },
        {
            id: "rental-2",
            spaceId: "space-garage-1",
            renterId: "renter-ana",
            dateRange: { start: isoDate(2025, 10, 5), end: isoDate(2025, 10, 7) },
            totalCost: 160
        },
        {
            id: "rental-3",
            spaceId: "space-office-1",
            renterId: "renter-sofia",
            dateRange: { start: isoDate(2025, 9, 20), end: isoDate(2025, 9, 22) },
            totalCost: 700
        },
        
        // Rentas actuales/próximas
        {
            id: "rental-4",
            spaceId: "space-hall-1",
            renterId: "renter-miguel",
            dateRange: { start: isoDate(2025, 10, 28), end: isoDate(2025, 10, 28) },
            totalCost: 800
        },
        {
            id: "rental-5",
            spaceId: "space-studio-2",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 11, 2), end: isoDate(2025, 11, 2) },
            totalCost: 550
        },
        {
            id: "rental-6",
            spaceId: "space-garage-2",
            renterId: "renter-ana",
            dateRange: { start: isoDate(2025, 11, 5), end: isoDate(2025, 11, 10) },
            totalCost: 750
        },
        
        // Rentas futuras
        {
            id: "rental-7",
            spaceId: "space-hall-2",
            renterId: "renter-sofia",
            dateRange: { start: isoDate(2025, 11, 15), end: isoDate(2025, 11, 15) },
            totalCost: 1200
        },
        {
            id: "rental-8",
            spaceId: "space-office-3",
            renterId: "renter-miguel",
            dateRange: { start: isoDate(2025, 11, 20), end: isoDate(2025, 11, 20) },
            totalCost: 500
        },
        {
            id: "rental-9",
            spaceId: "space-wall-1",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 12, 1), end: isoDate(2025, 12, 31) },
            totalCost: 75000
        },
    ];

    // Reviews completas y variadas
    const reviews = [
        {
            id: "rev-1",
            reviewerId: "renter-carlos",
            reviewedUserId: "owner-juan",
            rating: 5,
            comment: "Excelente estudio de fotografía. El equipo de iluminación está en perfectas condiciones y el espacio es muy profesional. Juan fue muy atento y flexible con los horarios.",
            date: isoDate(2025, 9, 16)
        },
        {
            id: "rev-2",
            reviewerId: "renter-ana",
            reviewedUserId: "owner-juan",
            rating: 5,
            comment: "Cochera segura y bien ubicada. El acceso es muy fácil y la vigilancia te da tranquilidad. Definitivamente volveré a rentar cuando visite Cancún.",
            date: isoDate(2025, 10, 8)
        },
        {
            id: "rev-3",
            reviewerId: "renter-sofia",
            reviewedUserId: "owner-maria",
            rating: 4,
            comment: "La oficina está bien equipada y la ubicación es excelente. El único detalle es que el internet falló por unos minutos, pero en general todo muy bien.",
            date: isoDate(2025, 9, 23)
        },
        {
            id: "rev-4",
            reviewerId: "owner-maria",
            reviewedUserId: "renter-sofia",
            rating: 5,
            comment: "Sofía es una inquilina excelente. Dejó el espacio impecable y respetó todos los horarios. Muy recomendable.",
            date: isoDate(2025, 9, 23)
        },
        {
            id: "rev-5",
            reviewerId: "owner-juan",
            reviewedUserId: "renter-carlos",
            rating: 5,
            comment: "Carlos es muy profesional y cuidadoso con el equipo. Excelente comunicación y puntualidad. Bienvenido cuando lo necesite.",
            date: isoDate(2025, 9, 16)
        },
        {
            id: "rev-6",
            reviewerId: "renter-miguel",
            reviewedUserId: "owner-diego",
            rating: 5,
            comment: "El salón superó mis expectativas. Perfecto para mi evento corporativo. Diego fue muy profesional y nos ayudó con todo. ¡Altamente recomendado!",
            date: isoDate(2025, 10, 1)
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
