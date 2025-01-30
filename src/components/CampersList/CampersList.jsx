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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCamper, setCamper] = useState({});
  const [animatingFavs, setAnimatingFavs] = useState({});

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    dispatch(fetchCampers({ page, limit, filters }));
  }, [dispatch, page, filters]);

  const handleOpenModal = (camper) => {
    setCamper(camper);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleFav = (camper) => {
    const isCamperInFavList = favCampers.some(
      (favCamper) => favCamper.id === camper.id
    );

    setAnimatingFavs((prev) => ({
      ...prev,
      [camper.id]: isCamperInFavList ? "removing" : "animated",
    }));

    setTimeout(() => {
      if (!isCamperInFavList) {
        dispatch(addToFavList(camper));
      } else {
        dispatch(removeFromFavList(camper.id));
      }

      setAnimatingFavs((prev) => ({
        ...prev,
        [camper.id]: "",
      }));
    }, 200);
  };

  useEffect(() => {
    document.body.classList.toggle(styles.noScroll, modalIsOpen);
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
                      className={`${styles.favButton} ${
                        styles[animatingFavs[camper.id]] || ""
                      }`}
                    >
                      {favCampers.some((favCamper) => favCamper.id === camper.id)
                        ? <Icon id={"heart-red"} width={25} height={25} />
                        : <Icon id={"heart"} width={25} height={25} />}
                    </button>
                  </div>
                </div>
                <div className={styles.camperRatingAndLocation}>
                  <div className={styles.camperRatingContainer}>
                    <Icon id={"star"} width={25} height={25} fillColor="#ffc531" />
                    <p className={styles.camperRating}>
                      {camper.rating} ({camper.reviews.length} Reviews)
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
                    <p className={styles.camperDetailText}>{camper.adults} Adults</p>
                  </li>
                  <li className={styles.camperDetail}>
                    <Icon id={"transmission"} width={20} height={20} />
                    <p className={styles.camperDetailText}>{camper.transmission}</p>
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
          <div className={`${styles.camperContent} ${styles.noVehicleContainer}`}>
            <span>No vehicle found</span>
          </div>
        )}
        {items.length < totalCount && (
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </ul>
      {modalIsOpen && (
        <ModalWindow isOpen={modalIsOpen} closeModal={closeModal} camper={selectedCamper} />
      )}
    </>
  );
};

export default CampersList;
