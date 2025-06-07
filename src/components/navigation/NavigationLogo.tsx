import { NavLink } from "react-router-dom";
import IconBlack from "../../assets/images/icon-black.png";
import scrollToTop from "../../helpers/ScrollToTop";

const NavigationLogo = (props) => {
  return (
    <NavLink
      to="/"
      className="logo-section"
      onClick={() => {
        scrollToTop();
        props.closeMenu();
      }}
    >
      <img src={IconBlack} alt="logo"></img>
    </NavLink>
  );
};

export default NavigationLogo;
