import Home from "./page/Home";
import About_me from "./page/About_me";
import Myproject from "./page/Myproject";
import Contact from "./page/Contact";
import './App.css';
import { motion, useScroll, useTransform } from "framer-motion"; // 애니메이션 및 스크롤 감지 기능 import
import { FaGithub } from "react-icons/fa"; // GitHub 아이콘 import
import { Link } from "react-scroll"; // 스크롤 이동을 위한 Link 컴포넌트 import
import { useEffect, useState } from "react"; // React 상태 및 효과 관리
import { Mail } from 'lucide-react'; // 아이콘 import 
import { useMediaQuery } from "react-responsive"; // 반응형 미디어쿼리 사용

const generateCircles = (count) => { // 랜덤한 원(circle) 요소를 생성하는 함수
  return Array.from({ length: count }, (_, index) => ({
    id: index, // 각 원의 고유 ID
    size: Math.random() * 100 + 50, // 원 크기 랜덤 설정
    top: Math.random() * 90 + "%", // 원의 위치 (위쪽)
    left: Math.random() * 90 + "%", // 원의 위치 (왼쪽)
    duration: Math.random() * 5 + 5, // 애니메이션 지속시간 랜덤 설정
    color: "rgba(230, 230, 230, 1)", // 기본 색상 설정
    xMovement: Math.random() * 200 - 100, // x축 이동 거리 설정
    yMovement: Math.random() * 200 - 100 // y축 이동 거리 설정
  }));
};

const getRandomPastelColor = () => { // 랜덤한 파스텔 색상을 생성하는 함수
  const r = Math.floor(Math.random() * 127 + 128); // 빨강 값 생성
  const g = Math.floor(Math.random() * 127 + 128); // 초록 값 생성
  const b = Math.floor(Math.random() * 127 + 128); // 파랑 값 생성
  return `rgb(${r}, ${g}, ${b})`; // RGB 문자열로 반환
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태
  const [circles, setCircles] = useState(generateCircles(10)); // 원(circle) 배열 상태
  const { scrollY } = useScroll(); // 현재 스크롤 위치 가져오기
  const xOffset = useTransform(scrollY, [0, 500], [0, -200]); // x축 이동 변환 설정
  const blurEffect = useTransform(scrollY, [0, 500], ["0px", "10px"]); // 블러 효과 변환 설정
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0]); // 투명도 변화 설정
  const isMobile = useMediaQuery({ maxWidth: 650 }); // 반응형 (모바일 체크)
  const sections = ["home", "about_me", "project", "contact"]; // 섹션 ID 목록
  const [activeSection, setActiveSection] = useState(""); // 현재 활성화된 섹션 상태

  const sendEmail = () => { // 이메일 보내기 함수
    window.location.href = "mailto:yy002756@naver.com"; // 이메일 클라이언트 열기
  };

  const gitDirect = () => { // GitHub 페이지 열기 함수
    window.open("https://github.com/noitca9704", "_blank"); // 새 탭에서 GitHub 열기
  };

  useEffect(() => { // 스크롤 감지를 이용한 현재 섹션 업데이트
    const observerOptions = {
      root: null, // 뷰포트를 기준으로 감지
      rootMargin: "0px", // 추가 여백 없음
      threshold: 0.3, // 섹션의 30% 이상 보일 때 감지
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // 현재 보이는 섹션 ID 설정
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
      observers.forEach((observer) => observer && observer.disconnect()); // 컴포넌트 언마운트 시 observer 제거
    };
  }, []);

  useEffect(() => { // 스크롤 이벤트를 감지하여 배경 스타일 변경
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // 스크롤 여부 확인
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // 이벤트 리스너 제거
    };
  }, []);

  useEffect(() => { // 주기적으로 원(circle) 색상 변경
    const interval = setInterval(() => {
      const randomId = Math.floor(Math.random() * circles.length); // 랜덤한 원 선택
      const pastelColor = getRandomPastelColor(); // 새로운 파스텔 색상 가져오기

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
      }, 1500); // 1.5초 후 색상 원래대로 변경
    }, 3000); // 3초마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [circles.length]);

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
      initial={{ height: "100vh", overflow: "hidden" }} // 웹 사이트 시작 애니메이션중 스크롤을 숨기기 위함
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
          width: "100%",
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
          style={{ fontFamily: "SUIT-Regular", fontSize: "clamp(1.25rem, 2vw ,2rem)" }}
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
          height: "100vh"
        }}
      >
        <motion.div
          style={{ x: xOffset, filter: blurEffect, opacity: fadeOut }}
        >
          <Home />
        </motion.div>
      </motion.div>
      <div id="home" style={{ height: "100vh" }}></div> {/* absolute로 띄워져있는 home 컴포넌트의 섹션을 감지하기 위해  */}
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
        <li onClick={sendEmail}>
          <Mail size={35} color="black" />
        </li>
        <li onClick={gitDirect}>
          <FaGithub size={35} color="black" />
        </li>
      </motion.ul>
    </motion.div>
  );
}

export default App;