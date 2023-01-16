import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Detail({ toDos }) {
  const currentId = useParams().id;
  const toDo = toDos.find((toDo) => toDo.id === parseInt(currentId));

  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Create at:{toDo?.id}</h5>
    </>
  );
}

function mapStateToProps(state) {
  console.log(state);
  return { toDos: state };
}

export default connect(mapStateToProps)(Detail);
