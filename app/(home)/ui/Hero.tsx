import Link from "next/link";
import styles from "../home.module.css";
import { LiaArrowDownSolid } from "react-icons/lia";

function Hero() {
  return (
    <div className={`${styles.hero} `}>
      <div className={`${styles.design1}`}>
        <div className={styles.heroTextContainer}>
          <h1>Summarize the Web</h1>
          <h4>Save time with concise article takeaways</h4>
          <div className={styles.heroAction}>
            <Link href={"/login"}>Login</Link>
          </div>
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
