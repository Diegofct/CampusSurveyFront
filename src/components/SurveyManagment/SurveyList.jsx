import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

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

  const deleteSurvey = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/survey/${id}`);
      setSurveys(surveys.filter(survey => survey.id !== id));
    } catch (error) {
      console.error('Error deleting survey:', error);
    }
  };

  return (
    <div>
      <h1>Surveys</h1>
      <Link to="/surveys/new">Create New Survey</Link>
      <ul>
        {surveys.map(survey => (
          <li key={survey.id}>
            {survey.title} 
            <button onClick={() => deleteSurvey(survey.id)}>Delete</button>
            <Link to={`/surveys/${survey.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;
