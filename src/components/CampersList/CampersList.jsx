import { useDispatch, useSelector } from "react-redux";
import styles from "./CampersList.module.css";
import Icon from "../Icon/Icon";
import { selectAllCampers } from "../../redux/campers/selectors";
import { selectAllFavCampers } from "../../redux/user/selectors";
import { addToFavList, removeFromFavList } from "../../redux/user/slice";
import { useEffect, useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

const CampersList = ({ mode }) => {
  const campers = useSelector(selectAllCampers);
  const favCampers = useSelector(selectAllFavCampers);
  const items = mode === "catalogue" ? campers : favCampers;
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCamper, setCamper] = useState({});

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
        {items.map((camper) => (
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
                  <p>€{camper.price}.00</p>
                  <button
                    type="button"
                    aria-label="Add to favourites"
                    onClick={() => toggleFav(camper)}
                    className={styles.favButton}
                  >
                    {favCampers.some((favCamper) => favCamper.id === camper.id) ? (
                      <Icon id={"heart-red"} width={25} height={25} />
                    ) : (
                      <Icon id={"heart"} width={25} height={25} />
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.camperRatingAndLocation}>
                <div className={styles.camperRatingContainer}>
                  <Icon id={"star"} width={25} height={25} fillColor="#ffc531" />
                  <p className={styles.camperRating}>
                    {camper.rating}
                    {`(${camper.reviews?.length || 0} Reviews)`}
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
                  <Icon width={20} height={20} id={"people"} />
                  <p className={styles.camperDetailText}>{camper.adults} Adults</p>
                </li>
                <li className={styles.camperDetail}>
                  <Icon width={20} height={20} id={"transmission"} />
                  <p className={styles.camperDetailText}>{camper.transmission}</p>
                </li>
                <li className={styles.camperDetail}>
                  <Icon width={20} height={20} id={"petrol"} />
                  <p className={styles.camperDetailText}>{camper.engine}</p>
                </li>
                <li className={styles.camperDetail}>
                  <Icon width={20} height={20} id={"kitchen"} />
                  <p className={styles.camperDetailText}>
                    {camper.kitchen ? "Kitchen" : "No Kitchen"}
                  </p>
                </li>
                <li className={styles.camperDetail}>
                  <Icon width={20} height={20} id={"ac"} />
                  <p className={styles.camperDetailText}>{camper.AC ? "AC" : "No AC"}</p>
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
        ))}
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
