import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../../application/services/UserService";
import { UserRole } from "../../../core/entities/User";

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.RENTER);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const service = new UserService();
      const user = await service.register({ name, email, password, role });
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grayLight p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Crear Cuenta</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value as UserRole)}
          className="w-full p-3 mb-4 border rounded-lg"
        >
          <option value={UserRole.RENTER}>Rentador</option>
          <option value={UserRole.OWNER}>Arrendador</option>
        </select>
        <button
          onClick={handleRegister}
          className="w-full bg-secondary hover:bg-accent text-white p-3 rounded-lg font-semibold transition"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};
