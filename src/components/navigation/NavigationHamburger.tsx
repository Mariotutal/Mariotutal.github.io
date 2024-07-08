import React from "react";
import Whiteham from "../../assets/images/hamburger-white.png";

interface NavigationHamburgerProps {
  toggleMenu: () => void;
}

const NavigationHamburger = React.forwardRef<HTMLImageElement, NavigationHamburgerProps>(
  ({ toggleMenu }, ref) => (
    <section className="ham-section">
      <img
        className="ham-menu"
        src={Whiteham}
        alt="hamburger menu"
        ref={ref}
        onClick={toggleMenu}
      />
    </section>
  )
);

export default NavigationHamburger;
