import styles from "./index.module.css";

export interface DrawerProps {
  showDrawer: boolean;
  slideFrom: string;
  children: JSX.Element | JSX.Element[];
  style?: object;
}

const Drawer = ({ showDrawer, slideFrom, children, style }: DrawerProps) => {
  return (
    <div
      className={
        showDrawer
          ? `${styles["drawer"]} ${styles["drawer-active"]}`
          : styles["drawer"]
      }
      // we don't want the user to be able to change the "right" and "left" css property logic so we have used
      // those properties after the style prop. All style properties that are written before the style prop
      // object can be overwritten by the user.
      style={{
        width: showDrawer
          ? window.innerWidth > 500
            ? 500
            : window.innerWidth
          : 0,
        backgroundColor: "#efefee",
        ...style,
        right:
          slideFrom === "right"
            ? showDrawer === true
              ? 0
              : "-100%"
            : undefined,
        left:
          slideFrom === "left"
            ? showDrawer === true
              ? 0
              : "-100%"
            : undefined,
      }}
    >
      {children}
    </div>
  );
};

export { Drawer };
