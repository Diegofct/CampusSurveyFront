import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/AuthService"; 
import { toastError, toastSuccess } from '../../services/ToastService';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!username || !password || !confirmPassword) {
      toastError("Please fill in all fields!");
      console.log("validacion")
      return;
    }

    if (password !== confirmPassword) {
      toastError("Passwords do not match!");
      console.log("confirmacion psw")
      return;
    }

    try {
      await register(username, password);

      toastSuccess("Registration successful!");
      console.log("creado con exito")
      navigateTo("/");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toastError("Registration failed: " + error.response.data.message);
      } else if (error.response) {
        toastError("An error occurred: " + error.response.data.message);
      } else if (error.request) {
        toastError("No response from the server. Please try again later.");
      } else {
        toastError("An error occurred while setting up the request. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 via-blue-900 to-black p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Crear una cuenta
        </h2>
        <form onSubmit={createUser} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Ingresa tu nombre de usuario"
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Crea una contraseña"
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-300 mb-1">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Repetir la contraseña"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out `}
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">¿Ya tienes una cuenta?</p>
          <a
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigateTo("/login")}
          >
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
