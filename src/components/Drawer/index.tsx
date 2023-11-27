import React from "react";
import styles from "src/components/Drawer/index.module.css";
import { DrawerProps } from "src/components/Drawer/index.interface";

const Drawer = ({ showSidebar, slideFrom, children }: DrawerProps) => {
  return (
    <div
      className={
        showSidebar
          ? `${styles["sidebar-filter"]} ${styles["active"]}`
          : styles["sidebar-filter"]
      }
      style={{
        width: showSidebar
          ? window.innerWidth > 500
            ? 500
            : window.innerWidth
          : 0,
        right: slideFrom === "right" && (showSidebar === true ? 0 : "-100%"),
        left: slideFrom === "left" && (showSidebar === true ? 0 : "-100%"),
        // backgroundColor: "lightgreen"
        backgroundColor: "#efefee",
      }}
    >
      {children}
    </div>
  );
};

export { Drawer };
