import React, { useState } from 'react';
import axios from 'axios';
import AnswerForm from '../Answer/AnswerForm';

const QuestionForm = ({ question, chapterIndex, questionIndex, chapters, setChapters }) => {
  const [questionText, setQuestionText] = useState(question.text);

  // Petición PUT para actualizar una pregunta
  const handleUpdateQuestion = async () => {
    try {
      const updatedQuestion = { ...question, text: questionText };
      const response = await axios.put(`http://localhost:8080/api/questions/${question.id}`, updatedQuestion);
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex].questions[questionIndex] = response.data;  // Actualizar el estado
      setChapters(updatedChapters);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className="mt-4 p-4 bg-white shadow-sm rounded">
      {/* Texto de la pregunta */}
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type your question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      {/* Botón para actualizar la pregunta */}
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleUpdateQuestion}
      >
        Update Question
      </button>

      {/* Renderizar respuestas asociadas */}
      <div className="mt-4">
        {question.answers.map((answer, answerIndex) => (
          <AnswerForm
            key={answerIndex}
            answer={answer}
            chapterIndex={chapterIndex}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
            chapters={chapters}
            setChapters={setChapters}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;
