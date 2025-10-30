import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../../core/entities/User";

export const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return "/login";
    return user.role === UserRole.OWNER ? "/owner" : "/renter";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Ilustración */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full mb-6">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Acceso no autorizado
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            No tienes permisos para acceder a esta página. Esta sección está reservada para {user?.role === UserRole.OWNER ? "rentadores" : "propietarios"}.
          </p>
        </div>

        {/* Card con información */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="space-y-6">
              {/* Información del usuario actual */}
              {user && (
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 mb-1">
                        Sesión iniciada como:
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tipo de cuenta: <span className="font-semibold text-primary capitalize">{user.role === UserRole.OWNER ? "Propietario" : "Rentador"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Explicación */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>¿Por qué veo esto?</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Has intentado acceder a una sección de MeXpace que requiere un tipo de cuenta diferente al tuyo. Las funcionalidades de propietarios y rentadores están separadas para brindarte una mejor experiencia.
                </p>
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => navigate(getDashboardPath())}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Ir a mi Dashboard</span>
                </button>
                
                <Link
                  to="/"
                  className="flex-1 px-6 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Volver al Inicio</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer del card */}
          <div className="bg-gray-50 px-8 md:px-10 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                ¿Necesitas ayuda?
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                Contactar soporte →
              </a>
            </div>
          </div>
        </div>

        {/* Links adicionales */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <Link
              to="/spaces"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Explorar Espacios
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/debug"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Información del Sistema
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
