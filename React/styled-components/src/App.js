import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

//props를 통해 컴포넌트 설정
const Box = styled.div`
  background-color: ${(props) => props.bgColor}; 
  width: 100px;
  height: 100px;
`;

//Box의 모든 속성들을 들고 온 다음 새로운 속성을 더해줌 (컴포넌트 확장)
const Circle = styled(Box)` 
  border-radius:50px;
`;

const Btn = styled.button`
  color:white;
  background-color:tomato;
  border:0;
  border-radius:15px;
`;

//모든 Input에 required 속성 부여
const Input = styled.input.attrs({ required: true })`
  background-color:tomato;
`;



function App() {
  return (
    <Father as="header">
      {/*<Box bgColor="teal"/>
      <Circle bgColor="tomato"/>*/}
      <Btn>style</Btn>
      <Btn as="a" href="#">style</Btn> {/*as:컴포넌트를 확장하지만(Btn 컴포넌트의 모든 속성을 들고오지만) 다른 태그를 쓰고 싶을때*/}
      <Input/>
      <Input/>
      <Input/>
      <Input/>
    </Father>
      
  );
}

export default App;
