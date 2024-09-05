import React, { useState } from 'react';
import axios from 'axios';

const AnswerForm = ({ answer, chapterIndex, questionIndex, answerIndex, chapters, setChapters }) => {
  const [answerText, setAnswerText] = useState(answer.text);

  // Petición DELETE para eliminar una respuesta
  const handleDeleteAnswer = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/answers/${answer.id}`);
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex].questions[questionIndex].answers = updatedChapters[chapterIndex].questions[questionIndex].answers.filter(a => a.id !== answer.id);
      setChapters(updatedChapters);  // Actualizar el estado
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  return (
    <div className="flex items-center mt-2">
      {/* Texto de la respuesta */}
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Answer"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />
      {/* Botón para eliminar la respuesta */}
      <button className="ml-2 text-red-500" onClick={handleDeleteAnswer}>
        Delete
      </button>
    </div>
  );
};

export default AnswerForm;
