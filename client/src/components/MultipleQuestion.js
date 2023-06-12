import React, { useState } from 'react';

import '../styles/MultipleQuestion.css';

const MultipleQuestion = ({ question, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleOptionChange = (e) => {
    const optionValue = e.target.value;
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length !== 0) {
      const selectedIndexes = selectedOptions.map((option) => {
        return question.options.findIndex((item) => item === option);
      });
      const sortedIndexes = selectedIndexes.sort((a, b) => a - b);
      onSubmit(sortedIndexes);
      setSubmitDisabled(true);
    }
  };

  return (
    <div className="multiple-question">
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <div className="multiple-question-option" key={index}>
          <input
            type="checkbox"
            id={index}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleOptionChange}
            disabled={submitDisabled}
          />
          <label htmlFor={index}>{option}</label>
        </div>
      ))}
      <button className="multiple-question-button" type="submit" onClick={handleSubmit} disabled={submitDisabled}>
        Submit
      </button>
    </div>
  );
};

export default MultipleQuestion;
