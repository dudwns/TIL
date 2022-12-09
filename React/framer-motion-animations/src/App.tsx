import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
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
  return (
    <Wrapper>
      <Box
        transition={{ type: "spring", delay: 0.5 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
    </Wrapper>
  );
}

export default App;

//Transition: 값이 한 상태에서 다른 상태로 움직이는 방식을 정의,
// - type 속성의 기본은 spring, 안 튕기게 하려면 tween으로 변경,
// - damping은 저항력, stiffness는 경직도,
// - mass는 무게, bounce는 튕김도(0~1사이로 지정)
//initial: animation의 초기 스타일 지정
//animate: animation의 최종 스타일 지정
//<Box transition={{ delay: 3, duration: 3 }} animate={{ borderRadius: "100px" }} />
