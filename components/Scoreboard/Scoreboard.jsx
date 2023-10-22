import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Scoreboard.module.css";

export default function Scoreboard({ roomId }) {
  const [topScores, setTopScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    setIsLoading(true);

    axios
      .get(`/api/getTopScores?roomId=${roomId}`)
      .then((response) => {
        setTopScores(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching top scores");
        setIsLoading(false);
      });
  }, [roomId]);

  const getPodiumEmoji = (index) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Scoreboard</h3>
      {isLoading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <ul className={styles.scoreList}>
          {topScores.map((scoreItem, index) => (
            <li key={index} className={styles.scoreItem}>
              <span className={styles.podiumEmoji}>
                {getPodiumEmoji(index)}
              </span>
              {scoreItem.username}: <strong>{scoreItem.score}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
