import Head from "next/head";
import styles from "../../styles/app.module.css";
import Header from "../../components/Header";
import Game from "../../components/Game";
import Scoreboard from "../../components/Scoreboard/Scoreboard";

import { useRouter } from "next/router";

const Room = () => {
  const router = useRouter();

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
        <Scoreboard roomId={router.query.id} />
        <br />
      </main>
    </div>
  );
};

export default Room;
