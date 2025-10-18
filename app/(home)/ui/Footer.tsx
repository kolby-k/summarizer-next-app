import Link from "next/link";
import styles from "../home.module.css";
import Logo from "@/components/Logo";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.footerMenu}>
        <Link href={"/summarize"}>Summarize</Link>
        <Link href={"/bookmakrs"}>Bookmarks</Link>
        <Link href={"/login"}>Get Started</Link>
      </div>
      <div className={styles.demoDisclaimer}>
        Note: This website is a demo project made by{" "}
        <a href="https://kolbyk.ca/" target="_blank">
          Kolby Klassen
        </a>
      </div>
    </div>
  );
}

export default Footer;
