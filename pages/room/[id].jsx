import Head from "next/head";
import styles from "../../styles/app.module.css";
import Header from "../../components/Header";
import Game from "../../components/Game";
import Scoreboard from "../../components/Scoreboard/Scoreboard";

import { useRouter } from "next/router";
import { useState } from "react";

const Room = () => {
  const router = useRouter();
  const [btnText, setBtnText] = useState("Share Room with Friends");

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setBtnText("Room link copied to clipboard!");
        // Revert the text back after 3 seconds (3000 milliseconds)
        setTimeout(() => {
          setBtnText("Share Room with Friends");
        }, 3000);
      },
      (err) => {
        alert("Failed to copy room link!");
      }
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>MathContest - Private Room</title>
        <meta name="description" content="Test your math skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Game roomId={router.query.id} />
        <div className={styles.scoreboardContainer}>
          <Scoreboard roomId={router.query.id} />
        </div>
        <br />
        <button onClick={handleShare} className={styles.shareButton}>
          {btnText}
        </button>
      </main>
    </div>
  );
};

export default Room;
