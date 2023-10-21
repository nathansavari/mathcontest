import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h3>Top Scores {roomId} </h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {topScores.map((scoreItem, index) => (
            <li key={index}>
              {getPodiumEmoji(index)} {scoreItem.username}: {scoreItem.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
