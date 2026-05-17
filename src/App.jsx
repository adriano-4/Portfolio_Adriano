import "./App.css";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Loader from "./components/Chargement";
import Scroll from "./components/Scroll";
import Cursor from "./components/Cursor";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Cursor />
      <Scroll />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
