import React, { useState } from "react";
import { Drawer } from "src/components/Drawer";
import cartIcon from "src/assets/cart.svg";
import wishListIcon from "src/assets/heart.svg";
import userIcon from "src/assets/user.svg";
import closeIcon from "src/assets/close-icon.svg";
import menuIcon from "src/assets/menu-icon.svg";

const ExampleDrawer = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
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

  return (
    <div>
      <div style={appHeaderStyle}>
        <span onClick={toggleShowSidebar} title="Click to open menu drawer">
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
      <Drawer showSidebar={showSidebar} slideFrom={"left"}>
        <div style={logoAndCloseIconStyle}>
          <span>Flipkart</span>
          <span onClick={toggleShowSidebar} title="Click to close menu drawer">
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
