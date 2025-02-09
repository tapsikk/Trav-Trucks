import styles from "./Icon.module.css";

const Icon = ({ id, width, height, className = "" }) => {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use href={`/sprite.svg#icon-${id}`}></use>
    </svg>
  );
};

export default Icon;