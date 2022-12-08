import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";

import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    //같은 보드 내에서 움직였다면
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; //변경 할 board의 state를 복사
        boardCopy.splice(source.index, 1); //드래그 하고있는 item을 지움
        boardCopy.splice(destination?.index, 0, draggableId); //바꿀 자리에 item을 넣음
        return {
          ...allBoards, //나머지 board를 리턴
          [source.droppableId]: boardCopy, //변경 시도를 한 board를 boardCopy로 변경
        };
      });
    }
  }; //드래그가 끝났을 때 실행되는 함수

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
