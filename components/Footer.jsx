// // components/Footer.jsx
// import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="footer">
//       <div className="footer-links">
//         <a
//           href="https://github.com/adriano-4"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaGithub style={{ marginRight: "6px", verticalAlign: "middle" }} />
//           GitHub
//         </a>
//         <a
//           href="https://www.linkedin.com/in/adriano-randrianambinina-aa5285336/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin style={{ marginRight: "6px", verticalAlign: "middle" }} />
//           LinkedIn
//         </a>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
// components/Footer.jsx

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFacebook,
  FaFileContract,
  FaPhone,
} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footermit">
        <div className="footer_image">
          <img src="..\src\assets\logo toky adriano.png" alt="im ff" />
        </div>
        <div className="ligne"></div>
        <div className="footer-links">
          <div className="footer_links1">
            <a
              href="https://github.com/adriano-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/adriano-randrianambinina-aa5285336/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              LinkedIn
            </a>
            {/* <a href="mailto:adriano.randrianambinina@example.com">
              <FaEnvelope
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              Contact
            </a> */}
          </div>
          <div className="ligne"></div>
          <div className="footer_links2">
            <p>
              <FaEnvelope
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              <span>tokyadriano45@gmail.com</span>
            </p>
            <p>
              <FaFacebook
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              <span>Adriano Randria</span>
            </p>
            <p>
              <FaPhone
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              <span>+261 38 92 616 34</span>
            </p>
          </div>
        </div>
      </div>

      <p className="footer-copy">
        © {year} Toky Adriano Randrianambinina — Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
