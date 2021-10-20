import React from 'react'
import ReactPlayer from 'react-player'
import styles from "../styles/Banner2.module.css";


const Video = () => {
  return (
    <div className={styles.banner2}>
      
      <h1 className={styles.banner2Title}>
       Text for
        <br />
        demo video
                <br />
        <span className={styles.banner2Desp}>
        some fancy tagline.

        {" "}
        </span>
      </h1>
      <div className={styles.banner2Image}>
      <ReactPlayer url='https://www.youtube.com/watch?v=NV5Z1A_M-Fo&t=14s' />
      </div>
    </div>
  );
};

export default Video;
