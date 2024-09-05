import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);
  const { surveyId } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`/api/surveys/${surveyId}/chapters`);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
    fetchChapters();
  }, [surveyId]);

  const deleteChapter = async (id) => {
    try {
      await axios.delete(`/api/chapters/${id}`);
      setChapters(chapters.filter(chapter => chapter.id !== id));
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  return (
    <div>
      <h1>Chapters for Survey {surveyId}</h1>
      <Link to={`/surveys/${surveyId}/chapters/new`}>Create New Chapter</Link>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>
            {chapter.title}
            <button onClick={() => deleteChapter(chapter.id)}>Delete</button>
            <Link to={`/chapters/${chapter.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
