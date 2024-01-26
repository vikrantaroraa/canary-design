import styles from "./index.module.css";

interface UserIndicatorComponentProps {
  index: number;
  activeIndex: number;
  changeImage: (index: number) => void;
}

const UserIndicatorComponent = ({
  index,
  activeIndex,
  changeImage,
}: UserIndicatorComponentProps) => {
  return (
    <div className={styles["dot"]} onClick={() => changeImage(index)}>
      {index === activeIndex && <div className={styles["inner-dot"]}></div>}
    </div>
  );
};

export { UserIndicatorComponent };
