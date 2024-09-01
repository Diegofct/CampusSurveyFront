import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth"; // Asegúrate de tener esta función implementada

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Lógica para el registro
      await register(credentials);
      navigate("/login"); // Redirigir al login después de registrarse
    } catch (error) {
      setError("Error en el registro: " + error.message);
      console.error("Error en el registro", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Aquí iría la lógica para el inicio de sesión con Google
    console.log("Inicio de sesión con Google");
  };

  const handleGithubSignUp = () => {
    // Aquí iría la lógica para el inicio de sesión con GitHub
    console.log("Inicio de sesión con GitHub");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 via-blue-900 to-black p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Crear una cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Crea una contraseña"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Registrando..." : "Regístrate"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-4">O regístrate con:</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoogleSignUp}
              className="bg-slate-300 text-black px-4 py-2 rounded-lg shadow-sm hover:bg-slate-500 transition duration-300 ease-in-out"
            >
              Gmail
            </button>
            <button
              onClick={handleGithubSignUp}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">¿Ya tienes una cuenta?</p>
          <a className="text-sm font-medium text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out cursor-pointer" onClick={() => navigate("/login")}>
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
