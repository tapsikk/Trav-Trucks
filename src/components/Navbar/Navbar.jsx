import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        Travel<span className={styles.brandSub}>Trucks</span>
      </div>
        <div className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            Catalog
          </NavLink>
        </div>
    </nav>
  );
};

export default Navbar;
