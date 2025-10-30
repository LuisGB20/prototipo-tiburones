import { Navigate } from "react-router-dom";
import { UserRole } from "../../../core/entities/User";
import { useAuth } from "../../context/AuthContext";

interface RoleBasedRouteProps {
  children: React.ReactElement;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/",
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirigir al dashboard correspondiente según el rol del usuario
    const userDashboard = user.role === UserRole.OWNER ? "/owner" : "/renter";
    return <Navigate to={redirectTo || userDashboard} replace />;
  }

  return children;
};
