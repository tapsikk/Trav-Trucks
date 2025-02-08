import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import ThemeButton from "../other/ThemeButton/ThemeButton";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Trav
        <span className={styles.brandSub}>Trucks</span>
      </NavLink>
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
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : styles.navLink
          }
        >
          Favorites
        </NavLink>
      </div>
      <div className={styles.themeButtonContainer}>
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
