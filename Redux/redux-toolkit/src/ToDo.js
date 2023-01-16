import { connect, useDispatch } from "react-redux";
import { actionCreators } from "./store";
import { Link } from "react-router-dom";

function ToDo({ text, onBtnClick, id }) {
  //   const dispatch = useDispatch();
  //   const onClick = () => {
  //     dispatch(actionCreators.deleteToDo(id));
  //   };

  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>delete</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
