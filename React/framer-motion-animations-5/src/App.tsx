import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  position: absolute;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
  entry: ({ back }: ICustomProps) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }), //object를 리턴하려면 () 필요
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: ({ back }: ICustomProps) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
  }),
};

interface ICustomProps {
  back: boolean;
}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  return (
    <Wrapper>
      <button onClick={prevPlease}>prev</button>
      <AnimatePresence custom={{ back }}>
        <Box
          custom={{ back }}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
    </Wrapper>
  );
}

export default App;
// AnimatePresence: 컴포넌트가 제거될 때 제거되는 컴포넌트에 애니메이션 효과를 줄 수 있다. 내부에는 조건문이 있어야 함
// exit는 컴포넌트가 사라질 때의 애니메이션
//key를 바꾸면 React.js는 component를 리랜더링 해줌
// custom: variants에 데이터를 보낼 수 있게 해주는 property, AnimatePresence에도 넣어야 함
// mode="wait": exit가 다 끝난 후 entry실행
