import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { toastError, toastSuccess } from "../../services/ToastService";



const LoginForm = () => {
  
  // UseState Hook to store inputs
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      toastError("Please enter both Username and Password!");
      return;
    }

    try {
      const response = await login(loginUsername, loginPassword);

      if (response) {
        toastSuccess("You have successfully logged in");
        navigateTo("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toastError("Invalid credentials. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 via-blue-900 to-black p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Campus Survey
        </h2>
        <form onSubmit={loginUser} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(event) => {setLoginUsername(event.target.value)}}
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
              onChange={(event) => {setLoginPassword(event.target.value)}}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">¿No tienes una cuenta?</p>
          <a
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigateTo("/register")}
          >
            Regístrate ahora
          </a>
        </div>
        
      </div>

    </div>

  );
};

export default LoginForm;
