import LinkedinIcon from "../../assets/images/socials/linkedin.svg";
import GithubIcon from "../../assets/images/socials/github.svg";
import { baseUrls } from "../../assets/constants";

const socialMediaLinks = [
  {
    name: "LinkedIn",
    url: baseUrls.linkedin,
    icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    url: baseUrls.github,
    icon: GithubIcon,
  }
];

const NavigationSocials = () => {
  return (
    <section className="social-media">
      {socialMediaLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
        >
          <img src={link.icon} alt={link.name} />
        </a>
      ))}
    </section>
  );
};

export default NavigationSocials;
