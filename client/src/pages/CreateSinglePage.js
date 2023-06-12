import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';

import '../styles/CreateSinglePage.css';

const CreateSinglePage = () => {
  
  const navigate = useNavigate();

  const userID = localStorage.getItem('userID');

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');

  const handleRadioChange = (e) => {
    setCorrectAnswerIndex(parseInt(e.target.value, 10));
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

    if (title === '' ||
    options.some((option) => option === '') ||
    correctAnswerIndex === '') {
    } else {
      try {
        const response = await axios.post(`http://localhost:5000/api/${userID}/question`, {
          type: 'single',
          question: title,
          options: options,
          correctAnswer: correctAnswerIndex
        });
        navigate('/')
      } catch (error) {
        console.error('Error creating question: ', error);
      }
    }
  };

  return (
    <div className="csp-container">
      <Navbar />
      <h2 className="csp-title">Crear Pregunta : Single Choice</h2>
      <form className="csp-form" onSubmit={handleSubmit}>
        <div className="csp-option">
          <label className="csp-label" htmlFor="title">Pregunta:</label>
          <input className="csp-input" type="text" id="title" />
        </div>

        <div className="csp-option">
          <input className="csp-radio" type="radio" id="answer1" name="correctAnswer" value="0" onChange={handleRadioChange} />
          <label className="csp-label" htmlFor="option1">Opcion 1:</label>
          <input className="csp-input" type="text" id="option1" />
        </div>

        <div className="csp-option">
          <input className="csp-radio" type="radio" id="answer2" name="correctAnswer" value="1" onChange={handleRadioChange} />
          <label className="csp-label" htmlFor="option2">Opcion 2:</label>
          <input className="csp-input" type="text" id="option2" />
        </div>

        <div className="csp-option">
          <input className="csp-radio" type="radio" id="answer3" name="correctAnswer" value="2" onChange={handleRadioChange} />
          <label className="csp-label" htmlFor="option3">Opcion 3:</label>
          <input className="csp-input" type="text" id="option3" />
        </div>

        <div className="csp-option">
          <input className="csp-radio" type="radio" id="answer4" name="correctAnswer" value="3" onChange={handleRadioChange} />
          <label className="csp-label" htmlFor="option4">Opcion 4:</label>
          <input className="csp-input" type="text" id="option4" />
        </div>

        <p className="csp-note">Selecciona el 'radio button' de la respuesta correcta</p>

        <button className="csp-button" type="submit">Crear pregunta</button>
      </form>
    </div>
  );
};

export default CreateSinglePage;