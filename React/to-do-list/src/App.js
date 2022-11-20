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

//map(): 배열을 가지고 있을 때 각각의 element들을 바꿀 수 있게 해줌, ()에는 함수를 넣을 수 있는데 배열의 모든 item에 대해 실행됨
//리액트는 기본적으로 list에 있는 모든 item을 인식하기 때문에 key를 넣어 고유하게 만들어줘야 함