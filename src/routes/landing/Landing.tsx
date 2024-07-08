import { useEffect } from "react";
import AboutPreview from "./AboutPreview";
import HeaderPreview from "./HeaderPreview";
import PortfolioPreview from "./PortfolioPreview";
import ContactPreview from "./ContactPreview";
import { Footer } from "../../components";

const Mainpage = () => {
  useEffect(() => {
    document.title = "Mario Vargas | Personal Portfolio";
  });

  return (
    <>
      <article className="main-page">
        <HeaderPreview />
        <AboutPreview />
        <PortfolioPreview />
        <ContactPreview />
        <Footer />
      </article>
     
     </>
  );
};

export default Mainpage;
