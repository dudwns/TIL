import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box1 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box2 = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } },
};

const boxVariants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 3,
      bounce: 0.5,
      delayChildren: 0.5, //자식의 딜레이
      staggerChildren: 0.2, //자식마다 딜레이를 증가하면서 할당
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10, //motion에서만 가능 (y축을 10만큼 이동)
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const boxVariants2 = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 10 } },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null); // BiggerBox 객체를 가져옴
  return (
    <Wrapper>
      <Box variants={myVars} initial="start" animate="end" />
      <Box1 variants={boxVariants} initial="start" animate="end">
        {/* 기본적으로 자식한테 initial과 animate를 붙여 넣어줌 */}
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box1>
      <BiggerBox ref={biggerBoxRef}>
        <Box2
          drag //드래그 활성화, drag="x" 는 x축으로만 드래그 가능, y도 같음
          dragConstraints={biggerBoxRef} // 드래깅이 허용될 수 있는 영역 , 레퍼런스 참조값을 연결
          dragSnapToOrigin // 드래그한 후 원래 자리로 돌아옴
          dragElastic={0.5} //끌어당기는 힘(탄성), 0~1 사이의 값, default는 0.5
          variants={boxVariants2}
          whileHover="hover" //마우스를 올렸을 때 발생하는 이벤트
          whileTap="click" //클릭했을 때 발생하는 이벤트
          whileDrag="drag" //드래그할 때 발생하는 이벤트, 색은 rgb값이어야 애니메이션이 작동
        />
      </BiggerBox>
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
//Variants: 컴포넌트가 가질 수 있는 미리 정의된 시각적 state
