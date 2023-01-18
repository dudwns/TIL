import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store";
import ToDo from "../ToDo";

function Home() {
  const [text, setText] = useState("");
  const toDos = useSelector((state) => state); //store의 state를 바로 가져옴
  const dispatch = useDispatch(); //Redux store에서 dispatch 함수에 대한 참조를 반환
  function onChange(event) {
    setText(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(add(text)); //useDispatch()로 인해 dispatch 사용 가능
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
    </>
  );
}

export default Home;
