import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto de scroll para cambiar el header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/login");
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo con diseño mejorado */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <img 
                src="/src/assets/logo_SpaceShare.png" 
                alt="MeXpace Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg" 
              />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent group-hover:from-secondary group-hover:via-primary group-hover:to-secondary transition-all duration-300">
              MeXpace
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActivePath("/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/spaces"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActivePath("/spaces")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              }`}
            >
              Explorar Espacios
            </Link>

            {user && user.role === "owner" && (
              <Link
                to="/my-spaces"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActivePath("/my-spaces")
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
              >
                Mis Espacios
              </Link>
            )}

            {user && user.role === "renter" && (
              <Link
                to="/my-reservations"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActivePath("/my-reservations")
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
              >
                Mis Reservas
              </Link>
            )}
          </nav>

          {/* Botones de autenticación y usuario */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-semibold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role === "owner" ? "Propietario" : "Rentador"}</p>
                    </div>
                    <Link
                      to={user.role === "owner" ? "/owner" : "/renter"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-secondary to-primary rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                isActivePath("/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/spaces"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                isActivePath("/spaces")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Explorar Espacios
            </Link>

            {user && user.role === "owner" && (
              <Link
                to="/my-spaces"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActivePath("/my-spaces")
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Mis Espacios
              </Link>
            )}

            {user && user.role === "renter" && (
              <Link
                to="/my-reservations"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActivePath("/my-reservations")
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Mis Reservas
              </Link>
            )}

            {user ? (
              <>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Link
                    to={user.role === "owner" ? "/owner" : "/renter"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:border-primary hover:text-primary transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center rounded-lg font-semibold text-white bg-gradient-to-r from-secondary to-primary hover:shadow-lg transition-all"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
