import { baseUrls } from "../../assets/constants";

const PortfolioDescription = () => {
  return (
    <section className="portfolio-text">
      <h2 className="title-font blue-text h2-tag">Portfolio</h2>
      <p className="white-text p-tag">
        Hey there! I'm a passionate Full-stack Developer specializing in crafting intuitive user experiences and robust applications. With a solid foundation in Computer Science and a knack for Business Intelligence, I thrive on turning complex ideas into seamless digital solutions across diverse industries.        <span>
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
  );
};

export default PortfolioDescription;
