import { useEffect, useState, useRef } from "react";
import styles from "../styles/app.module.css";
import confetti from "canvas-confetti";

export default function Game() {
  const [response, setResponse] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [color, setColor] = useState("#ff6262");

  const ref = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
      confetti();
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

    ref.current?.focus();

    setTimeLeft(60);
    setScore(0);
    setErrors(0);
    setMessage("");
  };

  const sendResponse = async (event) => {
    event.preventDefault();
    console.log(response);

    if (response == a * b) {
      setMessage("Great!");
      setScore(score + 1);
      setColor("#36da75");

      setA(Math.round(Math.random() * (9 - 2) + 2));
      setB(Math.round(Math.random() * (9 - 2) + 2));
    } else {
      setMessage("Ouch...");
      setErrors(errors + 1);
      setColor("#ff6262");
      setScore(score - 1);
    }

    input.value = "";
  };

  return (
    <div className={styles.game}>
      <form onSubmit={(event) => sendResponse(event)}>
        <label className={styles.label}>
          {a} x {b}
          {timeLeft !== null && (
            <input
              ref={ref}
              className={styles.input}
              id="input"
              type="number"
              name="response"
              onChange={(event) => setResponse(event.target.value)}
              required
              autoFocus
            />
          )}
        </label>
      </form>
      {timeLeft > 0 ? <h3 style={{ color: `${color}` }}>{message}</h3> : ""}

      <div className={styles.data}>
        <p className={styles.number}>
          <strong>Score:</strong> {score}
        </p>
        <p className={styles.number}>
          {errors <= 1 ? <strong>Error:</strong> : <strong>Errors:</strong>}{" "}
          {errors}
        </p>
        {timeLeft > 0 ? (
          <p className={styles.number}>
            <strong>Time left:</strong> {timeLeft} sec
          </p>
        ) : (
          ""
        )}
      </div>
      <br />
      <button className={styles.start} onClick={start}>
        {timeLeft > 0 ? "Restart" : "Start"}
      </button>
    </div>
  );
}
