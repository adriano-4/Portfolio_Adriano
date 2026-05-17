// components/Scroll.jsx
import { FaArrowAltCircleUp, FaArrowUp } from "react-icons/fa";

function Scroll() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        #scrollup {
          position: fixed;
          bottom: 30px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: var(--color-accent);
          background-color: white;
          border: 1px solid #0d0c3a51;
          cursor: pointer;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        #scrollup:hover {
          background-color: var(--color-accent);
          color: white;
          transition: 0.3s;
        }
      `}</style>
      <button id="scrollup" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </>
  );
}

export default Scroll;
