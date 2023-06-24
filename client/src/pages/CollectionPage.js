import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard';

import '../styles/CollectionPage.css';

const CollectionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generateButtonDisabled, setGenerateButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const userID = localStorage.getItem('userID');

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    updateQuestionLists();
  }, [questions]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${userID}/questions`);
      const data = response.data;
      setQuestions(data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuestionLists = () => {
    const unanswered = questions.filter((question) => question.givenAnswer === '' );
    const answered = questions.filter((question) => question.givenAnswer !== '' );

    setUnansweredQuestions(unanswered);
    setAnsweredQuestions(answered);
  };

  const handleAnswerQuestion = (question) => {
    navigate('/quiz', { state: { question } });
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/${userID}/${questionId}`);
      fetchQuestions(); // Refresh again
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnmarkQuestion = async (question) => {
    try {
      await axios.put(`http://localhost:5000/api/${userID}/question`, {
        question: question.question,
        givenAnswer: '',
      });
      fetchQuestions(); // Refresh again
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateQuestion = async () => {
    console.log('Calling question generator');

    if (!isLoading) {
      setIsLoading(true);
      setGenerateButtonDisabled(true);

      const category = document.getElementById("category").value;
      if (category !== '') {
        console.log("CollectionPage.js : valor de category ->", category);
        try {
          // PRIMERO GENERAR PREGUNTA
          const response1 = await axios.post(`http://localhost:5000/api/${userID}/generateQuestion`, {
            category: category
          });
          console.log("ColllectionPage.js : pregunta generada, response1 tiene valor -> ", response1 != null);
          console.log("Valor de response1.data.payload -> ", response1.data.payload);
          const { question : titulo, options : opciones, answer: cAnswer } = response1.data.payload;
          console.log("CollectionPage.js : valor de titulo ->", titulo);
          console.log("CollectionPage.js : valor de opciones ->", opciones);
          console.log("CollectionPage.js : valor de cAnswer ->", cAnswer);
          
          // DESPUES ALMACENAR PREGUNTA
          const response2 = await axios.post(`http://localhost:5000/api/${userID}/question`, {
            type: category,
            question: titulo,
            options: opciones,
            correctAnswer: cAnswer
          });
          console.log("CollectionPage.js : pregunta almacenada, respuesta de response2 -> ", response2)
          
          fetchQuestions(); // Refresh again

        } catch(error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          setGenerateButtonDisabled(false);
        }
      }
    }


  };

  const handleCreateQuestion = () => {
    const category = document.getElementById("category").value;
    if (category !== '') {
      navigate(`/form-${category}`);
    }
  }

  return (
    <div className="collection-page">
      <Navbar />
      <div className="collection-container">
        <h1 className="collection-title">Coleccion de preguntas</h1>
        <div className="collection-actions">
          <div className="collection-actions-row">
            <p className="collection-question">¿Necesitas más preguntas?</p>
          </div>
          <div className="collection-actions-row">
            <label htmlFor="category" className="collection-label">
              Selecciona tipo:
            </label>
            <select id="category" defaultValue="" className="collection-select">
              <option value="" disabled>
                Tipo de pregunta
              </option>
              <option value="single">Single choice</option>
              <option value="multiple">Multiple choice</option>
              <option value="write">Pregunta escrita</option>
            </select>
            <button className="collection-button" onClick={handleCreateQuestion} disabled={generateButtonDisabled}>
              Crear nueva pregunta
            </button>
          </div>
          <div className="collection-actions-row">
            <button className="collection-button" onClick={handleGenerateQuestion} disabled={generateButtonDisabled}>
              Generar pregunta
            </button>
            {isLoading ? 'Generando pregunta, espere por favor...' : ''}
          </div>
        </div>

        {unansweredQuestions.length > 0 ? (
          <div className="question-section">
            <h2 className="question-section-title">Preguntas sin responder</h2>
            <div className="question-table-container">
              <table className="question-table">
                <thead>
                  <tr>
                  <th className='question-questionCol'>Pregunta</th>
                    <th className='question-typeCol'>Tipo</th>
                    <th className='question-actionCol'>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {unansweredQuestions.map((question) => (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      onAnswerClick={handleAnswerQuestion}
                      onDeleteClick={handleDeleteQuestion}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : unansweredQuestions.length === 0 && questions.length > 0 ? (
          <p className="no-questions">No hay preguntas sin responder.</p>
        ) : null}

        {answeredQuestions.length > 0 ? (
          <div className="question-section">
            <h2 className="question-section-title">Preguntas respondidas</h2>
            <div className="question-table-container">
              <table className="question-table">
                <thead>
                  <tr>
                    <th className='question-questionCol'>Pregunta</th>
                    <th className='question-typeCol'>Tipo</th>
                    <th className='question-correctCol'>Respuesta correcta</th>
                    <th className='question-actionCol'>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {answeredQuestions.map((question) => (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      onDeleteClick={handleDeleteQuestion}
                      onUnmarkClick={handleUnmarkQuestion}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : answeredQuestions.length === 0 && questions.length > 0 ? (
          <p className="no-questions">No hay preguntas respondidas.</p>
        ) : null}
      </div>
    </div>
  );
};

export default CollectionPage;
