import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { add } from "../store";
import ToDo from "../ToDo";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  // const toDos = useSelector((state) => state); // 더 좋은 방법(store의 state를 바로 가져옴)
  // const dispatch = useDispatch(); // 더 좋은 방법(Redux store에서 dispatch 함수에 대한 참조를 반환)
  function onChange(event) {
    setText(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();

    addToDo(text);
    // dispatch(actionCreators.addToDo(text)); useDispatch()로 인해 dispatch 사용 가능
    setText("");
  }
  return (
    <>
      <h1>Home</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}></input>
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </> //컴포넌트에 렌더링
  );
}

//mapStateToProps: state를 prop에게 전달, 함수명 권장, object 리턴해야 함
function mapStateToProps(state) {
  return { toDos: state }; //return하면 component의 prop으로 들어감 (지금은 Home 컴포넌트)
}

function mapDispatchToProps(dispatch) {
  return { addToDo: (text) => dispatch(add(text)) }; //dispatch 하는 새로운 함수를 만들어 component의 prop으로 전달
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//conect: component와 stroe를 연결
// 첫 번째 인자는 mapStateToProps(값을 가져올 때 사용), 두 번째 인자는 mapDispatchToProps(dispatch 할 때 사용)
