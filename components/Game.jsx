import { useEffect, useState } from "react";
import styles from "../styles/app.module.css";

export default function Game() {
  const [response, setResponse] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const start = () => {
    setA(Math.round(Math.random() * (9 - 2) + 2));
    setB(Math.round(Math.random() * (9 - 2) + 2));

    setTimeLeft(60);
    setScore(0);
    setErrors(0);
  };

  const sendResponse = async (event) => {
    event.preventDefault();

    if (response == a * b) {
      setMessage("Bonne réponse !");
      setScore(score + 1);

      setA(Math.round(Math.random() * (9 - 2) + 2));
      setB(Math.round(Math.random() * (9 - 2) + 2));
    } else {
      setMessage("Essaye encore");
      setErrors(errors + 1);
    }

    input.value = "";
  };

  return (
    <div className={styles.game}>
      <form onSubmit={(event) => sendResponse(event)}>
        <label className={styles.label}>
          {a == 0 ? "" : `${a} x ${b}`}
          {timeLeft == null ? (
            ""
          ) : (
            <input
              className={styles.input}
              id="input"
              type="number"
              name="response"
              onChange={(event) => setResponse(event.target.value)}
            />
          )}
        </label>
      </form>
      <h3>{message}</h3>
      <p>Score: {score}</p>

      <p>
        {errors <= 1 ? "Error" : "Errors"} {errors}
      </p>
      <button onClick={start}>{timeLeft > 0 ? "Restart" : "Start"}</button>
      <p>{timeLeft}</p>
    </div>
  );
}
