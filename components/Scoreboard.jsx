import { useEffect, useState } from "react";
import axios from "axios";

export default function Scoreboard({ roomId }) {
  const [topScores, setTopScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading status

  useEffect(() => {
    if (!roomId) return;

    setIsLoading(true); // Set loading to true before API call

    axios
      .get(`/api/getTopScores?roomId=${roomId}`)
      .then((response) => {
        setTopScores(response.data);
        setIsLoading(false); // Set loading to false after data is received
      })
      .catch((error) => {
        console.log("Error fetching top scores");
        setIsLoading(false); // Set loading to false if there's an error
      });
  }, [roomId]);

  return (
    <div>
      <h3>Top Scores {roomId} </h3>
      {isLoading ? ( // Conditional rendering based on isLoading
        <p>Loading...</p>
      ) : (
        <ul>
          {topScores.map((scoreItem, index) => (
            <li key={index}>
              <strong>{scoreItem.username}</strong>: {scoreItem.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
