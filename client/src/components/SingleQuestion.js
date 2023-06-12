import React, { useState } from 'react';

import '../styles/SingleQuestion.css';

const SingleQuestion = ({ question, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption !== '') {
      const selectedIndex = question.options.findIndex((option) => option === selectedOption);
      onSubmit(selectedIndex);
      setSubmitDisabled(true);
    }
  };

  return (
    <div className="single-question">
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <div key={index} className="single-question-option">
          <input
            type="radio"
            id={index}
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
            disabled={submitDisabled}
          />
          <label htmlFor={index}>{option}</label>
        </div>
      ))}
      <button type="submit" onClick={handleSubmit} disabled={submitDisabled} className="single-question-button">Submit</button>
    </div>
  );
};
export default SingleQuestion;
