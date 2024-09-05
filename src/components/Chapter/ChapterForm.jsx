import React, { useState } from 'react';
import axios from 'axios';
import QuestionForm from '../Question/QuestionForm';

const ChapterForm = ({ chapter, chapters, setChapters, chapterIndex }) => {
  const [title, setTitle] = useState(chapter.title);

  // Petición DELETE para eliminar un capítulo
  const handleDeleteChapter = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/chapters/${chapter.id}`);
      const updatedChapters = chapters.filter(c => c.id !== chapter.id);  // Filtrar capítulos para eliminar el seleccionado
      setChapters(updatedChapters);  // Actualizar el estado
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 mt-4 rounded">
      {/* Título del capítulo */}
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Chapter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      {/* Botón para eliminar el capítulo */}
      <button
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleDeleteChapter}
      >
        Delete Chapter
      </button>
      
      {/* Renderizar las preguntas asociadas */}
      <div className="mt-4">
        {chapter.questions.map((question, questionIndex) => (
          <QuestionForm
            key={questionIndex}
            question={question}
            chapterIndex={chapterIndex}
            questionIndex={questionIndex}
            chapters={chapters}
            setChapters={setChapters}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterForm;
