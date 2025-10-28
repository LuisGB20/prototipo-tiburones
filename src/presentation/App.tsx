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

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/renter" element={<RenterDashboard />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route
          path="/space/:id"
          element={<SpaceDetailPage />}
        />
        <Route path="/rental/:id" element={<SpaceRentalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/spaces" element={<SpacesPage />} />
        <Route path="/spaces/new" element={<AddSpacePage />} />
        <Route path="/my-spaces" element={<MySpacesPage />} />
        <Route path="/my-reservations" element={<MyReservationsPage />} />



      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
