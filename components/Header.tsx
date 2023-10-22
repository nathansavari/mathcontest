import styles from "../styles/app.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.logo}>
        MathContest
      </Link>
    </header>
  );
}
