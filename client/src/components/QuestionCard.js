import React from 'react';

const QuestionCard = ({ question, onAnswerClick, onDeleteClick, onUnmarkClick }) => {

  const handleAnswerClick = () => {
    onAnswerClick(question);
  };

  const handleDeleteClick = () => {
    onDeleteClick(question._id);
  };

  const handleUnmarkClick = () => {
    onUnmarkClick(question);
  };

  return (
    <tr>
      <td>{question.question}</td>
      <td>
        {question.type === 'single' && 'Single'}
        {question.type === 'multiple' && 'Multiple'}
        {question.type === 'write' && 'Write'}
      </td>

      {question.givenAnswer !== '' && (
        <td>
          {question.type === 'single' && question.options[question.correctAnswer]}
          {question.type === 'multiple' &&
            question.correctAnswer.map((index) => (
              <p key={index}>{question.options[index]}</p>
          ))}
          {question.type === "write" && question.correctAnswer}
        </td>
      )}

      { (question.givenAnswer === '') ? 
        <td>
          <button onClick={handleAnswerClick}>Responder</button>
          <button onClick={handleDeleteClick}>Borrar pregunta</button>
        </td>
      :
      <td>
        <button onClick={handleUnmarkClick}>Borrar repuesta</button>
        <button onClick={handleDeleteClick}>Borrar pregunta</button>
      </td>
      }

    </tr>
  );
};

export default QuestionCard;
