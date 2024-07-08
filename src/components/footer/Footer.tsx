import { baseUrls } from "../../assets/constants";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Designed & Built by{" "}
        <a
          href={baseUrls.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Mario Vargas
        </a>{" "}
        &copy;2024
      </p>
    </footer>
  );
};

export default Footer;
