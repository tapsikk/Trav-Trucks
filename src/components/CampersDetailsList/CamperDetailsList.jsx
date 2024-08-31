import Icon from "../Icon/Icon";
import styles from "./CamperDetailsList.module.css";

const CamperDetailsList = ({ camper }) => {
  return (
    <ul className={styles.camperDetailsList}>
      {Boolean(camper?.adults) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"people"} />
          <p className={styles.camperDetailText}>{camper.adults} Adults</p>
        </li>
      )}
      {Boolean(camper?.transmission) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"transmission"} />
          <p className={styles.camperDetailText}>{camper.transmission}</p>
        </li>
      )}
      {Boolean(camper?.AC) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"ac"} />
          <p className={styles.camperDetailText}>AC</p>
        </li>
      )}
      {Boolean(camper?.engine) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"petrol"} />
          <p className={styles.camperDetailText}>{camper.engine}</p>
        </li>
      )}
      {Boolean(camper?.kitchen) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"kitchen"} />
          <p className={styles.camperDetailText}>Kitchen</p>
        </li>
      )}
      {Boolean(camper?.bathroom) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"toilet"} />
          <p className={styles.camperDetailText}>Bathroom</p>
        </li>
      )}
      {Boolean(camper?.radio) && (
        <li className={styles.camperDetail}>
          <Icon width={20} height={20} id={"radio"} />
          <p className={styles.camperDetailText}>Radio</p>
        </li>
      )}
    </ul>
  );
};

export default CamperDetailsList;
