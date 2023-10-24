import Image from "next/image";
import styles from "../styles/app.module.css";
import Github from "../public/github.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      This game is open-source
      <a
        href="https://github.com/nathansavari/mathcontest"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={Github} alt="github-logo" width={20} height={20} />
      </a>
    </footer>
  );
}
