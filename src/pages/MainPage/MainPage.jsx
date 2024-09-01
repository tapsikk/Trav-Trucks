import { useState } from "react";
import { useDispatch } from "react-redux";
import CampersList from "../../components/CampersList/CampersList";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./MainPage.module.css";
import { fetchCampers } from "../../redux/campers/operations";
import { resetCampersList } from "../../redux/campers/slice";

const MainPage = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    equipment: [],
  });
  const dispatch = useDispatch()
  return <>
      <Navbar />
      <section>
        <div className={styles.container}>
          <Filter filters={filters} setFilters={setFilters} applyFilters={()=>{
            dispatch(
              resetCampersList()
            );
            dispatch(
              fetchCampers({filters:filters})
            );
          }}/>
          <div style={{display: "flex",flexDirection:'column', alignItems:'center'}}>
            <CampersList mode={"catalogue"} filters={filters} />
          </div>
          </div>
      </section>
    </>
  
};

export default MainPage;
