import CampersList from "../../components/CampersList/CampersList";
import Filter from "../../components/Filter/Filter";
import { useState } from "react";
import styles from "../MainPage/MainPage.module.css";

const Favorites = () => {

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
