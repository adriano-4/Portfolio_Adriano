import { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

function Contact() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur inconnue");

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Échec de l'envoi. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastScrollY = window.scrollY;
    let scrollDirection = "down";

    const onScroll = () => {
      scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const elements = section.querySelectorAll(
      ".section-title, .section-subtitle, .contact-form, .contact-success",
    );
    elements.forEach((el, i) => {
      el.classList.add("scroll-animate");
      el.style.transitionDelay = `${i * 100}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("exit-up", "exit-down");
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
            if (scrollDirection === "down") {
              entry.target.classList.remove("exit-down");
              entry.target.classList.add("exit-up");
            } else {
              entry.target.classList.remove("exit-up");
              entry.target.classList.add("exit-down");
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const allAnimated = section.querySelectorAll(".scroll-animate");
    allAnimated.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [submitted]);
  return (
    <>
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-animate.exit-up {
          opacity: 0;
          transform: translateY(-40px);
        }
        .scroll-animate.exit-down {
          opacity: 0;
          transform: translateY(40px);
        }
      `}</style>

      <section id="contact" className="contact" ref={sectionRef}>
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">
          Une question ou un projet ? Écrivez-moi !
        </p>

        {submitted ? (
          <div className="contact-success">
            <FaCheckCircle
              style={{
                marginRight: "10px",
                verticalAlign: "middle",
                color: "rgb(0, 211, 0)",
              }}
            />
            <span
              style={{
                color: "rgb(0, 144, 0)",
                fontSize: "15px",
              }}
            >
              Message envoyé ! Je vous répondrai bientôt.
            </span>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser
                      style={{ marginRight: "6px", verticalAlign: "middle" }}
                    />
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope
                      style={{ marginRight: "6px", verticalAlign: "middle" }}
                    />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <FaCommentDots
                    style={{ marginRight: "6px", verticalAlign: "middle" }}
                  />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows="5"
                  required
                />
              </div>
            </div>
            {error && (
              <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>
            )}

            <button
              type="submit"
              className={`btn envoyermess${!isFormValid || loading ? " disabled" : ""}`}
              disabled={!isFormValid || loading}
            >
              {loading ? "Envoi..." : "Envoyer le message"}
              <FaPaperPlane
                style={{ marginLeft: "8px", verticalAlign: "middle" }}
              />
            </button>
          </form>
        )}
      </section>
    </>
  );
}

export default Contact;
