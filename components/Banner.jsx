import Image from "next/image";
import styles from "../styles/Banner.module.css";
import { Button } from "baseui/button";
import ChevronRight from "baseui/icon/chevron-right";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <img className={styles.bannerBg} src="/images/shape.svg" alt="" />
      <div className={styles.bannerLeft}>
        <h1 className={styles.bannerHeader}>Pay in Installments</h1>
        <p className={styles.bannerDesp}>
          Sell your products on credit to reach more customers. You get paid on
          delivery, while we manage the repayments.
        </p>
        <Button
          className={styles.bannerButton}
          endEnhancer={() => <ChevronRight size={24} />}
        >
          INSTALL APP
        </Button>
      </div>
      <div className={styles.bannerRight}>
        <span className={styles.bannerImage1}>
          <Image src="/images/mobile1.svg" alt="" width={520} height={950} />
        </span>
        <span className={styles.bannerImage2}>
          <Image src="/images/mobile1.svg" alt="" width={490} height={870} />
        </span>
      </div>
    </div>
  );
};

export default Banner;
