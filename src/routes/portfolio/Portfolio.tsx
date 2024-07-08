import { useEffect } from "react";
import Projects from "./Projects";
import Footer from "../../components/footer/Footer";
import PortfolioDescription from "./PortfolioDescription";

const Portfolio = () => {
  useEffect(() => {
    document.title = "Portfolio | Mario Vargas";
  })
  return (
    <article className="portfolio-main">
      <PortfolioDescription />
      <Projects />
      <Footer />
    </article>
  );
};

export default Portfolio;
