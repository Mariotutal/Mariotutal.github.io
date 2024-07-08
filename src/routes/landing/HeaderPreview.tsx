import { Link } from "react-router-dom";

const HeaderPreview = () => {
  return (
    <article className="header">
      <h1 className="header-font white-text h1-tag">
        Hi, I'm <br></br>
        <em className="blue-text">Mario Vargas</em>
        <br></br>web developer
      </h1>
      <p className="gray-text p-tag">FullStack Developer</p>
      <Link className="blue-text" to="/portfolio">
        Check my work
      </Link>
    </article>
  );
};

export default HeaderPreview;
