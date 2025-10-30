import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"
import { LandingPage } from "./pages/LadingPage"
import { OwnerDashboard } from "./pages/owner/Dashboard"
import { RenterDashboard } from "./pages/renter/Dashboard"
import { DebugPage } from "./pages/debug/DebugPage"
import { SpaceDetailPage } from "./pages/space/SpaceDetailPage"
import { SpaceRentalPage } from "./pages/renter/RentalPage"
import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from "./pages/auth/RegisterPage"
import { SpacesPage } from "./pages/space/SpacesPage"
import { MySpacesPage } from "./pages/owner/MySpacesPage"
import { MyReservationsPage } from "./pages/renter/MyReservationsPage"
import { AddSpacePage } from "./pages/space/AddSpacePage"
import { UnauthorizedPage } from "./pages/UnauthorizedPage"
import { AuthProvider } from "./context/AuthContext"
import { RoleBasedRoute } from "./components/auth/RoleBasedRoute"
import { UserRole } from "../core/entities/User"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/space/:id" element={<SpaceDetailPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Rutas protegidas - Solo propietarios (OWNER) */}
          <Route
            path="/owner"
            element={
              <RoleBasedRoute allowedRoles={[UserRole.OWNER]}>
                <OwnerDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/my-spaces"
            element={
              <RoleBasedRoute allowedRoles={[UserRole.OWNER]}>
                <MySpacesPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/spaces/new"
            element={
              <RoleBasedRoute allowedRoles={[UserRole.OWNER]}>
                <AddSpacePage />
              </RoleBasedRoute>
            }
          />

          {/* Rutas protegidas - Solo rentadores (RENTER) */}
          <Route
            path="/renter"
            element={
              <RoleBasedRoute allowedRoles={[UserRole.RENTER]}>
                <RenterDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/my-reservations"
            element={
              <RoleBasedRoute allowedRoles={[UserRole.RENTER]}>
                <MyReservationsPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/rental/:id"
            element={
              <RoleBasedRoute allowedRoles={[UserRole.RENTER]}>
                <SpaceRentalPage />
              </RoleBasedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
