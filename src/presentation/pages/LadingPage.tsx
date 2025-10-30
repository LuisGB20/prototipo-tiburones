import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import testimonio1 from "../../assets/leyva.jpeg";
import testimonio2 from "../../assets/diego.jpeg";
import testimonio3 from "../../assets/coronado.jpeg";


export const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Gracias a MeXpace encontré el lugar perfecto para grabar mi videoclip sin complicaciones. La plataforma es súper intuitiva y los propietarios muy profesionales.",
      author: "Carlos M.",
      role: "Director de Video",
      rating: 5,
      image: testimonio1
    },
    {
      text: "Rentar mi cochera fue muy fácil y rápido, totalmente confiable. Ahora genero ingresos pasivos mientras no uso mi espacio. ¡Increíble!",
      author: "Ana P.",
      role: "Propietaria",
      rating: 5,
      image: testimonio2
    },
    {
      text: "Los espacios son de calidad y la plataforma muy intuitiva. He rentado varios lugares para mis eventos y siempre una experiencia 10/10.",
      author: "Luis G.",
      role: "Organizador de Eventos",
      rating: 5,
      image: testimonio3
    }
  ];

  const stats = [
    { number: "500+", label: "Espacios Activos" },
    { number: "1,200+", label: "Usuarios Registrados" },
    { number: "4.8/5", label: "Calificación Promedio" },
    { number: "98%", label: "Tasa de Satisfacción" }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Publicación Instantánea",
      description: "Publica tu espacio en menos de 5 minutos con nuestro sistema intuitivo y eficiente"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Seguridad Garantizada",
      description: "Pagos protegidos y verificación de usuarios para garantizar transacciones seguras"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Monetización Efectiva",
      description: "Genera ingresos pasivos optimizando el uso de tus espacios disponibles"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Ubicaciones Estratégicas",
      description: "Accede a espacios en las zonas más demandadas y estratégicas de Cancún"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Confirmación Inmediata",
      description: "Sistema de reservación instantánea sin tiempos de espera ni procesos complejos"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Búsqueda Avanzada",
      description: "Filtros especializados para encontrar exactamente el espacio que necesitas"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Crea tu cuenta gratis",
      description: "Regístrate en menos de 2 minutos y accede a todas las funcionalidades",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400"
    },
    {
      step: "2",
      title: "Publica o busca espacios",
      description: "Sube tu espacio con fotos o explora nuestra amplia variedad de opciones",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
    },
    {
      step: "3",
      title: "Conecta y reserva",
      description: "Comunícate directamente y confirma tu reserva de forma segura e instantánea",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
    }
  ];

  const categories = [
    { 
      name: "Cocheras", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      count: "150+", 
      price: "Desde $100/hora"
    },
    { 
      name: "Salones", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      count: "80+", 
      price: "Desde $400/hora"
    },
    { 
      name: "Oficinas", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      count: "120+", 
      price: "Desde $250/hora"
    },
    { 
      name: "Estudios", 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      count: "60+", 
      price: "Desde $300/hora"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Profesional y Corporativo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            className="w-full h-full object-cover"
            alt="Cancún cityscape"
          />
        </div>

        {/* Content */}
        <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20">
            <span className="text-primary font-semibold text-xs sm:text-sm">Plataforma líder en gestión de espacios</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Conectamos espacios
            <br />
            <span className="text-primary">
              con oportunidades
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Solución integral para la gestión y renta de espacios temporales en Cancún.
            <br className="hidden sm:block" />
            <strong className="text-white">Profesional. Confiable. Eficiente.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
            <Link
              to="/register"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center">
                Comenzar ahora
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              to="/spaces"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-lg font-semibold text-base sm:text-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 active:scale-95"
            >
              Explorar espacios
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categorías - Acceso rápido */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
              Categorías de espacios
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Descubre las opciones disponibles en nuestra plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/spaces"
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 active:scale-95 overflow-hidden"
              >
                <div className="p-6 sm:p-8 text-center flex flex-col items-center h-full">
                  {/* Icono centrado con fondo */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 sm:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {category.icon}
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Contador */}
                  <div className="mb-2">
                    <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-700 font-semibold text-sm sm:text-base">
                      {category.count} disponibles
                    </span>
                  </div>
                  
                  {/* Precio */}
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    {category.price}
                  </p>
                  
                  {/* Separador */}
                  <div className="w-full h-px bg-gray-200 mb-4"></div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-center text-sm sm:text-base font-semibold text-primary group-hover:text-secondary transition-colors">
                    Ver más espacios
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Beneficios Clave */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
              Ventajas competitivas
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Características que nos diferencian en el mercado
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Proceso simple */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
              Proceso de inicio
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Tres pasos para comenzar a utilizar la plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line - Only on desktop */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 left-[60%] w-[80%] h-0.5 bg-gray-300 z-0"></div>
                )}
                
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 z-10 border border-gray-100">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg sm:text-xl font-bold text-white">{item.step}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 px-4">
            <Link
              to="/register"
              className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-semibold text-base sm:text-lg shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300 active:scale-95"
            >
              Crear cuenta gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Prueba social */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
              Testimonios de clientes
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Experiencias de usuarios de la plataforma
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 md:p-12 shadow-md border border-gray-200">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-2">
                  "{testimonials[activeTestimonial].text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].author}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 shadow-md"
                  />
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonials[activeTestimonial].author}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeTestimonial ? "bg-primary w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto">
            <div className="text-center p-4 sm:p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Verificación</p>
              <p className="text-xs sm:text-sm text-gray-600">Usuarios verificados</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Seguridad</p>
              <p className="text-xs sm:text-sm text-gray-600">Pagos protegidos</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Rapidez</p>
              <p className="text-xs sm:text-sm text-gray-600">Respuesta inmediata</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Confiabilidad</p>
              <p className="text-xs sm:text-sm text-gray-600">98% satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920"
            className="w-full h-full object-cover"
            alt="Office space"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
            Comience a utilizar la plataforma
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
            Únase a más de 1,200 usuarios que ya están optimizando sus espacios
            <br className="hidden sm:block" />
            o encontrando ubicaciones ideales para sus necesidades
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
            <Link
              to="/register"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-primary text-white rounded-lg font-semibold text-base sm:text-lg shadow-xl hover:bg-primary/90 transition-all duration-300 active:scale-95"
            >
              Crear cuenta
            </Link>
            
            <Link
              to="/spaces"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-gray-900 rounded-lg font-semibold text-base sm:text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 active:scale-95"
            >
              Ver espacios disponibles
            </Link>
          </div>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-2 text-gray-400 px-4">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm">Registro gratuito • Sin compromiso inicial</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 px-4">
              Preguntas frecuentes
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Información relevante sobre el funcionamiento de la plataforma
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "¿Cuál es el costo de utilizar la plataforma?",
                a: "El registro y publicación de espacios es gratuito. Se aplica una comisión únicamente cuando se concreta una transacción de renta."
              },
              {
                q: "¿Cómo se procesan los pagos?",
                a: "Los pagos se procesan de forma segura a través de nuestra plataforma. Los fondos se liberan al propietario una vez confirmada la prestación del servicio."
              },
              {
                q: "¿Existe una política de cancelación?",
                a: "Sí, contamos con políticas de cancelación flexibles. Se recomienda consultar los términos específicos de cada espacio antes de realizar una reservación."
              },
              {
                q: "¿Cómo se verifica la identidad de los usuarios?",
                a: "Todos los usuarios deben completar un proceso de verificación de identidad para garantizar la seguridad y confiabilidad de las transacciones."
              },
              {
                q: "¿Qué tipos de espacios están disponibles?",
                a: "La plataforma ofrece una amplia variedad de espacios: cocheras, oficinas, salones para eventos, estudios, áreas de almacenamiento, entre otros."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 hover:border-primary transition-all cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 cursor-pointer list-none text-sm sm:text-base">
                  <span className="pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 sm:mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
