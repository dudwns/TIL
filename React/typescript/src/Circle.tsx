import styled from "styled-components"

interface ContainerProps{ 
    bgColor: string;
}

const Container = styled.div<ContainerProps>` //prop을 styled-component로 보내줌
    width:200px;
    height:200px;
    background-color:${(props) => props.bgColor};
    border-radius:100px;
`;

interface CircleProps{      //object의 shape을 설명해줌
    bgColor: string;
}

function Circle({bgColor}: CircleProps) {
    return <Container bgColor={bgColor}/>;
}

export default Circle;