import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SurveyCreate = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const createSurvey = async () => {
    try {
      await axios.post('http://localhost:8080/api/survey', { title });
      navigate('/survey');
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div>
      <h1>Create Survey</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Survey Title"
      />
      <button onClick={createSurvey}>Create</button>
    </div>
  );
};

export default SurveyCreate;
