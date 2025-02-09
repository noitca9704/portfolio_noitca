import React from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
const Home = () => {
  const isMobile1 = useMediaQuery({ maxWidth: 450 });
  const isMobile2 = useMediaQuery({ maxWidth: 725});
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100vh",
        fontFamily: "SUIT-Regular",
        overflow: "hidden",
        color: "#353535"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Pretendard-Regular",
          zIndex: "12",
          padding: "0 10%",
          pointerEvents: "none"
        }}
      >
        <motion.h1
          style={{
            fontSize: "clamp(1rem, 4.8vw, 4rem)"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          흰색 물감같은 웹 퍼블리셔 김성규입니다.
        </motion.h1>
        <motion.h2
          style={{
            marginTop: "clamp(1rem, 1.5vw, 2rem)",
            fontSize: "clamp(0.8rem, 1.5vw, 1.25rem)",
            lineHeight: "clamp(1.6rem, 4.5vw, 3rem)",
            fontWeight: "normal"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <span style={{
            display: isMobile1 ? "inline" : "block"
          }}>어떤 색을 받아들이건 자연스럽고 조화로운 색을 보여주는 흰색 물감처럼 </span>
          끊임없이 배우려는 자세와 소통하는 자세로 더욱 많은 사용자에게
          보기 좋고 이용하기 좋은 웹 페이지를 만들겠습니다.
        </motion.h2>
      </div>

      <motion.h3
        className="h_logo"
        style={{
          width: "100%",
          position: "absolute",
          zIndex: "12",
          textAlign: "center",
          pointerEvents: "none"
        }}
        initial={{ fontSize: "clamp(0.8rem, 4vw, 4.8rem)", left: "50%", top: "50%", x: "-50%", y: "-50%" }}
        animate={{ fontSize: "clamp(0.7rem, 2vw, 2.4rem)", left: "50%", top: "90%", x: "-50%", y: "0%" }}
        transition={{ duration: 1, delay: 2 }}
      >
        Web Portfolio by S.G.K
      </motion.h3>
    </div>
  );
};

export default Home;
