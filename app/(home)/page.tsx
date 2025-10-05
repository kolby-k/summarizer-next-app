import styles from "./home.module.css";
import Hero from "./ui/Hero";
import Header from "./ui/Header";
import HowItWorks from "./ui/HowItWorks";
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  );
}
