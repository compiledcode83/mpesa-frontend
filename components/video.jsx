import React from 'react'
import ReactPlayer from 'react-player'
import styles from "../styles/Banner2.module.css";


const Video = () => {
  return (
    <div className={styles.banner2}>
      
      <h1 className={styles.banner2Title}>
       How it works
        <span className={styles.banner2Desp}>
        Even though you are selling on credit, you get paid on delivery. 
        As a Sevi partner you share in the interest earned, making this an additional business model for your company.
        </span>
      </h1>
      <div className={styles.banner2Image}>
      <ReactPlayer url='https://www.youtube.com/watch?v=NV5Z1A_M-Fo&t=14s' />
      </div>
    </div>
  );
};

export default Video;
