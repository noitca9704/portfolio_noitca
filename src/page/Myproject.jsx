import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "aos/dist/aos.css";
import "./Myproject.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    title: "그라펜 홈페이지 리디자인",
    period: "2024.12 ~ 2025.01",
    contribution: "100%",
    scope: "메인 페이지, BEST · PRODUCT · BRAND · 화장품 시리즈 서브페이지, 매치업 파운데이션 상품 상세 페이지",
    image: "project1.jpg",
    detailImage: "/project1_pull.jpg"
  },
  {
    title: "웹 포트폴리오 2025",
    period: "2025.01 ~",
    contribution: "100%",
    scope: "Home · About Me · Project · Contact 4개의 컴포넌트 형식, 프로젝트 · Github · Email(이메일 복사) 바로가기",
    image: "project2.JPG",
    detailImage: "/project2_pull.jpg"
  }
];

const Myproject = () => {
  const [openModals, setOpenModals] = useState(projects.map(() => false));
  const [positions, setPositions] = useState(projects.map(() => 150));
  const [fadeStatus, setFadeStatus] = useState(projects.map(() => false));

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const openModal = (index) => {
    const updatedModals = [...openModals];
    updatedModals[index] = true;
    setOpenModals(updatedModals);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      const updatedFadeStatus = [...fadeStatus];
      updatedFadeStatus[index] = true;
      setFadeStatus(updatedFadeStatus);
    }, 50);
  };

  const closeModal = (index) => {
    const updatedFadeStatus = [...fadeStatus];
    updatedFadeStatus[index] = false;
    setFadeStatus(updatedFadeStatus);

    setTimeout(() => {
      const updatedModals = [...openModals];
      updatedModals[index] = false;
      setOpenModals(updatedModals);
      document.body.style.overflow = "auto";
      const updatedPositions = [...positions];
      updatedPositions[index] = 150;
      setPositions(updatedPositions);
    }, 300);
  };

  const handleWheel = (index, e) => {
    const updatedPositions = [...positions];
    if (e.deltaY > 0) {
      updatedPositions[index] = Math.max(updatedPositions[index] - 150, -300);
    } else {
      updatedPositions[index] = Math.min(updatedPositions[index] + 150, 150);
    }
    setPositions(updatedPositions);
  };

  const handleClick = () => {
    window.open('www.noitca.co.kr', '_blank');
  };

  return (
    <div id="project" className="m-container">
      <h1 data-aos="fade-in" className="m-title">Project</h1>

      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          939: { slidesPerView: 2 }
        }}
        className="projects-wrapper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="project-slide">
            <div data-aos="fade-right" className="project-section">

              <img src={project.image} alt="Project" className="project-image" />
              <div data-aos="fade-up" className="project-content">
              <h2 className="m-name">{project.title}</h2>
                <p className="m-description"><strong>타입 :</strong> 반응형 Web</p>
                <p className="m-description"><strong>작업기간 :</strong> {project.period} <strong>기여도 :</strong> {project.contribution}</p>
                <p className="m-description"><strong>구현범위 :</strong> {project.scope}</p>
                <button className="detail-button" onClick={() => openModal(index)}>자세히 보기</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {projects.map((project, index) => (
        openModals[index] && (
          <div
            key={index}
            className={`modal-overlay ${fadeStatus[index] ? "show" : ""}`}
            onClick={() => closeModal(index)}
            onWheel={(e) => handleWheel(index, e)}
          >
            <img
              style={{
                width: "700px",
                position: "absolute",
                left: "15%",
                top: `${positions[index]}px`,
                transition: "top 0.3s ease-in-out",
              }}
              src={project.detailImage}
              alt=""
            />
            <div className="modal-text">
              <h2>{project.title}</h2>
              <p><strong>타입 :</strong> 반응형 Web</p>
              <p><strong>작업기간 :</strong> {project.period} <strong>기여도 :</strong> {project.contribution}</p>
              <p><strong>구현범위 :</strong> {project.scope}</p>
            </div>
            <button onClick={handleClick}>페이지 바로가기</button>
          </div>
        )
      ))}
    </div>
  );
};

export default Myproject;
