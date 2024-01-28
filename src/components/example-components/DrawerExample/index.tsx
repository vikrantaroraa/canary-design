import React, { useState } from "react";
import { Drawer } from "src/components/Drawer";
import cartIcon from "src/assets/cart.svg";
import wishListIcon from "src/assets/heart.svg";
import userIcon from "src/assets/user.svg";
import closeIcon from "src/assets/close-icon.svg";
import menuIcon from "src/assets/menu-icon.svg";

const ExampleDrawer = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleShowDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const appHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: "12px 28px",
    fontSize: "18px",
    fontWeight: 500,
    cursor: "pointer",
  };

  const navMenuStyle: React.CSSProperties = {
    display: "flex",
    gap: "65px",
  };

  const imageContainerStyle: React.CSSProperties = {
    height: 26,
    width: 26,
  };

  const imageStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };

  const logoAndCloseIconStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#d3d3d3",
    padding: "20px 28px",
    fontSize: "22px",
    fontWeight: 700,
    color: "#5a5a5a",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
  };
  // Note:- Here, We have commented the styles in line 57 (for the top-level container) and in line 90 (for the Drawer component)
  // because the top level container by default does not have any margin from the top (or any other direction), and since the drawer
  // is positioned w.r.t. the viewport by default, hence, the Drawer will also not have any margin from the top.

  // But if you un-comment the styles for the top-level container, then it will have a margin-top of 100px, then to
  // adjust the Drawer according to the Parent i.e. the top-level container, we will also have to give position: "absolute"
  // to the Drawer.
  return (
    <div
      style={{
        marginTop: 100,
        border: "2px dotted",
        height: "100vh",
        position: "relative",
      }}
    >
      <div style={appHeaderStyle}>
        <span onClick={toggleShowDrawer} title="Click to open menu drawer">
          <span style={imageContainerStyle}>
            <img src={menuIcon} style={imageStyle} />
          </span>
        </span>
        <div style={navMenuStyle}>
          <span style={imageContainerStyle} title="dummy icon">
            <img src={wishListIcon} style={imageStyle} />
          </span>
          <span style={imageContainerStyle} title="dummy icon">
            <img src={cartIcon} style={imageStyle} />
          </span>
          <span style={imageContainerStyle} title="dummy icon">
            <img src={userIcon} style={imageStyle} />
          </span>
        </div>
      </div>
      <Drawer
        showDrawer={showDrawer}
        slideFrom={"left"}
        style={{
          position: "absolute",
        }}
      >
        <div style={logoAndCloseIconStyle}>
          <span>Flipkart</span>
          <span onClick={toggleShowDrawer} title="Click to close menu drawer">
            <span style={imageContainerStyle}>
              <img src={closeIcon} style={imageStyle} />
            </span>
          </span>
        </div>
      </Drawer>
    </div>
  );
};

export { ExampleDrawer };
