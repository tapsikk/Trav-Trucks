import { useSelector } from "react-redux";
import CampersList from "../../components/CampersList/CampersList";
import { selectAllFavCampers } from "../../redux/user/selectors";
// import styles from "./Favorites.module.css";
import Filter from "../../components/Filter/Filter";
import { useEffect, useState } from "react";
import styles from "../MainPage/MainPage.module.css";

const Favorites = () => {
  const favCampers = useSelector(selectAllFavCampers);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    equipment: [],
  });

  return (
    <>
      <section>
        <div className={styles.container}>
          <Filter filters={filters} setFilters={setFilters} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CampersList mode="favorites" filters={filters} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
