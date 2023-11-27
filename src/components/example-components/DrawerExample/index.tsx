import React, { useState } from "react";
import { Drawer } from "src/components/Drawer";

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
          Open Menu
        </span>
        <div style={navMenuStyle}>
          <span>Wishlist</span>
          <span>Cart</span>
          <span>User</span>
        </div>
      </div>
      <Drawer showSidebar={showSidebar} slideFrom={"left"}>
        <div style={logoAndCloseIconStyle}>
          <span>Flipkart</span>
          <span onClick={toggleShowSidebar}>X</span>
        </div>
      </Drawer>
    </div>
  );
};

export { ExampleDrawer };
