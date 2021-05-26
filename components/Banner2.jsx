import Image from "next/image";
import styles from "../styles/Banner2.module.css";

const Banner2 = () => {
  return (
    <div className={styles.banner2}>
      <div className={styles.banner2Image}>
        <Image src="/images/process.svg" alt="" width={900} height={800} />
      </div>
      <h1 className={styles.banner2Title}>
        Focus On
        <br />
        Your Business
        <br />
        <span className={styles.banner2Desp}>
          While you are doing your business like no-one else can. We allow you
          to sell your products on credit without the hassle or risk.{" "}
        </span>
      </h1>
    </div>
  );
};

export default Banner2;
