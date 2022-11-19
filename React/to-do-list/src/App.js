import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) =>{
    setToDo(event.target.value);
  }
  const onSubmit = (event) => {
    event.preventDefault(); //기본 이벤트 발생을 없앰
    if (toDo === "") { //비어있으면 함수가 실행되지 않게 그냥 리턴
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);        // toDo는 입력한 값, ...currentArray는 기존의 배열 (입력한 값이 기존 배열에 들어감)
    setToDo(""); //input을 비워줌
  };

  console.log(toDos);

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={toDo} placeholder="Write your to do..." />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;

//map은 item들을 순환하면서 값을 리턴해주는 함수
//같은 li를 렌더링 할 때에는 key값이 필요