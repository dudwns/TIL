import styled from "styled-components";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0); //MotionValue는 특정한 값을 추적할 수 있도록 함, 바뀌어도 리랜더링 되지 않음
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]); //한 값 범위에서 다른 값 범위로 매핑하여 변환하는 MotionValue를 만듦, 인자는 값 입력값, 출력값
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 143, 238), rgb(0, 16, 238))",
      "linear-gradient(135deg, rgb(0, 238, 147), rgb(194, 238, 0))",
    ]
  );
  const { scrollYProgress } = useScroll(); //스크롤 motion value를 받음, scroll은 픽셀 단위, scrollProgress는 0~1까지의 단위
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <Wrapper style={{ background: gradient }}>
      {/* <button onClick={() => x.set(200)}>click me</button> */}
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
