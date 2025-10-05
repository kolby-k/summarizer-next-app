import Link from "next/link";
import styles from "../home.module.css";
import { LiaArrowDownSolid } from "react-icons/lia";

function Hero() {
  return (
    <div className={`${styles.hero}`}>
      <div className={styles.heroText}>
        <h1>Summarize Any Article Instantly</h1>
        <h4>Paste a link and get a clear, concise summary in seconds!</h4>
      </div>
      <div className={styles.heroAction}>
        <Link href={"/login"}>Login</Link>
      </div>
      <div className={styles.nextSectionLabel}>
        <LiaArrowDownSolid
          size={50}
          className={`${styles.downArrow} ${styles.colorShift}`}
        />
      </div>
    </div>
  );
}

export default Hero;
