import axios from 'axios';
import { setAuthToken } from './AuthTokenService';

const API_LOGIN_URL = "http://localhost:8080/auth/login";
const API_REGISTER_URL = "http://localhost:8080/auth/register"; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { username, password });
    const { token, role } = response.data;

    // Almacenar el token y el rol en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Configurar Axios para que use el token en futuras peticiones
    setAuthToken(token);

    return response; // Retornar la respuesta completa
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(API_REGISTER_URL, { username, password });
    const { token, role } = response.data;

    // Almacenar el token y el rol en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Configurar Axios para que use el token en futuras peticiones
    setAuthToken(token);

    return { token, role };
  } catch (error) {
    console.error("Error registering", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  setAuthToken(null);
  window.location.href = '/login';
};

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const getName = () => localStorage.getItem("username");
export const getEmail = () => localStorage.getItem("email");
