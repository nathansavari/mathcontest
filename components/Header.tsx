import styles from "../styles/app.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo-mathcontest.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src={Logo} width={25} height={25} alt="logo-mathcontest" />
      <Link href={"/"} className={styles.logo}>
        Mathcontest
      </Link>
    </header>
  );
}
