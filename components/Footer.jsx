import { Button } from "baseui/button";
import styles from "../styles/Footer.module.css";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <ul className={styles.footerHeader}>
          <li className={styles.footerTab}>Community</li>
          {/* <li className={styles.footerTab}>For Talents</li>
          <li className={styles.footerTab}>For Companies</li>
          <li className={styles.footerTab}>Facebook Group</li>
          <li className={styles.footerTab}>FAQ</li> */}
        </ul>
        <ul className={styles.footerHeader}>
          <li className={styles.footerTab}>About Us</li>
          {/* <li className={styles.footerTab}>Request Demo</li> */}
          <li className={styles.footerTab}>Android App</li>
          <li onClick={() => {router.push("https://docs.sevi.io/docs/business%20partners/becomePartner")}}  className={styles.footerTab}>Partners</li>
        </ul>
        <ul className={styles.footerHeader}>
          <li className={styles.footerTab}>Information</li>
          {/* <li className={styles.footerTab}>Services</li> */}
          <li onClick={() => {router.push("https://docs.sevi.io/privacy")}}  className={styles.footerTab}>Privacy Policy</li>
          <li  onClick={() => {router.push("https://docs.sevi.io/termsConditions")}} className={styles.footerTab}>Terms & conditions</li>
        </ul>
        <ul className={styles.footerHeader}>
          {/* <li className={styles.footerTab}>Subscribe to Our Newsletter</li> */}
          {/* <li className={styles.footerTab}>
            Time is the most precious thing you have when bootstrapping. You
            can't take time.
          </li> */}
          {/* <li className={styles.footerTabButton}>
            <input type="text" placeholder="Enter Your Email" />
            <Button className={styles.footerButton}>SUBSCRIBE</Button>
          </li> */}
        </ul>
      </div>
      <span className={styles.footerBottom}>
        Copyright 2021. All rights reserved by us
      </span>
    </div>
  );
};

export default Footer;
