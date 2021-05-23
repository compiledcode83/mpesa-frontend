import Image from "next/image";
import { Button } from "baseui/button";
import ArrowDown from "baseui/icon/arrow-down";
import styles from "../styles/Header.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [sidebar, setSidebar] = useState(null);
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Image
          className={styles.headerLogo}
          src="/images/logo.svg"
          width={120}
          height={80}
          minWidth={100}
        />
        <ul className={styles.headerTabs}>
          <li className={`${router.pathname == "/" && styles.active}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${router.pathname == "/features" && styles.active}`}>Features</li>
          <li className={`${router.pathname == "/about" && styles.active}`}>About</li>
          <li className={`${router.pathname == "/faq" && styles.active}`}>FAQ</li>
          <li className={`${router.pathname == "/contact" && styles.active}`}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className={styles.headerRight}>
        <p>
          <Button className={styles.headerAdmin}>
            <img src="/images/adminIcon.svg" alt="" width={15} height={15} />
            <a className={styles.admin}>ADMIN LOGIN</a>
          </Button>
        </p>
        <p>
          <Button
            className={styles.headerDownload}
            startEnhancer={() => <ArrowDown size={24} />}
          >
            DOWNLOAD
          </Button>
        </p>
      </div>
      {/* Sidebar */}
      <input
        type="checkbox"
        hidden
        className={`${sidebar ? styles.openSidebarMenu : ""}`}
        id="openSidebarMenu"
      />
      <label
        htmlFor={`${sidebar ? "openSidebarMenu" : ""}`}
        className={styles.sidebarIconToggle}
        onClick={() => setSidebar(true)}
      >
        <Image
          src="/images/menu.svg"
          alt=""
          width={35}
          height={35}
          backgroundColor={"white"}
        />
      </label>
      <div className={styles.sidebarMenu}>
        <ul className={styles.sidebarMenuInner}>
          <li
            onClick={() => setSidebar(false)}
            className={styles.sidebarMenuList}
          >
            Home
          </li>
          <li
            onClick={() => setSidebar(false)}
            className={styles.sidebarMenuList}
          >
            Features
          </li>
          <li
            onClick={() => setSidebar(false)}
            className={styles.sidebarMenuList}
          >
            About
          </li>
          <li
            onClick={() => setSidebar(false)}
            className={styles.sidebarMenuList}
          >
            FAQ
          </li>
          <li
            onClick={() => setSidebar(false)}
            className={styles.sidebarMenuList}
          >
            Contact
          </li>
          <li
            onClick={() => setSidebar(false)}
            className={styles.sidebarMenuList}
          >
            <Button className={styles.headerAdmin}>
              <Image
                src="/images/adminIcon.svg"
                alt=""
                width={15}
                height={15}
              />
              <a className={styles.admin}>ADMIN LOGIN</a>
            </Button>
          </li>
        </ul>
      </div>
      {/* Sidebar */}
    </div>
  );
};

export default Header;
