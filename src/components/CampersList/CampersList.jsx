import { useDispatch, useSelector } from "react-redux";
import styles from "./CampersList.module.css";
import Icon from "../Icon/Icon";
import {
  selectAllCampers,
  selectTotalCount,
} from "../../redux/campers/selectors";
import { selectAllFavCampers } from "../../redux/user/selectors";
import { addToFavList, removeFromFavList } from "../../redux/user/slice";
import { fetchCampers } from "../../redux/campers/operations";
import { useEffect, useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

const CampersList = ({ mode, filters }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const limit = 4;

  const campers = useSelector(selectAllCampers);
  const favCampers = useSelector(selectAllFavCampers);
  const totalCount = useSelector(selectTotalCount);
  const items = mode === "catalogue" ? campers : favCampers;

  const [modalIsOpen, setModailIsOpen] = useState(false);
  const [selectedCamper, setCamper] = useState({});

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (items.length === 0 || page > 1) {
      dispatch(fetchCampers({ page, limit, filters: filters }));
    }
  }, [dispatch, items.length, page, limit]);

  const handleOpenModal = (camper) => {
    setCamper(camper);
    setModailIsOpen(true);
  };

  const closeModal = () => {
    setModailIsOpen(false);
  };

  // const toggleFav = (camper) => {
  //   const isCamperInFavList = favCampers.some(
  //     (favCamper) => favCampper._id === camper._id
  //   );
  //   if (!isCamperInFavList) {
  //     dispatch(addToFavList(camper));
  //   } else {
  //     dispatch(removeFromFavList(camper._id));
  //   }
  // };

  const toggleFav = (camper) => {
    const isCamperInFavList = favCampers.some(
      (favCamper) => favCamper.id === camper.id
    );
    if (!isCamperInFavList) {
      dispatch(addToFavList(camper));
    } else {
      dispatch(removeFromFavList(camper.id));
    }
  };
  
  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [modalIsOpen]);

  return (
    <>
      <ul className={styles.campersList}>
        {items.length ? (
          items.map((camper) => (
            <li className={styles.camper} key={camper.id}>
              <img
                className={styles.camperImg}
                src={camper.gallery[0].thumb}
                alt={camper.name}
              />
              <div className={styles.camperContent}>
                <div className={styles.camperHeader}>
                  <p className={styles.camperName}>{camper.name}</p>
                  <div className={styles.camperPriceContainer}>
                    <p>€{camper.price},00</p>
                    <button
                      type="button"
                      aria-label="Add to favourites"
                      onClick={() => toggleFav(camper)}
                      className={styles.favButton}
                    >
                      {favCampers.some(
                        (favCamper) => favCamper.id === camper.id
                      ) ? (
                        <Icon id={"heart-red"} width={25} height={25} />
                      ) : (
                        <Icon id={"heart"} width={25} height={25} />
                      )}
                    </button>
                  </div>
                </div>
                <div className={styles.camperRatingAndLocation}>
                  <div className={styles.camperRatingContainer}>
                    <Icon
                      id={"star"}
                      width={25}
                      height={25}
                      fillColor="#ffc531"
                    />
                    <p className={styles.camperRating}>
                      {camper.rating}
                      {`(${camper.reviews.length} Reviews)`}
                    </p>
                  </div>
                  <div className={styles.camperLocationContainer}>
                    <Icon id={"map-pin"} width={16} height={16} />
                    <p className={styles.camperLocation}>{camper.location}</p>
                  </div>
                </div>
                <p className={styles.camperDescription}>{camper.description}</p>
                <ul className={styles.camperDetailsList}>
                  <li className={styles.camperDetail}>
                    <Icon id={"people"} width={20} height={20} />
                    <p className={styles.camperDetailText}>
                      {camper.adults} Adults
                    </p>
                  </li>
                  <li className={styles.camperDetail}>
                    <Icon id={"transmission"} width={20} height={20} />
                    <p className={styles.camperDetailText}>
                      {camper.transmission}
                    </p>
                  </li>
                  <li className={styles.camperDetail}>
                    <Icon id={"petrol"} width={20} height={20} />
                    <p className={styles.camperDetailText}>{camper.engine}</p>
                  </li>
                  <li className={styles.camperDetail}>
                    <Icon id={"kitchen"} width={20} height={20} />
                    <p className={styles.camperDetailText}>
                      {camper.kitchen ? "Kitchen" : "No Kitchen"}
                    </p>
                  </li>
                  <li className={styles.camperDetail}>
                    <Icon id={"ac"} width={20} height={20} />
                    <p className={styles.camperDetailText}>
                      {camper.AC ? "AC" : "No AC"}
                    </p>
                  </li>
                </ul>
                <button
                  className={styles.showMoreButton}
                  onClick={() => handleOpenModal(camper)}
                  type="button"
                >
                  Show more
                </button>
              </div>
            </li>
          ))
        ) : (
          <div
            className={`${styles.camperContent} ${styles.noVehicleContainer}`}
          >
            {" "}
            <span>No vehicle found</span>
          </div>
        )}
        {(items.length < totalCount && (
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )) || <div className="camperContent noVehicleContainer"></div>}
      </ul>
      {modalIsOpen && (
        <ModalWindow
          isOpen={modalIsOpen}
          closeModal={closeModal}
          camper={selectedCamper}
        />
      )}
    </>
  );
};

export default CampersList;
