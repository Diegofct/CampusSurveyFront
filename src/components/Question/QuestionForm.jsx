import React, { useState } from 'react';
// import { createQuestion } from '../../services/QuestionService';

const QuestionForm = ({ chapterId }) => {
  const [question, setQuestion] = useState({ text: '', options: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion({ ...question, chapterId }); // Asociar la pregunta al capítulo
      alert('Pregunta creada con éxito');
      setQuestion({ text: '', options: '' }); // Limpiar formulario
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Texto de la Pregunta</label>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingrese la pregunta"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Opciones (separadas por comas)</label>
          <input
            type="text"
            name="options"
            value={question.options}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingrese las opciones"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Crear Pregunta
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
