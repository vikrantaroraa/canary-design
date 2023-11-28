import React from "react";
import styles from "src/components/Drawer/index.module.css";
import { DrawerProps } from "src/components/Drawer/index.interface";

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
        right: slideFrom === "right" && (showDrawer === true ? 0 : "-100%"),
        left: slideFrom === "left" && (showDrawer === true ? 0 : "-100%"),
      }}
    >
      {children}
    </div>
  );
};

export { Drawer };
