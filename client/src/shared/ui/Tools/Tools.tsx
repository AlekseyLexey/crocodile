
export const Tools () {
    return(
        <div className={styles.tools}>
          <button
            className={`${styles.toolButton} ${
              activeTool === "pencil" ? styles.activeTool : ""
            }`}
            onClick={() => handleToolChange("pencil")}
          >
            <img src={pencilIcon} alt="Карандаш" />
          </button>
          <button
            className={`${styles.toolButton} ${
              activeTool === "fill" ? styles.activeTool : ""
            }`}
            onClick={() => handleToolChange("fill")}
          >
            <img src={fillIcon} alt="Заливка" />
          </button>
          <button
            className={`${styles.toolButton} ${
              activeTool === "clear" ? styles.activeTool : ""
            }`}
            onClick={() => handleToolChange("clear")}
          >
            <img src={clearIcon} alt="Очистить" />
          </button>
        </div>
    )
}