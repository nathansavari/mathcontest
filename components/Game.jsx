import { useEffect, useState, useRef } from "react";
import styles from "../styles/app.module.css";
import confetti from "canvas-confetti";
import axios from "axios";

export default function Game({ roomId }) {
  const [response, setResponse] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [color, setColor] = useState("#ff6262");
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Assume setUsername is your state setter
    }
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      confetti();
      axios
        .post("/api/saveScore", {
          score,
          username: localStorage.getItem("username"),
          roomId: roomId,
        })
        .then((res) => {
          if (res.data.success) {
            console.log("Score and username saved successfully");
          }
        })
        .catch((error) => {
          console.log("Error saving score and username");
        });
      setTimeLeft(null);
      setGameStarted(false);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
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

    if (response == a * b) {
      setMessage("Great!");
      setScore(score + 1);
      setColor("#36da75");

      correct();

      setA(Math.round(Math.random() * (9 - 2) + 2));
      setB(Math.round(Math.random() * (9 - 2) + 2));
    } else {
      setMessage("Ouch...");
      setErrors(errors + 1);
      setColor("#ff6262");
      triggerShake();
      wrong();
    }

    input.value = "";
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 200); // Match the duration of the animation
  };

  const wrong = () => {
    const audio = new Audio("/wrong.mp3");
    audio.play();
  };

  const correct = () => {
    const audio = new Audio("/correct.mp3");
    audio.play();
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
              min="0"
              pattern="\d*"
              inputmode="numeric"
              name="response"
              onChange={(event) => setResponse(event.target.value)}
              required
              autoFocus
            />
          )}
        </label>
      </form>
      {timeLeft > 0 ? (
        <h3
          className={`${styles.message} ${shake ? styles.shake : ""}`}
          style={{ color: `${color}` }}
        >
          {message}
        </h3>
      ) : (
        ""
      )}

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
      {!gameStarted && (
        <div>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => {
              localStorage.setItem("username", username);
              setGameStarted(true);
              start(); // This is your start game function
            }}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
