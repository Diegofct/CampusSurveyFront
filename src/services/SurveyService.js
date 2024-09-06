import axios from 'axios';
import { getAuthToken, setAuthToken } from './AuthTokenService'; // Assuming you have a function to get the token

const URL_CREATE_SURVEY = "http://localhost:8080/api/survey";
const URL_GET_SURVEYS = "http://localhost:8080/api/survey";

export const createSurvey = async (name, description) => {
    try {
      const token = localStorage.getItem('token'); // Adjust as necessary
  
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.error('No token found');
        return;
      }
  
      const response = await axios.post(URL_CREATE_SURVEY, { name, description });
  
      console.log('Survey creation response:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating survey:', error);
      throw error;
    }
  };

  export const fetchSurveys = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.error('No token found');
            return [];
        }

        const response = await axios.get(URL_GET_SURVEYS);
        console.log('Fetched surveys:', response);
        return response.data; // Ajusta según la estructura de la respuesta de tu API
    } catch (error) {
        console.error('Error fetching surveys:', error);
        throw error;
    }
};
  
