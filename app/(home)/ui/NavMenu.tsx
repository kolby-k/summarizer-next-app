import Link from "next/link";
import styles from "../home.module.css";

function NavMenu() {
  return (
    <>
      <div className={styles.navMenu}>
        <Link href="#hiw">How It Works</Link>
        <Link href="/summarize">Summarize</Link>
      </div>
    </>
  );
}

export default NavMenu;
