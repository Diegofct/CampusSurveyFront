import React, { useState, useEffect } from 'react';
import { createSurvey, fetchSurveys } from '../../services/SurveyService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ChapterForm from '../Chapter/ChapterForm';

const SurveyForm = () => {
  const [survey, setSurvey] = useState({ name: '', description: '' });
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [showChapterForm, setShowChapterForm] = useState(false);

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const surveys = await fetchSurveys();
        setSurveys(surveys);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    loadSurveys();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();
    try {
      if (editingSurvey) {
        await updateSurvey(editingSurvey.id, survey.name, survey.description);
        alert('Survey updated successfully!');
        setEditingSurvey(null);
      } else {
        await createSurvey(survey.name, survey.description);
        alert('Survey created successfully!');
      }
      setSurvey({ name: '', description: '' });
      const updatedSurveys = await fetchSurveys();
      setSurveys(updatedSurveys);
      setSelectedSurvey(null);
      setShowChapterForm(false);
    } catch (error) {
      console.error('Error saving survey:', error);
      alert('Failed to save survey');
    }
  };

  const handleSelectSurvey = (survey) => {
    setSelectedSurvey(survey);
    setShowChapterForm(true);
  };

  const handleEditSurvey = (survey) => {
    setSurvey({ name: survey.name, description: survey.description });
    setEditingSurvey(survey);
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      await deleteSurvey(surveyId);
      alert('Survey deleted successfully!');
      const updatedSurveys = await fetchSurveys();
      setSurveys(updatedSurveys);
      setSelectedSurvey(null);
    } catch (error) {
      console.error('Error deleting survey:', error);
      alert('Failed to delete survey');
    }
  };

  const handleBackToSurveys = () => {
    setSelectedSurvey(null);
    setShowChapterForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      {!selectedSurvey ? (
        <>
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Crear Encuesta</h1>

          <form onSubmit={handleSubmitSurvey} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Nombre de la encuesta</label>
              <input
                type="text"
                name="name"
                value={survey.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingrese el nombre de la encuesta"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Descripción</label>
              <textarea
                name="description"
                value={survey.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingrese la descripción de la encuesta"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {editingSurvey ? 'Actualizar Encuesta' : 'Crear Encuesta'}
            </button>
          </form>

          {surveys.length > 0 && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Encuestas Disponibles</h2>
              <ul className="space-y-2">
                {surveys.map((s) => (
                  <li key={s.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                    <span
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => handleSelectSurvey(s)}
                    >
                      {s.name}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        // onClick={() => handleEditSurvey(s)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        // onClick={() => handleDeleteSurvey(s.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Encuesta Seleccionada</h4>
          <div className="mb-4">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">{selectedSurvey.name}</h2>
            <p className="text-gray-600">{selectedSurvey.description}</p>
          </div>
          {showChapterForm && <ChapterForm surveyId={selectedSurvey.id} />}
          <button
            onClick={handleBackToSurveys}
            className="mt-10 bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Volver a la lista
          </button>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
