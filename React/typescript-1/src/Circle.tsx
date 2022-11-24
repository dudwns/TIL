import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

//prop을 styled-component로 보내줌
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

//object의 shape을 설명해줌
interface CircleProps {
  bgColor: string;
  borderColor?: string; //?는 선택적이게 만들어줌
  text?: string;
}

/*default값을 이렇게도 줄 수 있음 */
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [counter, setCounter] = useState(0);
  //   default값을 파악하여 setCounter에 다른 타입의 값이 들어오면 에러를 표시
  setCounter(1);

  // number 또는 string 값을 가질 수 있다고 설정
  const [value, setValue] = useState<number | string>(0);
  setValue("hello");

  return (
    //borderColor가 없다면 default값을 bgColor값으로 대입
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
