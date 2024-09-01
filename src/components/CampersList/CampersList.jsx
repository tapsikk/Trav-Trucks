
import { useDispatch, useSelector } from "react-redux";
import styles from "./CampersList.module.css";
import Icon from "../Icon/Icon";
import { selectAllCampers } from "../../redux/campers/selectors";
import { selectAllFavCampers } from "../../redux/user/selectors";
import { addToFavList, removeFromFavList } from "../../redux/user/slice";
import { useEffect, useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

const CampersList = ({ mode, filters }) => {
  const campers = useSelector(selectAllCampers);
  const favCampers = useSelector(selectAllFavCampers);
  const items = mode === "catalogue" ? campers : favCampers;
  const dispatch = useDispatch();
  const [modalIsOpen, setModailIsOpen] = useState(false);
  const [selectedCamper, setCamper] = useState({});
  const filteredItems = items.filter((camper) => {
    const matchesLocation =
      filters.location === "" ||
      camper.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType =
      filters.type === "" || camper.type === filters.type;

    const matchesEquipment = filters.equipment.every((eq) =>
      camper.equipment.includes(eq)
    );

    return matchesLocation && matchesType && matchesEquipment;
  });

  const handleOpenModal = (camper) => {
    setCamper(camper);
    setModailIsOpen(true);
  };

  const closeModal = () => {
    setModailIsOpen(false);
  };

  const toggleFav = (camper) => {
    const isCamperInFavList = favCampers.some(
      (favCamper) => favCamper._id === camper._id
    );
    console.log(isCamperInFavList);
    if (!isCamperInFavList) {
      console.log("added");
      dispatch(addToFavList(camper));
    } else {
      console.log("removed");
      dispatch(removeFromFavList(camper._id));
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
      {" "}
      <ul className={styles.campersList}>
        {filteredItems.map((camper) => {
          return (
            <li className={styles.camper} key={camper.id}>
              <img className={styles.camperImg} src={camper.gallery[0].thumb} />
              <div className={styles.camperContent}>
                <div className={styles.camperHeader}>
                  <p className={styles.camperName}>{camper.name}</p>
                  <div className={styles.camperPriceContainer}>
                    <p>€{camper.price},00 </p>
                    <button
                      type="button"
                      aria-label="Add to favourites"
                      onClick={() => toggleFav(camper)}
                      className={styles.favButton}
                    >
                      {favCampers.some(
                        (favCamper) => favCamper._id === camper._id
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
                  <p className={styles.camperDetailText}>{camper.adults}2 Adults</p>
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
                  <Icon  id={"ac"} width={20} height={20} />
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
          );
        })}
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
