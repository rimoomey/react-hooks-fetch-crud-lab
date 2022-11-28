import React, { useState } from "react";

function QuestionItem({ question, handleClick }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteButton() {
    handleClick(id);
  }

  function patchEntry(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: event.target.value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSelectedAnswer(event.target.value);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={patchEntry}>
          {options}
        </select>
      </label>
      <button onClick={deleteButton}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
