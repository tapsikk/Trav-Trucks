import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.brand}>Travel<span className={styles.brandSub}>Trucks</span></div>
      <div className={styles.navContainer}>
        <div className={styles.navLinks}>
          <NavLink
            exact
            to="/"
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            Catalog
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
