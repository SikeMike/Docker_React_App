import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import SingleQuestion from '../components/SingleQuestion';
import MultipleQuestion from '../components/MultipleQuestion';
import WriteQuestion from '../components/WriteQuestion';

import '../styles/QuizPage.css';

const QuizPage = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const question = location.state.question;

  const [answerStatus, setAnswerStatus] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const userID = localStorage.getItem('userID');

  const handleSingleQuestionSubmit = async (selectedIndex) => {
    try {
      // Save the answer in the database
      await axios.put(`http://localhost:5000/api/${userID}/question`, {
        question: question.question,
        givenAnswer: selectedIndex,
      });

      // Check if the answer is correct
      if (selectedIndex === question.correctAnswer) {
        setAnswerStatus('Correct');
      } else {
        setAnswerStatus(`Incorrect, correct answer was ${question.options[question.correctAnswer]}`);
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleMultipleQuestionSubmit = async (selectedIndexes) => {
    try {
      // Save the answer in the database
      await axios.put(`http://localhost:5000/api/${userID}/question`, {
        question: question.question,
        givenAnswer: selectedIndexes,
      });

      // Check if the answer is correct
      const isCorrect =
        selectedIndexes.length === question.correctAnswer.length &&
        selectedIndexes.every((index) => question.correctAnswer.includes(index));

      if (isCorrect) {
        setAnswerStatus('Correct');
      } else {
        const correctAnswers = question.correctAnswer.map((index) => {
          return question.options[index];
        });
        setAnswerStatus(`Incorrect, correct answer: ${correctAnswers.join(', ')}`);
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleWrittenQuestionSubmit = async (writenText) => {
    try {
      // Save the answer in the database
      await axios.put(`http://localhost:5000/api/${userID}/question`, {
        question: question.question,
        givenAnswer: writenText,
      });
      
      // Check if the answer is correct
      if (writenText === question.correctAnswer) {
        setAnswerStatus('Correct');
      } else {
        setAnswerStatus(`Incorrect, correct answer: ${question.correctAnswer}`);
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="quiz-page">
      <Navbar />
      <div className='quiz-container'>
        <h1 className="quiz-title">Quiz Page</h1>
        {question.type === 'single' && (
          <SingleQuestion question={question} onSubmit={handleSingleQuestionSubmit} />
        )}
        {question.type === 'multiple' && (
          <MultipleQuestion question={question} onSubmit={handleMultipleQuestionSubmit} />
        )}
        {question.type === 'write' && (
          <WriteQuestion question={question} onSubmit={handleWrittenQuestionSubmit} />
        )}
        {submitted && (
          <div className="quiz-result">
            <p className="answer-status">{answerStatus}</p>
            <button className="collection-button" onClick={handleGoBack}>
              Go Back to Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};  

export default QuizPage;
