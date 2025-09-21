import React from 'react';
import SingleQuestion from './SingleQuestion';

const Questions = ({ questions }) => {
  const handleQuestionClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='container'>
      <h3>Questions</h3>
      {questions.map((question) => {
        return (
          <SingleQuestion
            key={question.id}
            {...question}
            onClick={() => handleQuestionClick(`question-${question.id}`)}
          />
        );
      })}
    </div>
  );
};

export default Questions;