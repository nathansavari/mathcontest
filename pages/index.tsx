import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/app.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Logo from "../public/logo-mathcontest.svg";

const Home: NextPage = () => {
  function Room() {
    const router = useRouter();

    const createRoom = () => {
      const randomId = Math.random().toString(36).substr(2, 9);
      router.push(`/room/${randomId}`);
    };

    return <button onClick={createRoom}>Start to Play</button>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Math Contest</title>
        <meta
          name="description"
          content="The best game for practicing your multiplication tables"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <br />
        <Image src={Logo} width={50} height={50} alt="logo-mathcontest" />
        <div className={styles.about}>
          <h1>The best game for practicing your multiplication tables</h1>
          <p>
            Mathcontest is a simple game. You just need to calculate the product
            of two numbers.
          </p>
        </div>

        <Room />
        <div className={styles.about}>
          <h2>About</h2>
          <p>
            Dive into a world where numbers dance and you&apos;re the
            choreographer! Welcome to MathContest, the game that transforms
            multiplication into a thrilling adventure. As you step into the
            arena, a flurry of numbers swoop down, challenging you to multiply
            them under the ticking clock! With only 60 seconds on the clock, how
            many can you conquer?
          </p>

          <p>
            Every correct answer fuels your journey towards the grand confetti
            explosion, a celebration of your numerical nimbleness. But the
            battle doesn&apos;t end here; your scores are saved in the halls of
            numeric glory, beckoning you to beat your own best the next time
            around.
          </p>
          <p>
            Not just a game, but a battleground where every correct answer is a
            step towards mastering multiplication! Whether you&apos;re a math
            enthusiast or a numbers newbie, we promise a whirlpool of fun,
            challenge, and learning. So, ready to unleash the Number Ninja in
            you and reign supreme in this numerical battleground? Join the game,
            multiply, and conquer!
          </p>
        </div>
        <div className={styles.community}>
          <h2>Community</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <strong>Adam</strong>
              <p>&quot;This game has changed how I spend my free time!&quot;</p>
            </div>
            <div className={styles.testimonial}>
              <strong>Laeny</strong>
              <p>&quot;I hide in the toilet to play&quot;</p>
            </div>
            <div className={styles.testimonial}>
              <strong>Jane</strong>
              <p>&quot;Surprisingly funnier than I thought&quot;</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
