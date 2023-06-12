import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';

import '../styles/CreateWritePage.css';

const CreateWritePage = () => {

  const navigate = useNavigate();

  const userID = localStorage.getItem('userID');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const answer = document.getElementById('answer').value;
    if (title === '' || answer === '') {
    } else {
      try {
        const response = await axios.post(`http://localhost:5000/api/${userID}/question`,
          {
            type: 'write',
            question: title,
            correctAnswer: answer,
          }
        );
        navigate('/');
      } catch (error) {
        console.error('Error creating question:', error);
      }
    }
  };

  return (
    <div className="cwp-container">
      <Navbar />
      <h2 className="cwp-title">Crear Pregunta: Pregunta Escrita</h2>
      <form className="cwp-form" onSubmit={handleSubmit}>
        <div className="cwp-option">
          <label className="cwp-label" htmlFor="title">Pregunta:</label>
          <input className="cwp-input" type="text" id="title" />
        </div>
  
        <div className="cwp-option">
          <label className="cwp-label" htmlFor="answer">Respuesta:</label>
          <input className="cwp-input" type="text" id="answer" />
        </div>
  
        <button className="cwp-button" type="submit">Crear pregunta</button>
      </form>
    </div>
  );
};
  
export default CreateWritePage;
