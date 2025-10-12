import styles from "../home.module.css";

function HowItWorks() {
  return (
    <div className={styles.howItWorks}>
      <h3>How It Works</h3>
      <ol>
        <li>1. Paste a URL for any article.</li>
        <li>2. Click Generate Summary.</li>
        <li>3. Read a clear, concise overview with the key takeaways.</li>
      </ol>
    </div>
  );
}

export default HowItWorks;
