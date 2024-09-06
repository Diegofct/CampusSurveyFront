import React, { useState } from 'react';
import { createChapter } from '../../services/ChapterService';
import QuestionForm from '../Question/QuestionForm';

const ChapterForm = ({ surveyId, onChapterCreated }) => {
  const [chapter, setChapter] = useState({ chapterNumber: '', chapterTitle: '' });
  const [createdChapter, setCreatedChapter] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChapter({ ...chapter, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChapter = await createChapter(surveyId, chapter);
      setCreatedChapter(newChapter);
      setChapter({ chapterNumber: '', chapterTitle: '' });
      setError(null);
      if (onChapterCreated) {
        onChapterCreated(newChapter);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {error && <p className="text-red-500">{error}</p>}

      {!createdChapter && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Número del Capítulo</label>
            <input
              type="text"
              name="chapterNumber"
              value={chapter.chapterNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingrese el número del capítulo"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Título del Capítulo</label>
            <input
              type="text"
              name="chapterTitle"
              value={chapter.chapterTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingrese el título del capítulo"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Crear Capítulo
          </button>
        </form>
      )}

      {createdChapter && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700">Capítulo Creado</h4>
          <p className="text-gray-800">Capítulo {createdChapter.chapterNumber}: {createdChapter.chapterTitle}</p>

          <button
            onClick={() => setShowQuestionForm(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-4"
          >
            Añadir Preguntas al Capítulo
          </button>

          {showQuestionForm && <QuestionForm chapterId={createdChapter.id} />}
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
