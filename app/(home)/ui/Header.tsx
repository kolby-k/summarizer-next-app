import Logo from "@/components/Logo";
import React from "react";
import NavMenu from "./NavMenu";
import styles from "../home.module.css";
import LoginRedirect from "./LoginRedirect";

function Header() {
  return (
    <div className={`${styles.header}`}>
      <Logo />
      <NavMenu />
      <LoginRedirect />
    </div>
  );
}

export default Header;
