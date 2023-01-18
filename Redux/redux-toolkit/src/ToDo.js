import { useDispatch } from "react-redux";
import { remove } from "./store";
import { Link } from "react-router-dom";

function ToDo({ text, id }) {
  const dispatch = useDispatch(); //Redux store에서 dispatch 함수에 대한 참조를 반환
  const onClick = () => {
    dispatch(remove(id)); //dispatch함수를 통해 remove 액션 실행, 인자는(id) payload로 전달됨
  };

  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onClick}>delete</button>
    </li>
  );
}

export default ToDo;
