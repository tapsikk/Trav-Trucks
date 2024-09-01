import styles from "./Filters.module.css";

import Icon from "../Icon/Icon";

const Filter = ({ filters, setFilters, applyFilters }) => {
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      equipment: checked
        ? [...filters.equipment, name]
        : filters.equipment.filter((item) => item !== name),
    });
  };

  const vehicleEquipmentFilters = [
    {
      iconName: "ac",
      filterName: "AC",
      text: "AC"
    },
    {
      iconName: "transmission",
      filterName: "transmission",
      text: "Automatic"
    },
    {
      iconName: "kitchen",
      filterName: "Kitchen",
      text: "Kitchen"
    },
    {
      iconName: "tv",
      filterName: "TV",
      text: "TV"
    },
    {
      iconName: "toilet",
      filterName: "Bathroom",
      text:"Bathroom"
    },
    
  ]

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSection}>
        <label htmlFor="location" className={styles.filterLabel}>
          Location
        </label>
        <label htmlFor="location" className={styles.filterInput}> 
        <Icon id={"ac"} width={25} height={25} />
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            className={styles.hiddenInput}
          />
        </label>
      </div>
        <p className={styles.filterHeader} >Filters</p>
      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Vehicle Equipment</h4>
        <div className={styles.filterButtonGroup}>
          {vehicleEquipmentFilters.map((obj)=>{
            return <button
            key={obj.filterName}
            type="button"
            className={`${styles.filterButton} ${
              filters.equipment.includes(obj.filterName) ? styles.active : ""
              }`}
              onClick={() =>
                handleCheckboxChange({
                  target: {
                    name: obj.filterName,
                    checked: !filters.equipment.includes(obj.filterName),
                  },
                })
              }
              >
            <Icon id={obj.iconName} width={25} height={25} />
            {obj.text}
          </button>})}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterTitle}>Vehicle Type</h4>
        <div className={styles.filterButtonGroup}>
          <button
            type="button"
            className={`${styles.filterButton} ${
              filters.type === "Van" ? styles.active : ""
            }`}
            onClick={() =>
              handleInputChange({ target: { name: "type", value: "Van" } })
            }
          >
            <Icon id={"ac"} width={25} height={25} />
            Van
          </button>
          <button
            type="button"
            className={`${styles.filterButton} ${
              filters.type === "Fully Integrated" ? styles.active : ""
            }`}
            onClick={() =>
              handleInputChange({
                target: { name: "type", value: "Fully Integrated" },
              })
            }
          >
            <Icon id={"ac"} width={25} height={25} />
            Fully Integrated
          </button>
          <button
            type="button"
            className={`${styles.filterButton} ${
              filters.type === "Alcove" ? styles.active : ""
            }`}
            onClick={() =>
              handleInputChange({ target: { name: "type", value: "Alcove" } })
            }
          >
            <Icon id={"ac"} width={25} height={25} />
            Alcove
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.filterApplyButton}
        onClick={applyFilters}
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
