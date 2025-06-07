import { NavLink } from "react-router-dom";
import scrollToTop from "../../helpers/ScrollToTop";

const activeNavLink = ({ isActive }) => 
  `gray-text nav-link${isActive ? " active" : ""}`;

const NavigationMenu = ({ closeMenu }) => {
  const handleClick = () => {
    scrollToTop();
    closeMenu();
  };

  return (
    <section className="menu-links">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `gray-text nav-link${isActive ? " main-active" : ""}`}
        onClick={handleClick}
      >
        Main
      </NavLink>
      <NavLink
        to="/about"
        className={activeNavLink}
        onClick={handleClick}
      >
        About
      </NavLink>
      <NavLink
        to="/portfolio"
        className={activeNavLink}
        onClick={handleClick}
      >
        Portfolio
      </NavLink>
      <NavLink
        to="/contact"
        className={activeNavLink}
        onClick={handleClick}
      >
        Contact
      </NavLink>
    </section>
  );
};

export default NavigationMenu;
