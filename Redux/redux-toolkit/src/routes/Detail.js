import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Detail() {
  const toDos = useSelector((state) => state);
  const currentId = useParams().id;
  const toDo = toDos.find((toDo) => toDo.id === parseInt(currentId));

  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Create at:{toDo?.id}</h5>
    </>
  );
}

export default Detail;
