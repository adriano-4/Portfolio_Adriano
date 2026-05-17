// components/Navbar.jsx
import {
  FaInfoCircle,
  FaCode,
  FaEnvelope,
  FaTools,
  FaBriefcase,
} from "react-icons/fa";
import logotokyadriano from "../assets/logo toky adriano.png";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <a href="#hero">
          <img src={logotokyadriano} alt="Logo Toky Adriano" />
        </a>
      </div>

      {/* Liens de navigation */}
      <ul className="navbar-links">
        <li>
          <a href="#about">
            <FaInfoCircle /> <span>À propos</span>
          </a>
        </li>
        <li>
          <a href="#projects">
            <FaCode /> <span>Projets</span>
          </a>
        </li>
        <li>
          <a href="#services">
            <FaTools /> <span>Services</span>
          </a>
        </li>
        <li>
          <a href="#experience">
            <FaBriefcase /> <span>Expérience</span>
          </a>
        </li>
        <li>
          <a href="#contact">
            <FaEnvelope /> <span>Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
