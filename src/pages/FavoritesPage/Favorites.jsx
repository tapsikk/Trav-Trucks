import { useSelector } from "react-redux";
import CampersList from "../../components/CampersList/CampersList";
import { selectAllFavCampers } from "../../redux/user/selectors";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const favCampers = useSelector(selectAllFavCampers);

  return (
    <div>
      <h2>Favorites</h2>
      {favCampers.length > 0 ? (
        <CampersList mode="favorites" />
      ) : (
        <p className={styles.noFavorites}>No favorite vehicles yet.</p>
      )}
    </div>
  );
};

export default Favorites;
