import React, { useEffect, useState } from "react"; // React의 useEffect와 useState Hook을 가져옴
import AOS from "aos"; // AOS(Aniamte on Scroll) 라이브러리를 가져옴
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 슬라이드 컴포넌트를 가져옴
import { Pagination } from "swiper/modules"; // Swiper의 페이지네이션 모듈을 가져옴
import "aos/dist/aos.css"; // AOS 애니메이션 스타일 파일 가져옴
import "./Myproject.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 프로젝트 정보를 담은 배열
const projects = [
  {
    type: "풀 반응형",
    title: "그라펜 홈페이지 리디자인",
    period: "2024.12 ~ 2025.01",
    contribution: "100%",
    scope: "메인 페이지, BEST · PRODUCT · BRAND · 화장품 시리즈 서브페이지, 매치업 파운데이션 상품 상세 페이지",
    image: "project1.jpg",
    detailImage: "/project1_pull.jpg",
    devg: "HTML·CSS·JS의 기초를 다지기 위해 자주 사용하는 화장품 회사의 기존 분리형 웹페이지를 풀 반응형 웹으로 구축하고 리디자인",
    imp: "상품 Swiper를 사용자에게 넘기는 부분이라고 인식시키는 UI와 이미지의 로딩 속도 해결이 필요하고 Product의 상세 메뉴를 클릭하면 그 상품 리스트가 나오게끔 구현이 필요하며 회원정보, 검색, 장바구니 기능 및 커뮤니티 서브페이지 구현이 필요 (DB 학습 요구)",
    url1: "https://noitcaproject1.netlify.app",
    url2: "https://github.com/noitca9704/grafen_rd"
  },
  {
    type: "풀 반응형",
    title: "웹 포트폴리오 2025",
    period: "2025.01 ~",
    contribution: "100%",
    scope: "Home · About Me · Project · Contact 4개의 컴포넌트 형식, 프로젝트 · Github · Email(이메일 복사) 바로가기",
    image: "project2.JPG",
    detailImage: "/project2_pull.jpg",
    devg: "포트폴리오를 React의 다양한 컴포넌트와 클래스 사용 및 라이브러리나 Hook에 대한 이해를 위해 React기반으로 풀 반응형 웹 페이지 구축",
    imp: "웹이 반응했을때 글의 가독성을 높이고(Size Weight 조절 필요) 디자인적으로 심심한 부분에 대한 파훼가 필요",
    url1: "https://noitca.netlify.app",
    url2: "https://github.com/noitca9704/portfolio_noitca"
  }
];

const Myproject = () => {
  const [openModals, setOpenModals] = useState(projects.map(() => false)); // 모달 상태를 관리하는 배열 state
  const [fadeStatus, setFadeStatus] = useState(projects.map(() => false)); // 페이드 애니메이션 상태를 관리하는 배열 state

  useEffect(() => {
    AOS.init({ // AOS 라이브러리를 초기화
      duration: 1000, // 애니메이션 지속 시간 (1초)
      easing: "ease-in-out", // 애니메이션 속도 조정
      once: false, // 애니메이션을 한 번만 실행하지 않음
      mirror: true, // 스크롤을 반대로 했을 때도 애니메이션 실행
    });
  }, []);

  // 모달 열기 함수
  const openModal = (index) => {
    const updatedModals = [...openModals]; // 현재 모달 상태 복사
    updatedModals[index] = true; // 해당 인덱스의 모달을 열도록 변경
    setOpenModals(updatedModals); // 상태 업데이트
    document.body.style.overflow = "hidden"; // 모달이 열리면 페이지 스크롤 방지

    setTimeout(() => {
      const updatedFadeStatus = [...fadeStatus]; // 현재 페이드 상태 복사
      updatedFadeStatus[index] = true; // 해당 인덱스의 페이드 애니메이션 활성화
      setFadeStatus(updatedFadeStatus); // 상태 업데이트
    }, 50);
  };

  // 모달 닫기 함수
  const closeModal = (index) => {
    const updatedFadeStatus = [...fadeStatus]; // 현재 페이드 상태 복사
    updatedFadeStatus[index] = false; // 해당 인덱스의 페이드 애니메이션 비활성화
    setFadeStatus(updatedFadeStatus); // 상태 업데이트

    setTimeout(() => {
      const updatedModals = [...openModals]; // 현재 모달 상태 복사
      updatedModals[index] = false; // 해당 인덱스의 모달을 닫도록 변경
      setOpenModals(updatedModals); // 상태 업데이트
      document.body.style.overflow = "auto"; // 모달이 닫히면 페이지 스크롤 가능하도록 변경
    }, 300);
  };

  // 새 창에서 링크 열기 함수
  const handleClick1 = (url) => {
    window.open(url, "_blank"); // 매개변수로 받은 URL을 새 탭에서 열기
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
                <p className="m-description"><strong>타입 :</strong> {project.type}</p>
                <p className="m-description"><strong>작업기간 :</strong> {project.period} <strong>기여도 :</strong> {project.contribution}</p>
                <p className="m-description"><strong>구현범위 :</strong> {project.scope}</p>
                <p className="m-description"><strong>개발목표 :</strong> {project.devg}</p>
                <p className="m-description"><strong>개선사항 :</strong> {project.imp}</p>
                <div className="button-section">
                  <button className="detail-button" onClick={() => openModal(index)}>자세히 보기</button>
                  <button className="detail-button" onClick={() => handleClick1(project.url1)}>홈페이지로 이동</button>
                  <button className="detail-button" onClick={() => handleClick1(project.url2)}>Github로 이동</button>
                </div>
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
          >
            <img
              className="modal-image"
              src={project.detailImage}
              alt="project.detailImage"
            />
          </div>
        )
      ))}
    </div>
  );
};

export default Myproject;
