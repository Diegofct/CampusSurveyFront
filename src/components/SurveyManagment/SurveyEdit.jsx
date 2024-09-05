import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SurveyEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/survey/${id}`);
        setTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };
    fetchSurvey();
  }, [id]);

  const updateSurvey = async () => {
    try {
      await axios.put(`/http://localhost:8080/api/survey/${id}`, { title });
      navigate('/survey');
    } catch (error) {
      console.error('Error updating survey:', error);
    }
  };

  return (
    <div>
      <h1>Edit Survey</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Survey Title"
      />
      <button onClick={updateSurvey}>Update</button>
    </div>
  );
};

export default SurveyEdit;
