import React from "react";
import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questionToAdd }) {
  const [questionData, setQuestionData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        const filteredData = questionData.filter((data) => {
          return data.id !== id;
        });
        setQuestionData(filteredData);
      });
  }

  const nextKey = ((n) => {
    return () => {
      return n++;
    };
  })(1);

  function makeList() {
    return questionData.map((question) => {
      return (
        <QuestionItem
          question={question}
          key={nextKey()}
          handleClick={handleDelete}
        />
      );
    });
  }

  if (isLoaded) {
    return (
      <section>
        <h1>Quiz Questions</h1>
        <ul>{makeList()}</ul>
      </section>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}

export default QuestionList;
