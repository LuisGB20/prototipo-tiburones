import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../../application/services/UserService";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const service = new UserService();
      const user = await service.login(email, password);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/"); // Redirigir a landing o dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grayLight p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button
          onClick={handleLogin}
          className="w-full bg-secondary hover:bg-accent text-white p-3 rounded-lg font-semibold transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};
