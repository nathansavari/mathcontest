import styles from "../styles/app.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Soutenir le site
      </a>
    </footer>
  );
}
