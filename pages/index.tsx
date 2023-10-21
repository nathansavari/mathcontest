import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/app.module.css";
import Header from "../components/Header";
import Game from "../components/Game";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Math Contest</title>
        <meta name="description" content="Testez votre cerveau." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Game roomId="0" />
        <br />
        <p className={styles.rule}>
          MathContest is a simple game. You just need to calculate the product
          of the two numbers above.
        </p>
        <ul>
          <li>Good answer : +1 point</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
