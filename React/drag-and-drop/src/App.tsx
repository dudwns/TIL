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

  //드래그가 끝났을 때 실행되는 함수
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return; //변경하지 않았다면 그냥 리턴
    //같은 보드로 드래그 했을 때
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; //변경 할 board의 state를 복사
        const taskObj = boardCopy[source.index]; //변경할 오브젝트를 받음 {id:.. text:..}
        boardCopy.splice(source.index, 1); //드래그 하고있는 item을 지움
        boardCopy.splice(destination?.index, 0, taskObj); //바꿀 자리에 item을 넣음
        return {
          ...allBoards, //나머지 board를 리턴
          [source.droppableId]: boardCopy, //변경 시도를 한 board를 boardCopy로 변경
        };
      });
    }
    //다른 보드로 드래그 했을 때
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; //움직임이 시작된 board
        const taskObj = sourceBoard[source.index]; //변경할 오브젝트를 받음 {id:.. text:..}
        const destinationBoard = [...allBoards[destination.droppableId]]; //도착지 board
        sourceBoard.splice(source.index, 1); //드래그를 시작한 보드에 있는 item을 지움
        destinationBoard.splice(destination?.index, 0, taskObj); //바꿀 보드의 자리에 item을 넣음
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

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
