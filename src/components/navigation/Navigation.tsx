import { useState, useRef, RefObject } from "react";
import Whiteham from "../../assets/images/hamburger-white.png";
import WhiteXham from "../../assets/images/x-ham-white.png";
import NavigationHamburger from "./NavigationHamburger";
import NavigationLogo from "./NavigationLogo";
import NavigationMenu from "./NavigationMenu";
import NavigationSocials from "./NavigationSocials";

const Navigation = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const hamburgerRef = useRef<HTMLImageElement>(null);

  const toggleMenu = () => {
    setIsMenuHidden((prevHidden) => {
      const newHiddenState = !prevHidden;
      if (hamburgerRef.current) {
        hamburgerRef.current.src = newHiddenState ? Whiteham : WhiteXham;
      }
      return newHiddenState;
    });
  };

  const closeMenu = () => {
    setIsMenuHidden(true);
    if (hamburgerRef.current) {
      hamburgerRef.current.src = Whiteham;
    }
  };

  return (
    <article className="side-menu">
      <NavigationHamburger toggleMenu={toggleMenu} ref={hamburgerRef as RefObject<HTMLImageElement>} />
      <section className={`main-menu${isMenuHidden ? "" : " active-menu"}`}>
        <NavigationLogo closeMenu={closeMenu} />
        <NavigationMenu closeMenu={closeMenu} />
        <NavigationSocials />
      </section>
    </article>
  );
};

export default Navigation;
