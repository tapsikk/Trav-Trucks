import { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import {
  selectAllCampers,
  selectIsLoading,
} from "../../redux/campers/selectors";
import CampersList from "../../components/CampersList/CampersList";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    equipment: [],
  }); // State for the filters

  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const items = useSelector(selectAllCampers);
  const totalCount = 13;

  const limit = 4;
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    // Fetch campers only when the items array is empty or the page changes
    if (items.length === 0 || page > 1) {
      dispatch(fetchCampers({ page, limit }));
    }
  }, [dispatch, items.length, page, limit]);
  
  return isLoading && items.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <section>
        <div className={styles.container}>
          <Filter filters={filters} setFilters={setFilters} />
          <CampersList mode={"catalogue"} filters={filters} /> 
        </div>
          {items.length < totalCount && (
            <button
              type="button"
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
      </section>
    </>
  );
};

export default MainPage;
