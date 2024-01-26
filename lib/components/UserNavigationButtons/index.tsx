import styles from "./index.module.css";
// import leftIconBlack from "src/assets/caret-left-black.svg";
// import rightIconBlack from "src/assets/caret-right-black.svg";
import leftIconWhite from "src/assets/caret-left-white.png";
import rightIconWhite from "src/assets/caret-right-white.png";

interface UserNavigationButtonsProps {
  slideLeft: () => void;
  slideRight: () => void;
  // showDarkIcons: boolean;
}

function UserNavigationButtons({
  slideLeft,
  slideRight,
}: // showDarkIcons,
UserNavigationButtonsProps) {
  return (
    <div className={styles["navigation-buttons"]}>
      <div className={styles["nav-button"]} onClick={slideLeft}>
        <div className={styles["icon-container"]}>
          {/* {showDarkIcons ? (
            <img src={leftIconBlack} />
          ) : (
            <img src={leftIconWhite} />
          )} */}
          <img src={leftIconWhite} />
        </div>
        {/* may use svg for left & right icons later if we want */}
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.4637 5.4593L8.923 12L15.4637 18.5408C15.5126 18.5896 15.5553 18.6422 15.5919 18.6976C15.8482 19.0858 15.8054 19.6133 15.4637 19.955C15.0732 20.3455 14.4401 20.3455 14.0495 19.955L6.80168 12.7071C6.61415 12.5196 6.50879 12.2653 6.50879 12C6.50879 11.7348 6.61415 11.4805 6.80168 11.2929L14.0495 4.04509C14.4401 3.65457 15.0732 3.65457 15.4637 4.04509C15.8543 4.43561 15.8543 5.06878 15.4637 5.4593Z"
            fill="white"
          />
        </svg> */}
      </div>
      <div className={styles["nav-button"]} onClick={slideRight}>
        <div className={styles["icon-container"]}>
          {/* {showDarkIcons ? (
            <img src={rightIconBlack} />
          ) : (
            <img src={rightIconWhite} />
          )} */}
          <img src={rightIconWhite} />
        </div>
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.54778 18.5408L15.0885 12L8.54778 5.4593C8.49896 5.41049 8.45625 5.35788 8.41964 5.30243C8.18883 4.95287 8.20053 4.49031 8.45472 4.1522C8.48279 4.11487 8.5138 4.07906 8.54778 4.04509C8.65218 3.94069 8.77392 3.8642 8.90373 3.81562C9.0774 3.75062 9.26552 3.73558 9.44588 3.7705C9.63497 3.80711 9.81554 3.89864 9.96199 4.04509L17.2098 11.2929C17.3974 11.4805 17.5027 11.7348 17.5027 12C17.5027 12.2653 17.3974 12.5196 17.2098 12.7072L9.96199 19.955C9.57146 20.3455 8.9383 20.3455 8.54778 19.955C8.49896 19.9062 8.45625 19.8536 8.41964 19.7981C8.16335 19.41 8.20607 18.8825 8.54778 18.5408Z"
            fill="white"
          />
        </svg> */}
      </div>
    </div>
  );
}

export { UserNavigationButtons };
