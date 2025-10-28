import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => (
  <div className="flex flex-col min-h-screen font-sans text-grayDark">

    {/* Hero Section con fondo */}
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center text-white">
      <img
        src="https://a.cdn-hotels.com/gdcs/production66/d1089/8602ddc0-da82-4e39-b640-a623012f49a6.jpg" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div> {/* overlay oscuro */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Bienvenido a SpaceShare</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Ofrece o renta espacios temporales de manera fácil, rápida y segura. Encuentra el lugar perfecto para tus proyectos en Cancún.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/owner"
            className="bg-secondary hover:bg-[#00917f] px-6 py-3 rounded text-lg font-semibold transition"
          >
            Soy Arrendador
          </Link>
          <Link
            to="/renter"
            className="bg-accent hover:bg-[#e05555] px-6 py-3 rounded text-lg font-semibold transition"
          >
            Soy Rentador
          </Link>
        </div>
      </div>
    </section>

    {/* Beneficios / Características */}
    <section className="bg-grayLight py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir SpaceShare?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="h-24 w-24 bg-secondary rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">🏠</div>
          <h3 className="font-semibold text-xl mb-2">Fácil de Usar</h3>
          <p className="text-grayMedium">Publica o encuentra espacios en minutos sin complicaciones técnicas.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="h-24 w-24 bg-highlight rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">💰</div>
          <h3 className="font-semibold text-xl mb-2">Transacciones Seguras</h3>
          <p className="text-grayMedium">Pagos confiables y temporales que te dan tranquilidad en cada renta.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="h-24 w-24 bg-accent rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">📍</div>
          <h3 className="font-semibold text-xl mb-2">Ubicación Ideal</h3>
          <p className="text-grayMedium">Explora espacios disponibles en Cancún y elige el que mejor se adapte a ti.</p>
        </div>
      </div>
    </section>

    {/* Cómo funciona */}
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
        <div>
          <div className="h-40 w-full bg-gray-300 rounded mb-4"></div>
          <h3 className="font-semibold text-xl mb-2">1. Publica tu espacio</h3>
          <p className="text-grayMedium">Agrega detalles de tu lugar y disponibilidad en pocos pasos.</p>
        </div>
        <div>
          <div className="h-40 w-full bg-gray-300 rounded mb-4"></div>
          <h3 className="font-semibold text-xl mb-2">2. Encuentra tu espacio</h3>
          <p className="text-grayMedium">Busca espacios según tus necesidades y fechas disponibles.</p>
        </div>
        <div>
          <div className="h-40 w-full bg-gray-300 rounded mb-4"></div>
          <h3 className="font-semibold text-xl mb-2">3. Reserva y disfruta</h3>
          <p className="text-grayMedium">Realiza la renta de forma segura y disfruta de tu espacio temporal.</p>
        </div>
      </div>
    </section>

    {/* Espacios destacados */}
    <section className="bg-grayLight py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Espacios Destacados</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-2">Cocheras en Cancún Centro</h3>
            <p className="text-grayMedium mb-2">Seguras y accesibles para tu vehículo.</p>
            <p className="font-bold text-secondary">$150 MXN / hora</p>
          </div>
        </div>
        <div className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-2">Salones para eventos</h3>
            <p className="text-grayMedium mb-2">Perfectos para reuniones o talleres.</p>
            <p className="font-bold text-secondary">$500 MXN / hora</p>
          </div>
        </div>
        <div className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-2">Paredes para publicidad</h3>
            <p className="text-grayMedium mb-2">Ubicaciones estratégicas en Cancún.</p>
            <p className="font-bold text-secondary">$300 MXN / día</p>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonios */}
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <p className="text-grayMedium mb-4">"Gracias a SpaceShare encontré el lugar perfecto para grabar mi videoclip sin complicaciones."</p>
          <h3 className="font-semibold text-lg">- Carlos M.</h3>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <p className="text-grayMedium mb-4">"Rentar mi cochera fue muy fácil y rápido, totalmente confiable."</p>
          <h3 className="font-semibold text-lg">- Ana P.</h3>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <p className="text-grayMedium mb-4">"Los espacios son de calidad y la plataforma muy intuitiva."</p>
          <h3 className="font-semibold text-lg">- Luis G.</h3>
        </div>
      </div>
    </section>

    {/* CTA final */}
    <section className="py-20 px-6 flex flex-col items-center text-center bg-primary text-white">
      <h2 className="text-3xl font-bold mb-6">¡Empieza a compartir o rentar hoy!</h2>
      <div className="flex space-x-4">
        <Link
          to="/owner"
          className="bg-secondary hover:bg-[#00917f] px-8 py-4 rounded text-lg font-semibold transition"
        >
          Publica tu espacio
        </Link>
        <Link
          to="/renter"
          className="bg-accent hover:bg-[#e05555] px-8 py-4 rounded text-lg font-semibold transition"
        >
          Encuentra un espacio
        </Link>
      </div>
    </section>
  </div>
);
