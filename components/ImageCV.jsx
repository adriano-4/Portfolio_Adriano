// function ImageCV() {
//   return (
//     <section id="cvimage" className="cvimage">
//       <img
//         src="/src/assets/cvAdrianoAvril2026.png"
//         alt="CV Toky Adriano"
//         className="cv-image"
//       />
//     </section>
//   );
// }

// export default ImageCV;
// components/ImageCV.jsx
import { useState, useRef, useEffect } from "react";
import {
  FaTimes,
  FaDownload,
  FaSearchPlus,
  FaSearchMinus,
  FaUndo,
} from "react-icons/fa";

function ImageCV({ onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fermer avec la touche Échap
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Zoom avec la molette
  function handleWheel(e) {
    e.preventDefault();
    setScale((prev) => {
      const next = prev - e.deltaY * 0.001;
      return Math.min(Math.max(next, 0.5), 4);
    });
  }

  // Début du drag
  function handleMouseDown(e) {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...pos };
  }

  // Pendant le drag
  function handleMouseMove(e) {
    if (!dragging) return;
    setPos({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    });
  }

  function handleMouseUp() {
    setDragging(false);
  }

  // Touch support (mobile)
  function handleTouchStart(e) {
    const touch = e.touches[0];
    setDragging(true);
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    posStart.current = { ...pos };
  }

  function handleTouchMove(e) {
    if (!dragging) return;
    const touch = e.touches[0];
    setPos({
      x: posStart.current.x + (touch.clientX - dragStart.current.x),
      y: posStart.current.y + (touch.clientY - dragStart.current.y),
    });
  }

  function handleTouchEnd() {
    setDragging(false);
  }

  function zoomIn() {
    setScale((prev) => Math.min(prev + 0.25, 4));
  }

  function zoomOut() {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }

  function reset() {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }

  // Clic sur le fond (overlay) = fermer
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="cvimage"
      onClick={handleOverlayClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Barre d'outils */}
      <div className="cv-toolbar">
        <button onClick={zoomOut} title="Zoom arrière" className="cv-tool-btn">
          <FaSearchMinus />
        </button>

        <span className="cv-zoom-label">{Math.round(scale * 100)}%</span>

        <button onClick={zoomIn} title="Zoom avant" className="cv-tool-btn">
          <FaSearchPlus />
        </button>

        <button onClick={reset} title="Réinitialiser" className="cv-tool-btn">
          <FaUndo />
        </button>

        <a
          href="/src/assets/cvAdrianoAvril2026.png"
          download="CV_Toky_Adriano.png"
          className="cv-tool-btn cv-download-btn"
          title="Télécharger le CV"
          onClick={(e) => e.stopPropagation()}
        >
          <FaDownload />
          <span>Télécharger</span>
        </a>

        <button
          onClick={onClose}
          title="Fermer"
          className="cv-tool-btn cv-close-btn"
        >
          <FaTimes />
        </button>
      </div>

      {/* Image zoomable et déplaçable */}
      <div
        className="cv-image-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <img
          src="/src/assets/cvAdrianoAvril2026.png"
          alt="CV Toky Adriano"
          className="cv-image"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: dragging ? "none" : "transform 0.15s ease",
          }}
          draggable={false}
        />
      </div>

      {/* Hint mobile */}
      <p className="cv-hint">
        Pincez pour zoomer · Glissez pour déplacer · Cliquez en dehors pour
        fermer
      </p>
    </div>
  );
}

export default ImageCV;
