import Link from "next/link";
import styles from "../home.module.css";

function LoginRedirect() {
  return (
    <Link href="/login" className={styles.loginRedirect}>
      Login
    </Link>
  );
}

export default LoginRedirect;
