import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChapterForm from '../Chapter/ChapterForm';

const SurveyContainer = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [chapters, setChapters] = useState([]);

  // Petición GET para cargar encuestas cuando el componente se monte
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/survey');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };
    fetchSurveys();
  }, []);

  // Petición GET para cargar capítulos cuando se seleccione una encuesta
  useEffect(() => {
    if (selectedSurveyId) {
      const fetchChapters = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/survey/${selectedSurveyId}/chapters`);
          setChapters(response.data);
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      };
      fetchChapters();
    } else {
      // Si no hay encuesta seleccionada, limpiar los capítulos
      setChapters([]);
    }
  }, [selectedSurveyId]);

  // Petición POST para añadir una nueva encuesta
  const handleAddSurvey = async () => {
    try {
      const newSurvey = {
        title: 'New Survey' // Puedes ajustar el título según tus necesidades
      };
      const response = await axios.post('http://localhost:8080/api/survey', newSurvey);
      setSurveys([...surveys, response.data]); // Añadir la nueva encuesta al estado
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  // Petición POST para añadir un nuevo capítulo
  const handleAddChapter = async () => {
    if (!selectedSurveyId) {
      alert('Please select a survey before adding a chapter.');
      return;
    }

    try {
      const newChapter = {
        title: 'New Chapter', // Aquí puedes añadir el título y las preguntas si lo necesitas
        questions: [],
        surveyId: selectedSurveyId // Asociar el capítulo con la encuesta seleccionada
      };
      const response = await axios.post(`http://localhost:8080/api/survey/${selectedSurveyId}/chapters`, newChapter);
      setChapters([...chapters, response.data]); // Añadir el nuevo capítulo al estado
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };

  return (
    <div className="container ml-64 p-5 bg-white shadow-lg rounded-md">
      {/* Dropdown para seleccionar una encuesta */}
      <div className="mb-4">
        <label htmlFor="survey-select" className="block mb-2 text-sm font-medium text-gray-700">Select a Survey:</label>
        <select
          id="survey-select"
          className="border p-2 rounded w-full"
          value={selectedSurveyId || ''}
          onChange={(e) => setSelectedSurveyId(e.target.value)}
        >
          <option value="" disabled>Select a survey</option>
          {surveys.map((survey) => (
            <option key={survey.id} value={survey.id}>
              {survey.title}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar los capítulos de la encuesta seleccionada */}
      {chapters.length > 0 ? (
        chapters.map((chapter, index) => (
          <ChapterForm
            key={index}
            chapter={chapter}
            chapters={chapters}
            setChapters={setChapters}
            chapterIndex={index}
          />
        ))
      ) : (
        selectedSurveyId && <p>No chapters found for this survey.</p>
      )}

      {/* Botón para añadir un nuevo capítulo */}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddChapter}
      >
        Add a Chapter
      </button>

      {/* Botón para añadir una nueva encuesta */}
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleAddSurvey}
      >
        Add a Survey
      </button>
    </div>
  );
};

export default SurveyContainer;
