import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "src/components/Drawer";
import cartIcon from "src/assets/cart.svg";
import wishListIcon from "src/assets/heart.svg";
import userIcon from "src/assets/user.svg";
import closeIcon from "src/assets/close-icon.svg";
import menuIcon from "src/assets/menu-icon.svg";

/**
 * Navigation is an important part of any website, as a good navigation setup allows users to move around the
 * site quickly and efficiently. This component provides a drawer (also referred to as a sidebar) which can be used for
 *  navigation in a web app.
 *
 * Note:- The Drawer component has a position of fixed so it always gets positioned according to the viewport,
 * i.e. top: 0, left: 0 (or right: 0). If you want to position the drawer w.r.t. some parent element say X then
 * you can pass position: absolute to the style prop of the Drawer and give X the position: relative.
 *
 * Note: The Drawer below is positioned w.r.t. the parent container element as explained in the note above.
 */
const meta = {
  title: "Example/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDrawer: Story = {
  render: () => {
    // Copy all the code inside render function
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

    return (
      <div
        style={{ border: "2px dotted", height: "100vh", position: "relative" }}
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
            width: "100%",
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
  },
};
