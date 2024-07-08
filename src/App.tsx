import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, About, Portfolio, Contact } from "./routes/index.ts";
import "./core-ui/Styles.sass";
import './routes/about/About.sass'
import './routes/contact/Contact.sass'
import './core-ui/Hover.sass'
import './routes/landing/Landing.sass'
import './routes/portfolio/Portfolio.sass'
import './components/footer/Footer.sass'
import './components/navigation/Navigation.sass'
import Navigation from "./components/navigation/Navigation";

const App = () => {
    return (
        <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    );
  };

  export default App;