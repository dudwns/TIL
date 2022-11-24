import styled from "styled-components"; //styled-components import

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor}; //Theme 적용
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor}; //Theme 적용
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
