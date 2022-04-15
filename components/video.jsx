import React from 'react'
import ReactPlayer from 'react-player'
import styles from "../styles/Banner2.module.css";


const Video = () => {
  return (
    <div className={styles.banner2}>
      
      <h1 className={styles.banner2Title}>
       How it works
        <span className={styles.banner2Desp}>
        Even though you are selling on credit, you get paid on delivery. Watch this video to learn more.
                </span>
      </h1>
      <div className={styles.banner2Image}>
        <div style={{ maxWidth: 640, maxHeight: 480, paddingLeft: 20, paddingRight: 20 }}>
          <ReactPlayer url='https://youtu.be/dWeqTfxqN1I' width="auto" />
        </div>
      </div>
    </div>
  );
};

export default Video;
