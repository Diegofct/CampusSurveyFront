import axios from 'axios';

const API_LOGIN_URL = ''; // Cambia esto por la URL de tu backend
const API_REGISTER_URL = ''; // Cambia esto por la URL de tu backend

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { username, password });
    const { token, role } = response.data;

    // Almacenar el token y el rol en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    return { token, role };
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_REGISTER_URL, { username, email, password });
    const { token, role } = response.data;

    // Almacenar el token y el rol en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    return { token, role };
  } catch (error) {
    console.error('Error registering', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
};

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
