import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.landingContainer}>
      <div className={styles.textSection}>
        <h1 className={styles.mainHeading}>Welcome to Our Project manager</h1>
        <h3 className={styles.subHeading}>
          Sign up today and start working with your peers!
        </h3>
        <p className={styles.description}>
          Join now to organize your tasks, manage projects, and stay on top of
          your goals with ease.
        </p>
        <div className={styles.ctaButtons}>

          <Link to="/signin">
            <button className={styles.signupButton}>Sign In</button>
          </Link>

          <Link to="/signup">
            <button className={styles.loginButton}>Sign Up</button>
          </Link>
        </div>
      </div>
      <div className={styles.imageSection}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
          alt="Landing page"
          className={styles.landingImage}
        />
      </div>
    </main>
  );
};

export default Landing;
