import styles from "./Icon.module.css";

const Icon = ({ id, width, height, className = "", fill }) => {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={width}
      height={height}
      aria-hidden="true"
      fill={fill}
    >
      <use href={`/sprite.svg#icon-${id}`}></use>
    </svg>
  );
};

export default Icon;