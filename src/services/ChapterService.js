import axios from 'axios';

const API_URL = 'http://localhost:8080/api/chapters'; // Ajusta la URL según tu configuración

export const createChapter = async (surveyId, chapter) => {
  try {
    const response = await axios.post(API_URL, { ...chapter, surveyId });
    return response.data;
  } catch (error) {
    console.error('Error creating chapter:', error.response ? error.response.data : error.message);
    throw new Error('Error creating chapter: ' + error.message);
  }
};

// Función para obtener todos los capítulos
export const getAllChapters = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error al obtener los capítulos');
    } else {
      throw new Error('Error de red');
    }
  }
};

// Función para actualizar un capítulo
export const updateChapter = async (id, chapter) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, chapter);
    return response.data;
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error al actualizar el capítulo');
    } else {
      throw new Error('Error de red');
    }
  }
};

// Función para eliminar un capítulo
export const deleteChapter = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error al eliminar el capítulo');
    } else {
      throw new Error('Error de red');
    }
  }
};
