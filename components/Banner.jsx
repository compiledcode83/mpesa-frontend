import Image from "next/image";
import styles from "../styles/Banner.module.css";
import { Button } from "baseui/button";
import ChevronRight from "baseui/icon/chevron-right";
import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();
  return (
    <div className={styles.banner}>
      <img className={styles.bannerBg} src="/images/shape.svg" alt="" />
      <div className={styles.bannerLeft}>
        <h1 className={styles.bannerHeader}>Buy now, Pay Later</h1>
        <p className={styles.bannerDesp}>
          Buy products and pay for them later
        </p>
        <Button
          className={styles.bannerButton}
          onClick={() => {router.push('https://sevi.io/app') }}
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
