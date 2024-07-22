import { useState } from "react";
import "./App.css";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = (feedbackType) => {
    setFeedback((initialFeedback) => ({
      ...initialFeedback,
      [feedbackType]: initialFeedback[feedbackType] + 1,
    }));
  };

  return (
    <>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options updateFeedback={updateFeedback} />
      <Feedback name="Good" number={feedback.good} />
      <Feedback name="Neutral" number={feedback.neutral} />
      <Feedback name="Bad" number={feedback.bad} />
    </>
  );
};

export default App;
