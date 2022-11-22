import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
`;

const rotationAnimation = keyframes`
  /* from{
    color:tomato;
  }
  to{
    color:blue;
  } */
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    transform:rotate(360deg);
    border-radius:100px;
  }
  100%{
    transform:rotate(0deg);
    border-radius:0px;
  }
`;

const Emoji = styled.span`
  font-size:36px;
`;

const Box = styled.div`
  width:200px;
  height:200px;
  background-color:tomato;  
  display:flex;
  justify-content:center;
  align-items:center; 
  animation:${rotationAnimation} 1s linear infinite; //animation 작성
  /* span {                    //이렇게 자식을 select 할 수 있음
    font-size:36px;
    &:hover{            //pseudo selector
      font-size:48px;
    }
    &:active {     
      opacity: 0;;
    }
  } */
  ${Emoji}:hover{            //다른 styled component를 select 할 때
    font-size:98px;
  }
`;


function App() {
  return (
   <Wrapper>
    <Box>
    <Emoji>😄</Emoji>
    </Box>
   </Wrapper>
  );
}

export default App;
