import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/app.module.css";
import Footer from "../components/Footer";
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
        <Game />
      </main>
    </div>
  );
};

export default Home;
