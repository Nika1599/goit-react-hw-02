import { useEffect, useState } from "react";
import "./App.css";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import Statistics from "../Statistics/Statistics";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("saved-feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("saved-feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((initialFeedback) => ({
      ...initialFeedback,
      [feedbackType]: initialFeedback[feedbackType] + 1,
    }));
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const positiveFeedback =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <>
          <Feedback
            name="Good"
            number={feedback.good}
            positiveFeedback={positiveFeedback}
          />
          <Feedback
            name="Neutral"
            number={feedback.neutral}
            positiveFeedback={positiveFeedback}
          />
          <Feedback
            name="Bad"
            number={feedback.bad}
            positiveFeedback={positiveFeedback}
          />
          <Statistics positiveFeedback={positiveFeedback} />
        </>
      ) : (
        <Notification message="No feedback yet" />
      )}
    </>
  );
};

export default App;
