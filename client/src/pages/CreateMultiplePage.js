import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';

import '../styles/CreateMultiplePage.css';

const CreateMultiplePage = () => {

  const navigate = useNavigate();

  const userID = localStorage.getItem('userID');

  const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);

  const handleCheckboxChange = (e) => {
    const optionIndex = parseInt(e.target.value, 10);

    if (e.target.checked) {
      setCorrectAnswerIndexes((prevIndexes) => {
        const updatedIndexes = [...prevIndexes, optionIndex];
        return updatedIndexes.sort((a, b) => a - b);
      });
    } else {
      setCorrectAnswerIndexes((prevIndexes) =>
        prevIndexes.filter((index) => index !== optionIndex)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const options = [
      document.getElementById('option1').value,
      document.getElementById('option2').value,
      document.getElementById('option3').value,
      document.getElementById('option4').value
    ];

    if (
      title === '' ||
      options.some((option) => option === '') ||
      correctAnswerIndexes.length === 0
    ) {
    } else {
      try {
        console
        const response = await axios.post(
          `http://localhost:5000/api/${userID}/question`,
          {
            type: 'multiple',
            question: title,
            options: options,
            correctAnswer: correctAnswerIndexes
          }
        );
        navigate('/');
      } catch (error) {
        console.error('Error creating question: ', error);
      }
    }
  };

  return (
    <div className="cmp-container">
      <Navbar />
      <h2 className="cmp-title">Crear Pregunta : Multiple Choice</h2>
      <form className="cmp-form" onSubmit={handleSubmit}>
        <div className="cmp-option">
          <label className="cmp-label" htmlFor="title">Pregunta:</label>
          <input className="cmp-input" type="text" id="title" />
        </div>
  
        <div className="cmp-option">
          <input className="cmp-checkbox" type="checkbox" id="answer1" name="correctAnswers" value="0" onChange={handleCheckboxChange} />
          <label className="cmp-label" htmlFor="option1">Opcion 1:</label>
          <input className="cmp-input" type="text" id="option1" />
        </div>
  
        <div className="cmp-option">
          <input className="cmp-checkbox" type="checkbox" id="answer2" name="correctAnswers" value="1" onChange={handleCheckboxChange} />
          <label className="cmp-label" htmlFor="option2">Opcion 2:</label>
          <input className="cmp-input" type="text" id="option2" />
        </div>
  
        <div className="cmp-option">
          <input className="cmp-checkbox" type="checkbox" id="answer3" name="correctAnswers" value="2" onChange={handleCheckboxChange} />
          <label className="cmp-label" htmlFor="option3">Opcion 3:</label>
          <input className="cmp-input" type="text" id="option3" />
        </div>
  
        <div className="cmp-option">
          <input className="cmp-checkbox" type="checkbox" id="answer4" name="correctAnswers" value="3" onChange={handleCheckboxChange} />
          <label className="cmp-label" htmlFor="option4">Opcion 4:</label>
          <input className="cmp-input" type="text" id="option4" />
        </div>
  
        <p className="cmp-note">Selecciona los 'checkbox' de las respuestas correctas.</p>
  
        <button className="cmp-button" type="submit">Crear pregunta</button>
      </form>
    </div>
  );
  };
  
  export default CreateMultiplePage;