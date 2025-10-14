import Link from "next/link";
import styles from "../home.module.css";
import { LiaArrowDownSolid } from "react-icons/lia";

function Hero() {
  return (
    <div className={`${styles.hero} `}>
      <div className={`${styles.design1}`}>
        <div className={styles.heroTextContainer}>
          <h1>Summarizer</h1>
          <h3>Read Less. Know More.</h3>
          <div className={styles.heroAction}>
            <Link href={"/login"}>Login</Link>
          </div>
          <h5>Save time with concise article summaries</h5>
        </div>
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
