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
    // Usuarios: propietarios y rentadores (más usuarios para simular app establecida)
    const owners = [
        makeUser({
            id: "owner-juan",
            name: "Juan Pérez Hernández",
            email: "juan.perez@mexpace.mx",
            role: "owner",
            rating: 4.8
        }),
        makeUser({
            id: "owner-maria",
            name: "María López García",
            email: "maria.lopez@mexpace.mx",
            role: "owner",
            rating: 4.9
        }),
        makeUser({
            id: "owner-roberto",
            name: "Roberto Sánchez Vega",
            email: "roberto.sanchez@mexpace.mx",
            role: "owner",
            rating: 4.7
        }),
        makeUser({
            id: "owner-laura",
            name: "Laura Fernández Cruz",
            email: "laura.fernandez@mexpace.mx",
            role: "owner",
            rating: 4.6
        }),
        makeUser({
            id: "owner-diego",
            name: "Diego Ramírez Torres",
            email: "diego.ramirez@mexpace.mx",
            role: "owner",
            rating: 4.8
        }),
        makeUser({
            id: "owner-carmen",
            name: "Carmen Vargas Moreno",
            email: "carmen.vargas@mexpace.mx",
            role: "owner",
            rating: 4.9
        }),
        makeUser({
            id: "owner-ricardo",
            name: "Ricardo Mejía Castro",
            email: "ricardo.mejia@mexpace.mx",
            role: "owner",
            rating: 4.7
        }),
        makeUser({
            id: "owner-patricia",
            name: "Patricia Rojas Delgado",
            email: "patricia.rojas@mexpace.mx",
            role: "owner",
            rating: 4.8
        }),
        makeUser({
            id: "owner-fernando",
            name: "Fernando Ortiz Salas",
            email: "fernando.ortiz@mexpace.mx",
            role: "owner",
            rating: 4.6
        }),
        makeUser({
            id: "owner-gabriela",
            name: "Gabriela Núñez Jiménez",
            email: "gabriela.nunez@mexpace.mx",
            role: "owner",
            rating: 4.9
        }),
        makeUser({
            id: "owner-alejandro",
            name: "Alejandro Mendoza Ríos",
            email: "alejandro.mendoza@mexpace.mx",
            role: "owner",
            rating: 4.7
        }),
        makeUser({
            id: "owner-valeria",
            name: "Valeria Castillo Aguilar",
            email: "valeria.castillo@mexpace.mx",
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
        makeUser({
            id: "renter-lucia",
            name: "Lucía Herrera Campos",
            email: "lucia.herrera@gmail.com",
            role: "renter",
            rating: 4.8
        }),
        makeUser({
            id: "renter-eduardo",
            name: "Eduardo Morales Vega",
            email: "eduardo.morales@outlook.com",
            role: "renter",
            rating: 4.7
        }),
        makeUser({
            id: "renter-daniela",
            name: "Daniela Romero Soto",
            email: "daniela.romero@gmail.com",
            role: "renter",
            rating: 4.9
        }),
        makeUser({
            id: "renter-jorge",
            name: "Jorge Luis Paredes",
            email: "jorge.paredes@hotmail.com",
            role: "renter",
            rating: 4.6
        }),
        makeUser({
            id: "renter-isabella",
            name: "Isabella Gutiérrez Luna",
            email: "isabella.gutierrez@gmail.com",
            role: "renter",
            rating: 4.8
        }),
        makeUser({
            id: "renter-andres",
            name: "Andrés Navarro Montes",
            email: "andres.navarro@outlook.com",
            role: "renter",
            rating: 4.5
        }),
        makeUser({
            id: "renter-camila",
            name: "Camila Flores Ortega",
            email: "camila.flores@gmail.com",
            role: "renter",
            rating: 4.9
        }),
        makeUser({
            id: "renter-pablo",
            name: "Pablo Salazar Ramírez",
            email: "pablo.salazar@hotmail.com",
            role: "renter",
            rating: 4.7
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
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
                
            ],
        }), 
        makeSpace({
            id: "space-hall-3",
            ownerId: "owner-roberto",
            title: "Salón boutique para presentaciones - SM 17",
            description: "Espacio íntimo y elegante para 30 personas. Ideal para lanzamientos de producto, showcases, pop-up stores o presentaciones exclusivas. Iluminación profesional y sistema de audio incluido.",
            type: "hall",
            location: { city: "Cancún", address: "Calle Pavo 15, Supermanzana 17" },
            price: { amount: 150, currency: "MXN" },
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
            price: { amount: 200, currency: "MXN" },
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
                "https://th.bing.com/th/id/R.307419a6f789470090f45694286b96d4?rik=VqbERGxP%2bDiAqg&riu=http%3a%2f%2fwww.digitalcinema.com.mx%2fimg%2f01-video-production-cancun-mexico.jpg&ehk=39KBTwvVgks2neGDVKPc6t1sbSFvE7kX7WqpDo1hVEk%3d&risl=&pid=ImgRaw&r=0",
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
        makeSpace({
            id: "space-wall-3",
            ownerId: "owner-carmen",
            title: "Espectacular publicitario en carretera",
            description: "Espacio publicitario tipo espectacular en carretera federal Cancún-Playa del Carmen. Impacto visual garantizado con más de 80,000 vehículos diarios. Medidas 12x6 metros. Incluye iluminación nocturna.",
            type: "wall",
            location: { city: "Cancún", address: "Carretera Federal 307 Km 298" },
            price: { amount: 5000, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
            ],
        }),

        // LOCALES COMERCIALES POP-UP
        makeSpace({
            id: "space-shop-1",
            ownerId: "owner-patricia",
            title: "Local comercial pop-up en plaza - SM 28",
            description: "Local de 25m² en plaza comercial disponible por días o semanas. Perfecto para pop-up stores, pruebas de concepto, ventas temporales o eventos especiales. Incluye mostrador, iluminación y conexión eléctrica. Alta visibilidad y tráfico peatonal.",
            type: "shop",
            location: { city: "Cancún", address: "Plaza Bonita, Av. Cobá 510" },
            price: { amount: 600, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
                "https://images.unsplash.com/photo-1555529902-5261145633bf?w=600"
            ],
        }),
        makeSpace({
            id: "space-shop-2",
            ownerId: "owner-fernando",
            title: "Kiosko temporal en Zona Hotelera",
            description: "Kiosko de 12m² en área de alto tráfico turístico. Ideal para venta de artesanías, souvenirs, tours, fotografía o promociones temporales. Incluye mesa plegable, toldo y conexión eléctrica. Ubicación estratégica cerca de playas principales.",
            type: "shop",
            location: { city: "Cancún", address: "Boulevard Kukulcán Km 9.5, Zona Hotelera" },
            price: { amount: 450, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1555529902-5261145633bf?w=600",
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
            ],
        }),
        makeSpace({
            id: "space-shop-3",
            ownerId: "owner-gabriela",
            title: "Espacio comercial en mercado artesanal",
            description: "Stand de 15m² en mercado artesanal con alta afluencia de turistas y locales. Perfecto para venta de artesanías, productos orgánicos, joyería o arte local. Incluye mesa, mantel y acceso a baños compartidos.",
            type: "shop",
            location: { city: "Cancún", address: "Mercado 28, Centro" },
            price: { amount: 350, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
                "https://images.unsplash.com/photo-1555529902-5261145633bf?w=600"
            ],
        }),

        // BODEGAS/ALMACENES
        makeSpace({
            id: "space-warehouse-1",
            ownerId: "owner-alejandro",
            title: "Bodega 100m² con rampa de carga - SM 51",
            description: "Bodega industrial de 100m² con techo alto (5m), rampa de carga, portón eléctrico y área de maniobras. Vigilancia 24/7 y cercado perimetral. Ideal para almacenamiento de mercancía, inventario o distribución.",
            type: "warehouse",
            location: { city: "Cancún", address: "Av. Puerto Juárez 450, Supermanzana 51" },
            price: { amount: 350, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
            ],
        }),
        makeSpace({
            id: "space-warehouse-2",
            ownerId: "owner-ricardo",
            title: "Mini bodega climatizada - SM 25",
            description: "Bodega de 30m² con clima controlado, perfecta para almacenamiento de documentos, archivos, inventario sensible o productos que requieren temperatura estable. Acceso 24/7 con código personal.",
            type: "warehouse",
            location: { city: "Cancún", address: "Calle Cedro 78, Supermanzana 25" },
            price: { amount: 200, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
            ],
        }),
        makeSpace({
            id: "space-warehouse-3",
            ownerId: "owner-valeria",
            title: "Bodega mega 250m² - Parque Industrial",
            description: "Bodega de gran capacidad en parque industrial. Altura 7 metros, 3 andenes de carga, oficina administrativa, baños y área de estacionamiento para tráileres. Sistema contra incendios y seguridad privada.",
            type: "warehouse",
            location: { city: "Cancún", address: "Parque Industrial Tres Ríos, Lote 14" },
            price: { amount: 650, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
            ],
        }),

        // TERRAZAS
        makeSpace({
            id: "space-terrace-1",
            ownerId: "owner-carmen",
            title: "Rooftop con vista al mar - Zona Hotelera",
            description: "Terraza espectacular de 150m² en el último piso con vista panorámica al mar Caribe. Perfecta para eventos privados, fiestas, sesiones fotográficas o cenas románticas. Incluye mesas, sillas, iluminación ambiental y sistema de audio.",
            type: "terrace",
            location: { city: "Cancún", address: "Boulevard Kukulcán Km 10.5, Zona Hotelera" },
            price: { amount: 1500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600"
            ],
        }),
        makeSpace({
            id: "space-terrace-2",
            ownerId: "owner-patricia",
            title: "Terraza jardín con asador - SM 20",
            description: "Terraza amplia tipo jardín con área verde, asador de ladrillo, pérgola, mesa grande para 12 personas y baño. Ideal para reuniones familiares, parrilladas o eventos casuales. Música ambiente permitida hasta las 10pm.",
            type: "terrace",
            location: { city: "Cancún", address: "Calle Alcatraces 33, Supermanzana 20" },
            price: { amount: 600, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
            ],
        }),

        // AZOTEAS
        makeSpace({
            id: "space-rooftop-1",
            ownerId: "owner-fernando",
            title: "Azotea urbana para eventos - Centro",
            description: "Azotea de 120m² en edificio céntrico con vista a la ciudad. Cuenta con barra, área lounge, baño y cocina equipada. Perfecta para fiestas, eventos corporativos, lanzamientos de producto o after office. Capacidad 80 personas.",
            type: "rooftop",
            location: { city: "Cancún", address: "Av. Yaxchilán 156, Centro" },
            price: { amount: 1300, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"
            ],
        }),

        // JARDINES
        makeSpace({
            id: "space-garden-1",
            ownerId: "owner-gabriela",
            title: "Jardín tropical para eventos - SM 30",
            description: "Hermoso jardín de 200m² rodeado de palmas y plantas tropicales. Espacio mágico para bodas pequeñas, XV años, baby showers o sesiones fotográficas. Incluye pérgola decorada, sillas plegables, iluminación con luces colgantes y área de servicio.",
            type: "garden",
            location: { city: "Cancún", address: "Calle Tulipanes 89, Supermanzana 30" },
            price: { amount: 1500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
            ],
        }),
        makeSpace({
            id: "space-garden-2",
            ownerId: "owner-alejandro",
            title: "Jardín con alberca - Residencial",
            description: "Jardín privado de 150m² con alberca pequeña (4x6m), área verde, palapas, asador y baño completo. Perfecto para reuniones familiares, pool parties o celebraciones privadas. Estacionamiento para 5 autos.",
            type: "garden",
            location: { city: "Cancún", address: "Residencial Cumbres, SM 50" },
            price: { amount: 1000, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600"
            ],
        }),

        // ESTACIONAMIENTOS
        makeSpace({
            id: "space-parking-1",
            ownerId: "owner-valeria",
            title: "Cajón de estacionamiento cubierto - Plaza Outlet",
            description: "Cajón techado en plaza comercial con alta seguridad. Ubicación premium cerca de restaurantes y tiendas. Perfecto para empleados de la zona o visitantes frecuentes.",
            type: "parking_spot",
            location: { city: "Cancún", address: "Plaza Outlet, Av. Kabah Km 2.5" },
            price: { amount: 60, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
            ],
        }),
        makeSpace({
            id: "space-parking-2",
            ownerId: "owner-ricardo",
            title: "Estacionamiento descubierto - Playa Delfines",
            description: "Cajón de estacionamiento a 2 minutos caminando de Playa Delfines. Ideal para turistas que visitan la playa. Seguridad básica, sin techo. Tarifa por día completo.",
            type: "parking_spot",
            location: { city: "Cancún", address: "Zona Hotelera, cerca Km 17.5" },
            price: { amount: 120, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600"
            ],
        }),

        // LOCALES COMERCIALES TRADICIONALES
        makeSpace({
            id: "space-shop-4",
            ownerId: "owner-carmen",
            title: "Local comercial 50m² - Plaza comercial",
            description: "Local en plaza con alta afluencia de público. Incluye baño, área de exhibición con aparadores de cristal, bodega pequeña y conexiones eléctricas. Ideal para boutique, tienda de ropa, joyería o productos artesanales.",
            type: "shop",
            location: { city: "Cancún", address: "Plaza Bonita, Av. Bonampak 200" },
            price: { amount: 450, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
                "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600"
            ],
        }),
        makeSpace({
            id: "space-shop-5",
            ownerId: "owner-valeria",
            title: "Vitrina comercial en mall - Display temporal",
            description: "Vitrina tipo isla en centro comercial premium. Espacio de 10m² perfecto para exhibición y venta temporal de productos exclusivos, relojes, cosméticos o gadgets tecnológicos. Alta visibilidad garantizada.",
            type: "shop",
            location: { city: "Cancún", address: "La Isla Shopping Village, Zona Hotelera" },
            price: { amount: 700, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600",
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
            ],
        }),
        makeSpace({
            id: "space-shop-6",
            ownerId: "owner-ricardo",
            title: "Food truck spot - Parque público",
            description: "Espacio designado para food truck en parque con alta afluencia familiar. Incluye conexión eléctrica, acceso a agua y área de mesas compartidas. Perfecto para emprendedores gastronómicos que quieren probar conceptos nuevos.",
            type: "shop",
            location: { city: "Cancún", address: "Parque Las Palapas, Centro" },
            price: { amount: 400, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600",
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600"
            ],
        }),

        // ESPACIOS PARA EVENTOS
        makeSpace({
            id: "space-event-1",
            ownerId: "owner-gabriela",
            title: "Salón para bodas y eventos grandes - SM 45",
            description: "Salón elegante de 300m² con capacidad para 200 personas. Incluye escenario, pista de baile, iluminación profesional, sistema de audio, cocina industrial, baños amplios y estacionamiento privado. Ideal para bodas, graduaciones o eventos corporativos grandes.",
            type: "event_space",
            location: { city: "Cancún", address: "Av. Huayacán 567, Supermanzana 45" },
            price: { amount: 1500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600"
            ],
        }),
        makeSpace({
            id: "space-event-2",
            ownerId: "owner-alejandro",
            title: "Terraza lounge para eventos - Zona Hotelera",
            description: "Espacio moderno estilo lounge con vista al mar para eventos de hasta 100 personas. Barra completa, mobiliario lounge, DJ booth, iluminación LED y área VIP. Perfecto para fiestas privadas, lanzamientos o eventos corporativos.",
            type: "event_space",
            location: { city: "Cancún", address: "Boulevard Kukulcán Km 13, Zona Hotelera" },
            price: { amount: 4500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
                "https://images.unsplash.com/photo-1519167758481-83f29da8c8d0?w=600"
            ],
        }),

        // ESPACIOS PUBLICITARIOS
        makeSpace({
            id: "space-ad-1",
            ownerId: "owner-valeria",
            title: "Valla publicitaria digital - Aeropuerto",
            description: "Pantalla LED de alta definición en área de llegadas del aeropuerto internacional. Rotación cada 10 segundos. Impacto diario de 15,000+ viajeros. Ideal para marcas turísticas, hoteles o servicios premium.",
            type: "advertisement_spot",
            location: { city: "Cancún", address: "Aeropuerto Internacional, Terminal 3" },
            price: { amount: 3000, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
            ],
        }),
        makeSpace({
            id: "space-ad-2",
            ownerId: "owner-ricardo",
            title: "Valla en parada de autobús - Av. Tulum",
            description: "Espacio publicitario en parada de autobús con alta circulación peatonal y vehicular. Medidas 2x1.5 metros con iluminación. Ubicación estratégica en ruta principal. Cambio de publicidad incluido.",
            type: "advertisement_spot",
            location: { city: "Cancún", address: "Av. Tulum altura SM 5, Centro" },
            price: { amount: 800, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
            ],
        }),

        // MÁS ESPACIOS VARIADOS PARA COMPLETAR 50+ ESPACIOS
        makeSpace({
            id: "space-office-4",
            ownerId: "owner-diego",
            title: "Oficina ejecutiva con recepción - Torre corporativa",
            description: "Oficina premium de 45m² con recepción, área de espera, sala de juntas privada y dos estaciones de trabajo. Vista panorámica, mobiliario ejecutivo y servicio de recepcionista opcional.",
            type: "office",
            location: { city: "Cancún", address: "Torre Mezzo, Av. Bonampak 96" },
            price: { amount: 750, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600"
            ],
        }),
        makeSpace({
            id: "space-garage-4",
            ownerId: "owner-laura",
            title: "Garage compartido - Casa residencial",
            description: "Espacio en garage de casa residencial segura. Acceso controlado, bien iluminado y protegido de lluvia. Ideal para estacionamiento nocturno o por días.",
            type: "garage",
            location: { city: "Cancún", address: "Residencial Palmaris, SM 18" },
            price: { amount: 70, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
            ],
        }),
        makeSpace({
            id: "space-studio-4",
            ownerId: "owner-carmen",
            title: "Estudio de danza y yoga - 60m²",
            description: "Espacio amplio con piso de duela, espejos de pared completa, barras de ballet, sistema de audio y aire acondicionado. Perfecto para clases de danza, yoga, pilates o entrenamientos personales.",
            type: "studio",
            location: { city: "Cancún", address: "Av. López Portillo, SM 57" },
            price: { amount: 300, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600"
            ],
        }),
        makeSpace({
            id: "space-parking-3",
            ownerId: "owner-ricardo",
            title: "Cochera residencial - Acceso diario",
            description: "Espacio de estacionamiento en casa particular bien ubicada. Garage techado con portón eléctrico, seguro y limpio. Propietario está fuera durante el día, por lo que el espacio queda desocupado. Ideal para trabajadores de la zona o turistas.",
            type: "garage",
            location: { city: "Cancún", address: "Calle Margaritas 45, SM 26" },
            price: { amount: 90, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
            ],
        }),
        makeSpace({
            id: "space-hall-4",
            ownerId: "owner-patricia",
            title: "Auditorio con proyector - Universidad",
            description: "Auditorio con capacidad para 120 personas. Incluye proyector 4K, sistema de sonido profesional, micrófono inalámbrico, aire acondicionado y sillas tipo auditorio. Ideal para conferencias y presentaciones académicas.",
            type: "hall",
            location: { city: "Cancún", address: "Campus Universitario, SM 22" },
            price: { amount: 1500, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600"
            ],
        }),

        // ESPACIOS INFRAUTILIZADOS - EL VERDADERO DIFERENCIADOR
        makeSpace({
            id: "space-garage-5",
            ownerId: "owner-alejandro",
            title: "Cochera de casa - Dueño trabaja de día",
            description: "Garage completamente desocupado de 8am a 6pm mientras el dueño trabaja. Espacio techado, seguro y con portón eléctrico. Aprovecha este espacio que normalmente estaría vacío. Perfecto para quienes trabajan en la zona.",
            type: "garage",
            location: { city: "Cancún", address: "SM 19, Calle Pino 67" },
            price: { amount: 85, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600"
            ],
        }),
        makeSpace({
            id: "space-parking-4",
            ownerId: "owner-valeria",
            title: "Entrada de casa - Espacio sin usar",
            description: "Entrada pavimentada de casa particular que no se usa. El propietario no tiene auto, por lo que este espacio está siempre disponible. Ubicación céntrica y segura. Genera ingresos de un espacio que de otra forma estaría desaprovechado.",
            type: "parking_spot",
            location: { city: "Cancún", address: "SM 24, Av. Chichén Itzá 89" },
            price: { amount: 70, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600"
            ],
        }),
        makeSpace({
            id: "space-wall-4",
            ownerId: "owner-gabriela",
            title: "Pared lateral de edificio - Sin uso actual",
            description: "Muro lateral de edificio de 10x4 metros completamente desaprovechado. Excelente visibilidad desde avenida principal. El propietario decidió monetizar este espacio que llevaba años sin ningún uso. Instalación de publicidad incluida.",
            type: "wall",
            location: { city: "Cancún", address: "Av. Cobá 678, Centro" },
            price: { amount: 2200, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
            ],
        }),
        makeSpace({
            id: "space-warehouse-4",
            ownerId: "owner-fernando",
            title: "Cuarto de azotea - Espacio muerto convertido",
            description: "Cuarto de servicio en azotea que no se utilizaba. 25m² limpios y secos, perfectos para almacenamiento. El dueño lo acondicionó para generar ingresos de un espacio que estaba completamente olvidado. Acceso independiente por escalera externa.",
            type: "warehouse",
            location: { city: "Cancún", address: "SM 32, Calle Tulipanes 123" },
            price: { amount: 180, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
            ],
        }),
        makeSpace({
            id: "space-office-5",
            ownerId: "owner-laura",
            title: "Escritorio en oficina - Días específicos",
            description: "Escritorio privado en oficina compartida. El propietario solo lo usa lunes y viernes, dejando el espacio libre martes, miércoles y jueves. Incluye internet de alta velocidad, aire acondicionado y acceso a sala de juntas. ¡Aprovecha los días que no se usan!",
            type: "office",
            location: { city: "Cancún", address: "Torre Corporativa, Av. Bonampak 150" },
            price: { amount: 250, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
            ],
        }),
        makeSpace({
            id: "space-terrace-3",
            ownerId: "owner-carmen",
            title: "Terraza de edificio - Noches disponibles",
            description: "Terraza de edificio departamental que solo se usa ocasionalmente. El administrador abrió el espacio para eventos nocturnos y fines de semana, generando ingresos para el edificio. 80m² con vista a la ciudad, mesas y sillas incluidas.",
            type: "terrace",
            location: { city: "Cancún", address: "Edificio Solaris, SM 16" },
            price: { amount: 900, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
            ],
        }),
        makeSpace({
            id: "space-shop-7",
            ownerId: "owner-diego",
            title: "Vitrina de local cerrado - Fines de semana",
            description: "Local comercial que cierra sábados y domingos. El dueño renta su vitrina frontal para emprendedores que quieren exponer productos durante el fin de semana. Espacio de 8m² con mostrador y electricidad. ¡Monetiza espacios en días de cierre!",
            type: "shop",
            location: { city: "Cancún", address: "Plaza Nichupté, Local 45" },
            price: { amount: 380, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
            ],
        }),
        makeSpace({
            id: "space-garden-3",
            ownerId: "owner-patricia",
            title: "Jardín trasero - Eventos ocasionales",
            description: "Jardín de 100m² de casa familiar que solo se usa en ocasiones especiales. La familia decidió rentarlo para eventos cuando ellos no lo ocupan. Incluye área verde, asador de ladrillo y baño. Convierte tu jardín en una fuente de ingresos.",
            type: "garden",
            location: { city: "Cancún", address: "Residencial Las Palmas, SM 40" },
            price: { amount: 850, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
            ],
        }),
        makeSpace({
            id: "space-studio-5",
            ownerId: "owner-roberto",
            title: "Sótano acondicionado - Espacio rescatado",
            description: "Sótano de 35m² que era usado como bodega familiar. Se limpió, iluminó y acondicionó para crear un estudio de ensayo musical. Ahora genera ingresos constantes de un espacio que antes solo juntaba polvo. Insonorizado parcialmente.",
            type: "studio",
            location: { city: "Cancún", address: "SM 27, Calle Azucenas 34" },
            price: { amount: 280, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600"
            ],
        }),
        makeSpace({
            id: "space-rooftop-2",
            ownerId: "owner-alejandro",
            title: "Azotea de casa - Tardes y noches libres",
            description: "Azotea de 60m² que solo se usa en las mañanas para tender ropa. Disponible tardes, noches y fines de semana completos para sesiones fotográficas, pequeños eventos o clases al aire libre. Vista panorámica incluida.",
            type: "rooftop",
            location: { city: "Cancún", address: "SM 25, Calle Roble 88" },
            price: { amount: 400, currency: "MXN" },
            available: true,
            images: [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600"
            ],
        }),
    ];

    // Rentas variadas: pasadas (últimos 6 meses), actuales y futuras
    const rentals = [
        // ============ MAYO 2025 - Rentas pasadas ============
        {
            id: "rental-may-1",
            spaceId: "space-hall-1",
            renterId: "renter-lucia",
            dateRange: { start: isoDate(2025, 5, 8), end: isoDate(2025, 5, 8) },
            totalCost: 800
        },
        {
            id: "rental-may-2",
            spaceId: "space-garage-1",
            renterId: "renter-eduardo",
            dateRange: { start: isoDate(2025, 5, 10), end: isoDate(2025, 5, 15) },
            totalCost: 400
        },
        {
            id: "rental-may-3",
            spaceId: "space-studio-1",
            renterId: "renter-daniela",
            dateRange: { start: isoDate(2025, 5, 12), end: isoDate(2025, 5, 12) },
            totalCost: 450
        },
        {
            id: "rental-may-4",
            spaceId: "space-office-1",
            renterId: "renter-jorge",
            dateRange: { start: isoDate(2025, 5, 14), end: isoDate(2025, 5, 18) },
            totalCost: 1400
        },
        {
            id: "rental-may-5",
            spaceId: "space-wall-2",
            renterId: "renter-isabella",
            dateRange: { start: isoDate(2025, 5, 1), end: isoDate(2025, 5, 31) },
            totalCost: 55800
        },

        // ============ JUNIO 2025 ============
        {
            id: "rental-jun-1",
            spaceId: "space-shop-1",
            renterId: "renter-andres",
            dateRange: { start: isoDate(2025, 6, 5), end: isoDate(2025, 6, 10) },
            totalCost: 3600
        },
        {
            id: "rental-jun-2",
            spaceId: "space-hall-2",
            renterId: "renter-camila",
            dateRange: { start: isoDate(2025, 6, 12), end: isoDate(2025, 6, 12) },
            totalCost: 1200
        },
        {
            id: "rental-jun-3",
            spaceId: "space-garage-2",
            renterId: "renter-pablo",
            dateRange: { start: isoDate(2025, 6, 15), end: isoDate(2025, 6, 20) },
            totalCost: 750
        },
        {
            id: "rental-jun-4",
            spaceId: "space-studio-2",
            renterId: "renter-lucia",
            dateRange: { start: isoDate(2025, 6, 18), end: isoDate(2025, 6, 18) },
            totalCost: 550
        },
        {
            id: "rental-jun-5",
            spaceId: "space-office-2",
            renterId: "renter-eduardo",
            dateRange: { start: isoDate(2025, 6, 20), end: isoDate(2025, 6, 25) },
            totalCost: 900
        },
        {
            id: "rental-jun-6",
            spaceId: "space-terrace-1",
            renterId: "renter-daniela",
            dateRange: { start: isoDate(2025, 6, 22), end: isoDate(2025, 6, 22) },
            totalCost: 2500
        },

        // ============ JULIO 2025 ============
        {
            id: "rental-jul-1",
            spaceId: "space-warehouse-1",
            renterId: "renter-jorge",
            dateRange: { start: isoDate(2025, 7, 1), end: isoDate(2025, 7, 31) },
            totalCost: 10850
        },
        {
            id: "rental-jul-2",
            spaceId: "space-garden-1",
            renterId: "renter-isabella",
            dateRange: { start: isoDate(2025, 7, 8), end: isoDate(2025, 7, 8) },
            totalCost: 1500
        },
        {
            id: "rental-jul-3",
            spaceId: "space-shop-2",
            renterId: "renter-andres",
            dateRange: { start: isoDate(2025, 7, 10), end: isoDate(2025, 7, 20) },
            totalCost: 4950
        },
        {
            id: "rental-jul-4",
            spaceId: "space-parking-1",
            renterId: "renter-camila",
            dateRange: { start: isoDate(2025, 7, 12), end: isoDate(2025, 7, 26) },
            totalCost: 840
        },
        {
            id: "rental-jul-5",
            spaceId: "space-event-1",
            renterId: "renter-pablo",
            dateRange: { start: isoDate(2025, 7, 20), end: isoDate(2025, 7, 20) },
            totalCost: 3500
        },
        {
            id: "rental-jul-6",
            spaceId: "space-studio-3",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 7, 25), end: isoDate(2025, 7, 25) },
            totalCost: 650
        },

        // ============ AGOSTO 2025 ============
        {
            id: "rental-aug-1",
            spaceId: "space-shop-3",
            renterId: "renter-ana",
            dateRange: { start: isoDate(2025, 8, 1), end: isoDate(2025, 8, 7) },
            totalCost: 2450
        },
        {
            id: "rental-aug-2",
            spaceId: "space-office-3",
            renterId: "renter-sofia",
            dateRange: { start: isoDate(2025, 8, 5), end: isoDate(2025, 8, 5) },
            totalCost: 500
        },
        {
            id: "rental-aug-3",
            spaceId: "space-rooftop-1",
            renterId: "renter-miguel",
            dateRange: { start: isoDate(2025, 8, 10), end: isoDate(2025, 8, 10) },
            totalCost: 1800
        },
        {
            id: "rental-aug-4",
            spaceId: "space-hall-3",
            renterId: "renter-lucia",
            dateRange: { start: isoDate(2025, 8, 15), end: isoDate(2025, 8, 15) },
            totalCost: 600
        },
        {
            id: "rental-aug-5",
            spaceId: "space-warehouse-2",
            renterId: "renter-eduardo",
            dateRange: { start: isoDate(2025, 8, 18), end: isoDate(2025, 8, 25) },
            totalCost: 1400
        },
        {
            id: "rental-aug-6",
            spaceId: "space-ad-1",
            renterId: "renter-daniela",
            dateRange: { start: isoDate(2025, 8, 1), end: isoDate(2025, 8, 31) },
            totalCost: 93000
        },

        // ============ SEPTIEMBRE 2025 ============
        {
            id: "rental-sep-1",
            spaceId: "space-studio-1",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 9, 5), end: isoDate(2025, 9, 5) },
            totalCost: 450
        },
        {
            id: "rental-sep-2",
            spaceId: "space-garage-3",
            renterId: "renter-jorge",
            dateRange: { start: isoDate(2025, 9, 8), end: isoDate(2025, 9, 15) },
            totalCost: 700
        },
        {
            id: "rental-sep-3",
            spaceId: "space-office-1",
            renterId: "renter-sofia",
            dateRange: { start: isoDate(2025, 9, 12), end: isoDate(2025, 9, 20) },
            totalCost: 2800
        },
        {
            id: "rental-sep-4",
            spaceId: "space-terrace-2",
            renterId: "renter-isabella",
            dateRange: { start: isoDate(2025, 9, 18), end: isoDate(2025, 9, 18) },
            totalCost: 600
        },
        {
            id: "rental-sep-5",
            spaceId: "space-garden-2",
            renterId: "renter-andres",
            dateRange: { start: isoDate(2025, 9, 22), end: isoDate(2025, 9, 22) },
            totalCost: 2000
        },
        {
            id: "rental-sep-6",
            spaceId: "space-shop-2",
            renterId: "renter-camila",
            dateRange: { start: isoDate(2025, 9, 15), end: isoDate(2025, 9, 30) },
            totalCost: 12000
        },

        // ============ OCTUBRE 2025 ============
        {
            id: "rental-oct-1",
            spaceId: "space-garage-1",
            renterId: "renter-ana",
            dateRange: { start: isoDate(2025, 10, 2), end: isoDate(2025, 10, 8) },
            totalCost: 480
        },
        {
            id: "rental-oct-2",
            spaceId: "space-office-2",
            renterId: "renter-pablo",
            dateRange: { start: isoDate(2025, 10, 5), end: isoDate(2025, 10, 12) },
            totalCost: 1440
        },
        {
            id: "rental-oct-3",
            spaceId: "space-event-2",
            renterId: "renter-lucia",
            dateRange: { start: isoDate(2025, 10, 10), end: isoDate(2025, 10, 10) },
            totalCost: 4500
        },
        {
            id: "rental-oct-4",
            spaceId: "space-studio-4",
            renterId: "renter-eduardo",
            dateRange: { start: isoDate(2025, 10, 15), end: isoDate(2025, 10, 22) },
            totalCost: 2100
        },
        {
            id: "rental-oct-5",
            spaceId: "space-warehouse-3",
            renterId: "renter-daniela",
            dateRange: { start: isoDate(2025, 10, 18), end: isoDate(2025, 10, 25) },
            totalCost: 4550
        },
        {
            id: "rental-oct-6",
            spaceId: "space-wall-1",
            renterId: "renter-jorge",
            dateRange: { start: isoDate(2025, 10, 1), end: isoDate(2025, 10, 31) },
            totalCost: 77500
        },
        
        // ============ Rentas actuales/próximas (finales de octubre) ============
        {
            id: "rental-oct-7",
            spaceId: "space-hall-1",
            renterId: "renter-miguel",
            dateRange: { start: isoDate(2025, 10, 28), end: isoDate(2025, 10, 28) },
            totalCost: 800
        },
        {
            id: "rental-oct-8",
            spaceId: "space-office-4",
            renterId: "renter-isabella",
            dateRange: { start: isoDate(2025, 10, 29), end: isoDate(2025, 10, 30) },
            totalCost: 1500
        },

        // ============ NOVIEMBRE 2025 - Rentas futuras ============
        {
            id: "rental-nov-1",
            spaceId: "space-studio-2",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 11, 2), end: isoDate(2025, 11, 2) },
            totalCost: 550
        },
        {
            id: "rental-nov-2",
            spaceId: "space-garage-2",
            renterId: "renter-ana",
            dateRange: { start: isoDate(2025, 11, 5), end: isoDate(2025, 11, 10) },
            totalCost: 750
        },
        {
            id: "rental-nov-3",
            spaceId: "space-hall-2",
            renterId: "renter-sofia",
            dateRange: { start: isoDate(2025, 11, 8), end: isoDate(2025, 11, 8) },
            totalCost: 1200
        },
        {
            id: "rental-nov-4",
            spaceId: "space-parking-2",
            renterId: "renter-miguel",
            dateRange: { start: isoDate(2025, 11, 10), end: isoDate(2025, 11, 17) },
            totalCost: 840
        },
        {
            id: "rental-nov-5",
            spaceId: "space-parking-3",
            renterId: "renter-lucia",
            dateRange: { start: isoDate(2025, 11, 12), end: isoDate(2025, 11, 20) },
            totalCost: 810
        },
        {
            id: "rental-nov-6",
            spaceId: "space-shop-3",
            renterId: "renter-eduardo",
            dateRange: { start: isoDate(2025, 11, 15), end: isoDate(2025, 11, 30) },
            totalCost: 9750
        },
        {
            id: "rental-nov-7",
            spaceId: "space-ad-2",
            renterId: "renter-daniela",
            dateRange: { start: isoDate(2025, 11, 1), end: isoDate(2025, 11, 30) },
            totalCost: 24000
        },
        {
            id: "rental-nov-8",
            spaceId: "space-hall-4",
            renterId: "renter-jorge",
            dateRange: { start: isoDate(2025, 11, 20), end: isoDate(2025, 11, 20) },
            totalCost: 1500
        },

        // ============ DICIEMBRE 2025 - Futuras ============
        {
            id: "rental-dec-1",
            spaceId: "space-event-1",
            renterId: "renter-isabella",
            dateRange: { start: isoDate(2025, 12, 5), end: isoDate(2025, 12, 5) },
            totalCost: 3500
        },
        {
            id: "rental-dec-2",
            spaceId: "space-terrace-1",
            renterId: "renter-andres",
            dateRange: { start: isoDate(2025, 12, 10), end: isoDate(2025, 12, 10) },
            totalCost: 2500
        },
        {
            id: "rental-dec-3",
            spaceId: "space-garden-1",
            renterId: "renter-camila",
            dateRange: { start: isoDate(2025, 12, 15), end: isoDate(2025, 12, 15) },
            totalCost: 1500
        },
        {
            id: "rental-dec-4",
            spaceId: "space-wall-3",
            renterId: "renter-pablo",
            dateRange: { start: isoDate(2025, 12, 1), end: isoDate(2025, 12, 31) },
            totalCost: 155000
        },
        {
            id: "rental-dec-5",
            spaceId: "space-warehouse-2",
            renterId: "renter-carlos",
            dateRange: { start: isoDate(2025, 12, 20), end: isoDate(2025, 12, 27) },
            totalCost: 1600
        },
    ];

    // Reviews completas y variadas (últimos 6 meses de actividad)
    const reviews = [
        // ============ MAYO 2025 ============
        {
            id: "rev-may-1",
            reviewerId: "renter-lucia",
            reviewedUserId: "owner-maria",
            rating: 5,
            comment: "El salón ejecutivo es perfecto. Excelente iluminación y el proyector funcionó sin problemas. María fue muy atenta con todos los detalles de mi capacitación.",
            date: isoDate(2025, 5, 9)
        },
        {
            id: "rev-may-2",
            reviewerId: "owner-maria",
            reviewedUserId: "renter-lucia",
            rating: 5,
            comment: "Lucia es muy organizada y profesional. Dejó todo impecable y respetó los horarios al pie de la letra. Excelente inquilina.",
            date: isoDate(2025, 5, 9)
        },
        {
            id: "rev-may-3",
            reviewerId: "renter-eduardo",
            reviewedUserId: "owner-juan",
            rating: 5,
            comment: "Cochera super segura y accesible. Juan siempre respondió rápido mis mensajes. Volveré a rentar sin duda.",
            date: isoDate(2025, 5, 16)
        },
        {
            id: "rev-may-4",
            reviewerId: "renter-daniela",
            reviewedUserId: "owner-juan",
            rating: 5,
            comment: "El estudio de fotografía tiene todo el equipo que necesitas. Muy profesional y el espacio es amplio. ¡Recomendadísimo!",
            date: isoDate(2025, 5, 13)
        },
        {
            id: "rev-may-5",
            reviewerId: "owner-juan",
            reviewedUserId: "renter-daniela",
            rating: 5,
            comment: "Daniela cuidó el equipo como si fuera suyo. Muy profesional en su trabajo fotográfico. Bienvenida siempre.",
            date: isoDate(2025, 5, 13)
        },

        // ============ JUNIO 2025 ============
        {
            id: "rev-jun-1",
            reviewerId: "renter-andres",
            reviewedUserId: "owner-patricia",
            rating: 5,
            comment: "La habitación es muy cómoda y el baño privado es un plus. Patricia fue super amable y me hizo sentir como en casa.",
            date: isoDate(2025, 6, 11)
        },
        {
            id: "rev-jun-2",
            reviewerId: "renter-camila",
            reviewedUserId: "owner-diego",
            rating: 5,
            comment: "El salón para eventos es espectacular. Perfecto para mi baby shower. Diego nos ayudó con la decoración y todo salió increíble.",
            date: isoDate(2025, 6, 13)
        },
        {
            id: "rev-jun-3",
            reviewerId: "owner-diego",
            reviewedUserId: "renter-camila",
            rating: 5,
            comment: "Camila y su familia fueron muy respetuosos. Dejaron el espacio limpio y ordenado. Excelentes inquilinos.",
            date: isoDate(2025, 6, 13)
        },
        {
            id: "rev-jun-4",
            reviewerId: "renter-pablo",
            reviewedUserId: "owner-roberto",
            rating: 4,
            comment: "Buena cochera en zona hotelera. Un poco cara pero vale la pena por la ubicación y seguridad. Roberto fue muy profesional.",
            date: isoDate(2025, 6, 21)
        },
        {
            id: "rev-jun-5",
            reviewerId: "renter-lucia",
            reviewedUserId: "owner-roberto",
            rating: 5,
            comment: "El estudio de grabación es de primera. El equipo de audio está impecable y la insonorización es perfecta. Volveré para mi siguiente podcast.",
            date: isoDate(2025, 6, 19)
        },

        // ============ JULIO 2025 ============
        {
            id: "rev-jul-1",
            reviewerId: "renter-jorge",
            reviewedUserId: "owner-alejandro",
            rating: 5,
            comment: "La bodega es perfecta para mi negocio. Amplia, segura y con buen acceso. Alejandro fue muy flexible con el contrato mensual.",
            date: isoDate(2025, 8, 1)
        },
        {
            id: "rev-jul-2",
            reviewerId: "owner-alejandro",
            reviewedUserId: "renter-jorge",
            rating: 5,
            comment: "Jorge es un inquilino modelo. Paga puntual y mantiene la bodega ordenada. Excelente persona para trabajar.",
            date: isoDate(2025, 8, 1)
        },
        {
            id: "rev-jul-3",
            reviewerId: "renter-isabella",
            reviewedUserId: "owner-gabriela",
            rating: 5,
            comment: "El jardín es un sueño para eventos. Mis invitados quedaron encantados con el ambiente tropical. Gabriela fue una anfitriona increíble.",
            date: isoDate(2025, 7, 9)
        },
        {
            id: "rev-jul-4",
            reviewerId: "renter-andres",
            reviewedUserId: "owner-carmen",
            rating: 4,
            comment: "Buen local comercial en plaza transitada. Hubo un pequeño problema con el aire acondicionado pero Carmen lo resolvió rápido.",
            date: isoDate(2025, 7, 21)
        },
        {
            id: "rev-jul-5",
            reviewerId: "renter-pablo",
            reviewedUserId: "owner-gabriela",
            rating: 5,
            comment: "El salón para bodas es espectacular. Tenía todo lo que necesitábamos y más. El evento fue un éxito total. ¡Gracias Gabriela!",
            date: isoDate(2025, 7, 21)
        },

        // ============ AGOSTO 2025 ============
        {
            id: "rev-aug-1",
            reviewerId: "renter-ana",
            reviewedUserId: "owner-fernando",
            rating: 5,
            comment: "La suite estilo hotel es hermosa. Vista al mar parcial pero muy agradable. Fernando fue muy atento y todo estuvo perfecto.",
            date: isoDate(2025, 8, 8)
        },
        {
            id: "rev-aug-2",
            reviewerId: "owner-fernando",
            reviewedUserId: "renter-ana",
            rating: 5,
            comment: "Ana fue una huésped excelente. Muy cuidadosa con el espacio y comunicación fluida. Siempre bienvenida.",
            date: isoDate(2025, 8, 8)
        },
        {
            id: "rev-aug-3",
            reviewerId: "renter-sofia",
            reviewedUserId: "owner-diego",
            rating: 5,
            comment: "La sala de juntas ejecutiva es de lujo. Perfecta para mi reunión con clientes importantes. Diego preparó todo impecable.",
            date: isoDate(2025, 8, 6)
        },
        {
            id: "rev-aug-4",
            reviewerId: "renter-miguel",
            reviewedUserId: "owner-fernando",
            rating: 5,
            comment: "La azotea urbana superó mis expectativas. Ambiente increíble para nuestro evento corporativo. Todo el equipo quedó fascinado.",
            date: isoDate(2025, 8, 11)
        },
        {
            id: "rev-aug-5",
            reviewerId: "renter-lucia",
            reviewedUserId: "owner-roberto",
            rating: 5,
            comment: "El salón boutique es perfecto para eventos pequeños. Elegante y bien equipado. Roberto fue muy profesional con todo.",
            date: isoDate(2025, 8, 16)
        },
        {
            id: "rev-aug-6",
            reviewerId: "renter-eduardo",
            reviewedUserId: "owner-ricardo",
            rating: 4,
            comment: "La mini bodega climatizada cumplió su función. Buena para documentos. El acceso 24/7 es muy conveniente.",
            date: isoDate(2025, 8, 26)
        },

        // ============ SEPTIEMBRE 2025 ============
        {
            id: "rev-sep-1",
            reviewerId: "renter-carlos",
            reviewedUserId: "owner-juan",
            rating: 5,
            comment: "Excelente estudio de fotografía. El equipo de iluminación está en perfectas condiciones y el espacio es muy profesional. Juan fue muy atento y flexible con los horarios.",
            date: isoDate(2025, 9, 6)
        },
        {
            id: "rev-sep-2",
            reviewerId: "owner-juan",
            reviewedUserId: "renter-carlos",
            rating: 5,
            comment: "Carlos es muy profesional y cuidadoso con el equipo. Excelente comunicación y puntualidad. Bienvenido cuando lo necesite.",
            date: isoDate(2025, 9, 6)
        },
        {
            id: "rev-sep-3",
            reviewerId: "renter-jorge",
            reviewedUserId: "owner-laura",
            rating: 5,
            comment: "Cochera amplia perfecta para mi camioneta. Laura fue muy amable y el espacio está bien cuidado y seguro.",
            date: isoDate(2025, 9, 16)
        },
        {
            id: "rev-sep-4",
            reviewerId: "renter-sofia",
            reviewedUserId: "owner-maria",
            rating: 4,
            comment: "La oficina está bien equipada y la ubicación es excelente. El único detalle es que el internet falló por unos minutos, pero en general todo muy bien.",
            date: isoDate(2025, 9, 21)
        },
        {
            id: "rev-sep-5",
            reviewerId: "owner-maria",
            reviewedUserId: "renter-sofia",
            rating: 5,
            comment: "Sofía es una inquilina excelente. Dejó el espacio impecable y respetó todos los horarios. Muy recomendable.",
            date: isoDate(2025, 9, 21)
        },
        {
            id: "rev-sep-6",
            reviewerId: "renter-isabella",
            reviewedUserId: "owner-patricia",
            rating: 5,
            comment: "Terraza perfecta para mi parrillada familiar. El asador funcionó genial y el espacio es muy acogedor. Patricia fue super flexible.",
            date: isoDate(2025, 9, 19)
        },
        {
            id: "rev-sep-7",
            reviewerId: "renter-andres",
            reviewedUserId: "owner-alejandro",
            rating: 5,
            comment: "El jardín con alberca es una joya. Mis invitados la pasaron increíble. Todo limpio y bien mantenido. Alejandro fue excelente anfitrión.",
            date: isoDate(2025, 9, 23)
        },

        // ============ OCTUBRE 2025 ============
        {
            id: "rev-oct-1",
            reviewerId: "renter-ana",
            reviewedUserId: "owner-juan",
            rating: 5,
            comment: "Cochera segura y bien ubicada. El acceso es muy fácil y la vigilancia te da tranquilidad. Definitivamente volveré a rentar cuando visite Cancún.",
            date: isoDate(2025, 10, 9)
        },
        {
            id: "rev-oct-2",
            reviewerId: "owner-juan",
            reviewedUserId: "renter-ana",
            rating: 5,
            comment: "Ana fue muy puntual y respetuosa. Sin problemas en absoluto. Bienvenida siempre que lo necesite.",
            date: isoDate(2025, 10, 9)
        },
        {
            id: "rev-oct-3",
            reviewerId: "renter-pablo",
            reviewedUserId: "owner-gabriela",
            rating: 5,
            comment: "El cuarto tipo loft es hermoso. Diseño moderno y super funcional. Gabriela fue muy atenta con todos los detalles.",
            date: isoDate(2025, 10, 13)
        },
        {
            id: "rev-oct-4",
            reviewerId: "renter-lucia",
            reviewedUserId: "owner-alejandro",
            rating: 5,
            comment: "La terraza lounge con vista al mar es impresionante. El evento fue todo un éxito. Alejandro se encargó de todo profesionalmente.",
            date: isoDate(2025, 10, 11)
        },
        {
            id: "rev-oct-5",
            reviewerId: "renter-eduardo",
            reviewedUserId: "owner-carmen",
            rating: 5,
            comment: "El estudio de danza es perfecto. Espejos amplios, buen sonido y piso en excelente estado. Carmen fue muy amable.",
            date: isoDate(2025, 10, 23)
        },
        {
            id: "rev-oct-6",
            reviewerId: "renter-daniela",
            reviewedUserId: "owner-valeria",
            rating: 4,
            comment: "La bodega mega es espaciosa y bien ubicada. Tuvo un pequeño retraso en la entrega de llaves pero Valeria lo compensó con buen servicio.",
            date: isoDate(2025, 10, 26)
        },
        {
            id: "rev-oct-7",
            reviewerId: "renter-miguel",
            reviewedUserId: "owner-diego",
            rating: 5,
            comment: "El salón superó mis expectativas. Perfecto para mi evento corporativo. Diego fue muy profesional y nos ayudó con todo. ¡Altamente recomendado!",
            date: isoDate(2025, 10, 29)
        },
        {
            id: "rev-oct-8",
            reviewerId: "owner-diego",
            reviewedUserId: "renter-miguel",
            rating: 5,
            comment: "Miguel y su equipo fueron muy organizados y profesionales. Dejaron todo limpio. Excelente experiencia trabajar con ellos.",
            date: isoDate(2025, 10, 29)
        },

        // Reviews de propietarios hacia sus inquilinos (aumentar diversidad)
        {
            id: "rev-owner-1",
            reviewerId: "owner-patricia",
            reviewedUserId: "renter-andres",
            rating: 5,
            comment: "Andrés fue un huésped ejemplar. Muy respetuoso y ordenado. Lo recomiendo ampliamente.",
            date: isoDate(2025, 6, 11)
        },
        {
            id: "rev-owner-2",
            reviewerId: "owner-roberto",
            reviewedUserId: "renter-pablo",
            rating: 5,
            comment: "Pablo cuidó muy bien el espacio. Comunicación excelente y sin problemas. Bienvenido cuando guste.",
            date: isoDate(2025, 6, 21)
        },
        {
            id: "rev-owner-3",
            reviewerId: "owner-gabriela",
            reviewedUserId: "renter-isabella",
            rating: 5,
            comment: "Isabella y sus invitados fueron muy cuidadosos con el jardín. Todo quedó impecable. ¡Gracias!",
            date: isoDate(2025, 7, 9)
        },
        {
            id: "rev-owner-4",
            reviewerId: "owner-carmen",
            reviewedUserId: "renter-andres",
            rating: 4,
            comment: "Buen inquilino en general. Hubo un pequeño retraso en la salida pero nada grave. Lo recomiendo.",
            date: isoDate(2025, 7, 21)
        },
        {
            id: "rev-owner-5",
            reviewerId: "owner-gabriela",
            reviewedUserId: "renter-pablo",
            rating: 5,
            comment: "Pablo organizó un evento hermoso. Muy profesional y respetuoso con las instalaciones. Excelente experiencia.",
            date: isoDate(2025, 7, 21)
        },
        {
            id: "rev-owner-6",
            reviewerId: "owner-diego",
            reviewedUserId: "renter-sofia",
            rating: 5,
            comment: "Sofía fue muy profesional. La reunión se desarrolló perfectamente y dejó todo ordenado. 10/10",
            date: isoDate(2025, 8, 6)
        },
        {
            id: "rev-owner-7",
            reviewerId: "owner-fernando",
            reviewedUserId: "renter-miguel",
            rating: 5,
            comment: "Miguel y su equipo fueron excelentes. Evento bien organizado y sin contratiempos. Los recibiría nuevamente.",
            date: isoDate(2025, 8, 11)
        },
        {
            id: "rev-owner-8",
            reviewerId: "owner-roberto",
            reviewedUserId: "renter-lucia",
            rating: 5,
            comment: "Lucia es muy profesional con su trabajo de audio. Cuidó el equipo perfectamente. Bienvenida siempre.",
            date: isoDate(2025, 8, 16)
        },
        {
            id: "rev-owner-9",
            reviewerId: "owner-laura",
            reviewedUserId: "renter-jorge",
            rating: 5,
            comment: "Jorge es muy responsable. Cuida bien el espacio y siempre avisa cuando llega o sale. Excelente inquilino.",
            date: isoDate(2025, 9, 16)
        },
        {
            id: "rev-owner-10",
            reviewerId: "owner-patricia",
            reviewedUserId: "renter-isabella",
            rating: 5,
            comment: "Isabella fue una excelente inquilina. Dejó la terraza impecable y respetó todos los acuerdos. Muy recomendable.",
            date: isoDate(2025, 9, 19)
        },
        {
            id: "rev-owner-11",
            reviewerId: "owner-alejandro",
            reviewedUserId: "renter-andres",
            rating: 5,
            comment: "Andrés y sus invitados se portaron de maravilla. Dejaron el jardín limpio y ordenado. Gran experiencia.",
            date: isoDate(2025, 9, 23)
        },
        {
            id: "rev-owner-12",
            reviewerId: "owner-gabriela",
            reviewedUserId: "renter-pablo",
            rating: 5,
            comment: "Pablo fue muy organizado y profesional. El loft quedó en perfectas condiciones. Lo recomiendo ampliamente.",
            date: isoDate(2025, 10, 13)
        },
        {
            id: "rev-owner-13",
            reviewerId: "owner-alejandro",
            reviewedUserId: "renter-lucia",
            rating: 5,
            comment: "Lucia organizó un evento increíble. Muy profesional y respetuosa. Sin duda la mejor inquilina.",
            date: isoDate(2025, 10, 11)
        },
        {
            id: "rev-owner-14",
            reviewerId: "owner-carmen",
            reviewedUserId: "renter-eduardo",
            rating: 5,
            comment: "Eduardo fue muy cuidadoso con el estudio de danza. Respetó horarios y dejó todo ordenado. Excelente.",
            date: isoDate(2025, 10, 23)
        },
        {
            id: "rev-owner-15",
            reviewerId: "owner-valeria",
            reviewedUserId: "renter-daniela",
            rating: 5,
            comment: "Daniela es una inquilina responsable. Mantiene la bodega ordenada y paga puntual. Muy profesional.",
            date: isoDate(2025, 10, 26)
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
