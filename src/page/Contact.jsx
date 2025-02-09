import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Contact.css";

const Contact = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div data-aos="fade-right" id="contact" className="c-container">
      <div className="interview">
        <div className="text-section">
          <span className="text"><strong>누구에게나 편하고 보기좋은 웹 사이트</strong>를 만드는 그날까지<br />끝없이 배우고 소통하며 성장해나가겠습니다.</span>
          <span className="text"><strong>흰색 물감</strong>같은 웹 퍼블리셔 <strong>김성규</strong>였습니다.</span>
          <span className="text">제 포트폴리오를 끝까지 봐주셔서 감사드립니다.</span>
        </div>
        <div className="info-section">
          <span><strong className="info-title">Phone</strong>010 - 7788 - 9704</span>
          <span><strong className="info-title">E-Mail</strong>yy002756@naver.com</span>
          <span><strong className="info-title">Github</strong>github.com/noitca9704</span>
        </div>
      </div>
      <p className="copyright">ⓒ 2025 S.G.K all rights reserved.</p>
    </div>
  );
};
export default Contact;