import { legacy_createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  //action creator (보통 reducer 위에 작성, object만 return 가능)
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  //action creator (보통 reducer 위에 작성, object만 return 가능)
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state]; //mutate state는 금지, 기존의 배열에서 추가하는 것이 아닌 새로운 배열을 리턴
    case DELETE_TODO:
      const cleaned = state.filter((todo) => todo.id !== action.id);
      return cleaned;

    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text)); //action으로 type과 text를 보냄
};

const dispatchDeleteToDo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteToDo(id)); //action으로 type과 id를 보냄
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);

/* mutate state를 금지하는 이유: React는 state가 변경되면 UI를 다시 렌더링한다.
새로운 state를 만드는 대신 기존의 state를 변형하면 JS가 객체가 바뀐지 알기 어렵다. */
