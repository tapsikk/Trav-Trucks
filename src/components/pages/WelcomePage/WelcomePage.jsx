import { Link } from "react-router-dom";
import styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.description}>
          You can find everything you want in our catalog
          </p>
          <Link className={styles.link} to="/catalog">
          View Now
          </Link>
      </div>
    </section>
  );
}; 
  


export default WelcomePage;
