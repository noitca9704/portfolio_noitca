import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub } from "react-icons/fa";
import { SiFigma, SiJquery, SiAdobephotoshop, SiAdobeillustrator } from "react-icons/si";
import "./About_me.css"

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const handleMoreClick = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsVisible(!isVisible);
      setIsFlipping(false);
    }, 1000);
  };

  const licenseInfo = [
    "- 웹 디자인 기능사",
    "- 컴퓨터 그래픽스 운용 기능사",
    "- GTQ · GTQi · GTQid 1급"
  ];

  const educationInfo = [
    "- 경남대학교 컴퓨터공학부 졸업 ( 2024.02 )",
    "- 모빌리티 인포테이먼트 컨텐츠 개발 및 구성 디자인 실무자 양성과정(UI/UX) 수료 ( 2025.01 )"
  ];

  return (
    <div className="a-container">

      <h1 data-aos="fade-in" className="a-title">
        About Me
      </h1>
      <div data-aos="fade-right" className="a-profile-section">
        <button className="a_button" onClick={handleMoreClick}>MORE →</button>
        <img
          src="me.jpg"
          alt="Profile"
          className="a-profile-image"
        />

        <div
          className={`profile-content ${isFlipping ? "flip-out" : "flip-in"}`}
        >
          {isVisible ? (
            <>
              <h2 className="a-name">김성규 / 1997.04.24 </h2>
              <p className="a-description">
                안녕하세요. 저는 직관적으로 보이는 프론트 엔드에 매력을 느끼고 이 분야의 학습을 이어가고 있는 김성규입니다.
                HTML, CSS, JS, Jquery, React와 같은 여러가지 언어와 라이브러리를 사용하여 다양한 레이아웃을 설계하고 Figma 툴로 디자인을 구성해보는 등
                다양한 학습을 이어가고 있으며 웹 표준 및 웹 접근성을 준수하는 개발을 위해 완성 자체에 안주하지 않으려 노력하고 있습니다. 언제나 소통하고 배우려는 자세로 주어진 일에 책임감을 가지고 제 역량을 충분히 발휘하고 싶습니다.
              </p>
            </>
          ) : (
            <>
              <p className="a-description">
                <h3 className="d-title">LICENSE</h3>
                <ul>
                  {licenseInfo.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h3 className="d-title">EDUCATION</h3>
                <ul>
                  {educationInfo.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="card-section">
        <div className="card" data-aos="fade-up">
          <h3 className="card-title">SKILLS</h3>
          <ul className="skills-list">
            <li className="li-center"><FaHtml5 className="icon" /> <p className="icontext">HTML</p></li>
            <li className="li-center"><FaCss3Alt className="icon" /> <p className="icontext">CSS</p></li>
            <li className="li-center"><FaJs className="icon" /> <p className="icontext">JavaScript</p></li>
            <li className="li-center"><SiJquery className="icon" /> <p className="icontext">jQuery</p></li>
            <li className="li-center"><SiAdobephotoshop className="icon" /> <p className="icontext">Photoshop</p></li>
            <li className="li-center"><SiAdobeillustrator className="icon" /> <p className="icontext">Illustrator</p></li>
          </ul>
        </div>
        <div className="card" data-aos="fade-up">
          <h3 className="card-title">STUDYING</h3>
          <ul className="studying-list">
            <li className="li-center"><FaReact className="icon" /> <p className="icontext">React</p></li>
            <li className="li-center"><SiFigma className="icon" /> <p className="icontext">Figma</p></li>
            <li className="li-center"><FaGithub className="icon" /> <p className="icontext">Github</p></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
