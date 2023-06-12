import React, { useState } from 'react';

import '../styles/WriteQuestion.css';

const WriteQuestion = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer != '') {
      onSubmit(answer);
      setSubmitDisabled(true);
    }
  };

  return (
    <div className="write-question">
      <h3>{question.question}</h3>
      <input className="write-question-input" type="text" value={answer} onChange={handleAnswerChange} />
      <button className="write-question-button" type="submit" onClick={handleSubmit} disabled={submitDisabled}>
        Submit
      </button>
      <p className="write-question-error">No se permiten respuestas en blanco</p>
    </div>
  );
};

export default WriteQuestion;
