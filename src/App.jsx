import Home from "./page/Home";
import About_me from "./page/About_me";
import Myproject from "./page/Myproject";
import Contact from "./page/Contact";
import './App.css';
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { Smartphone, Mail } from 'lucide-react';
import { useMediaQuery } from "react-responsive";

const generateCircles = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    size: Math.random() * 100 + 50,
    top: Math.random() * 90 + "%",
    left: Math.random() * 90 + "%",
    duration: Math.random() * 5 + 5,
    color: "rgba(230, 230, 230, 1)",
    xMovement: Math.random() * 200 - 100,
    yMovement: Math.random() * 200 - 100
  }));
};

const getRandomPastelColor = () => {
  const r = Math.floor(Math.random() * 127 + 128);
  const g = Math.floor(Math.random() * 127 + 128);
  const b = Math.floor(Math.random() * 127 + 128);
  return `rgb(${r}, ${g}, ${b})`;
};


function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [circles, setCircles] = useState(generateCircles(10));

  const { scrollY } = useScroll();
  const xOffset = useTransform(scrollY, [0, 500], [0, -200]);
  const blurEffect = useTransform(scrollY, [0, 500], ["0px", "10px"]);
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0]);
  const isMobile = useMediaQuery({ maxWidth: 650 });
  const sections = ["home", "about_me", "project", "contact"];

  const [activeSection, setActiveSection] = useState(""); // 현재 활성화된 섹션 저장

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // 50% 이상 보일 때 감지
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // 현재 보이는 섹션의 ID 저장
        }
      });
    };

    const observers = sections.map((section) => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        return observer;
      }
      return null;
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomId = Math.floor(Math.random() * circles.length);
      const pastelColor = getRandomPastelColor();

      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle.id === randomId ? { ...circle, color: pastelColor } : circle
        )
      );

      setTimeout(() => {
        setCircles((prevCircles) =>
          prevCircles.map((circle) =>
            circle.id === randomId
              ? { ...circle, color: "rgba(230, 230, 230, 1)" }
              : circle
          )
        );
      }, 1500);
    }, 3000);

    return () => clearInterval(interval);
  }, [circles.length]);

  return (
    <motion.div
      initial={{ height: "100vh", overflow: "hidden" }}
      animate={{ height: "none", overflow: "visible" }}
      transition={{ delay: 4 }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: "0",
          pointerEvents: "auto",
          backgroundAttachment: "fixed",
          backgroundImage: "url('/paint.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {circles.map((circle) => (
          <motion.div
            key={circle.id}
            style={{
              position: "absolute",
              width: circle.size,
              height: circle.size,
              borderRadius: "50%",
              background: circle.color,
              top: circle.top,
              left: circle.left,
              filter: "blur(6px)",
              transition: "background 0.5s ease",
            }}
            animate={{
              y: [0, circle.yMovement, 0],
              x: [0, circle.xMovement, 0]
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <header
        style={{
          position: "fixed",
          width:"100%",
          padding: "0 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          top: "0",
          height: "10vh",
          zIndex: "10",
          backgroundColor: isMobile ? "none" : isScrolled ? "rgba(255, 255, 255, 0.1)" : "transparent",
          boxShadow: isMobile ? "none" : isScrolled ? "0px 5px 8px rgba(0, 0, 0, 0.15)" : "none",
          transition: "background-color 0.3s ease",
          color: "#353535",
          backdropFilter: isMobile ? "none" : isScrolled ? "blur(5px)" : "none",
          WebkitBackdropFilter: isMobile ? "none" : isScrolled ? "blur(5px)" : "none"
        }}
      >
        <motion.h1
          className="h_logo"
          style={{ fontFamily: "SUIT-Regular", fontSize: "clamp(1.25rem, 2vw ,2rem)"}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          S.G.K's Portfolio
        </motion.h1>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          style={{
            display: "flex",
            gap: "clamp(20px, 3vw ,50px)",
            fontWeight: "normal"
          }}
        >
          {sections.map((item, index) => (
            <li
            key={index}
            className={`h_list ${activeSection === item ? "active" : ""}`} // 현재 활성화된 섹션이면 클래스 추가
          >
            <Link to={item} smooth={true} duration={500}>
              {item.charAt(0).toUpperCase() + item.slice(1).replace("_", " ")}
            </Link>
          </li>
          ))}
        </motion.ul>
      </header>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <motion.div
          style={{ x: xOffset, filter: blurEffect, opacity: fadeOut }}
        >
          <Home />
        </motion.div>
      </motion.div>
      <div id="home" style={{ height:"100vh" }}></div>
      <motion.div id="about_me">
        <About_me />
      </motion.div>

      <Myproject />
      <Contact />
      <motion.ul
        className="side-menu"
        initial={{ opacity: "0" }}
        animate={{ opacity: "1" }}
        transition={{ delay: 4 }}
        >
        <li
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "36px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Smartphone size={25} color="black" />
        </li>
        <li
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "36px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Mail size={25} color="black" />
        </li>
        <li
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "36px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <FaGithub size={25} color="black" />
        </li>
      </motion.ul>
    </motion.div>
  );
}

export default App;