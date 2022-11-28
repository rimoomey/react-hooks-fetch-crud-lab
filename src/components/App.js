import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm length={isQuestionAdded} callBack={setIsQuestionAdded}/>
      ) : (
        <QuestionList />
      )}
    </main>
  );
}

export default App;
