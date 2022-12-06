import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return; //destination이 없으면(바꾸지 않을 때는) 그냥 리턴
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos]; //state를 복사
      toDosCopy.splice(source.index, 1); //드래그 하고있는 item을 지움
      toDosCopy.splice(destination?.index, 0, draggableId); //바꿀 자리에 item을 넣음
      return [];
    });
  }; //드래그가 끝났을 때 실행되는 함수
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    //key랑 draggableId는 같아야 함
                    <Draggable key={toDo} draggableId={toDo} index={index}>
                      {(magic) => (
                        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder} {/*리스트를 빼도 크기가 줄지 않음 */}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
