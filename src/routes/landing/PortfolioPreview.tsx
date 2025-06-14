import { baseUrls } from "../../assets/constants";
import ProjectsPreview from "./ProjectsPreview";

const PortfolioPreview = () => {
  return (
    <article className="portfolio">
      <section className="portfolio-text">
        <h2 className="title-font blue-text h2-tag">Portfolio</h2>
        <p className="white-text p-tag">
          I've invested substantial time in a variety of projects, thoroughly enjoying the process of building things from the ground up. Here are a few of my cherished endeavors that encapsulate my expertise. I've tackled numerous minor projects from diverse courses and challenges, all aimed at mastering the fundamentals. Feel free to explore these on my {" "}
          <span>
            <a
              href={`${baseUrls.github}?tab=repositories`}
              className="blue-text"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
          </span>
        </p>
      </section>
      <ProjectsPreview />
    </article>
  );
};

export default PortfolioPreview;
