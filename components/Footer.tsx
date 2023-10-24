import Image from "next/image";
import styles from "../styles/app.module.css";
import Github from "../public/github.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      This game is open-source
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={Github} alt="github-logo" width={20} height={20} />
      </a>
    </footer>
  );
}
