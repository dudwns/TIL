const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDoS() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //string으로 변환
}

function deleteToDo(event) {
  const li = event.target.parentElement; //이벤트 타겟의 부모 element
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //toDo.id는 number, li.id는 string
  li.remove();
  saveToDoS();
}

function paintToDo(newToDo) {
  const li = document.createElement("li"); //li element 생성
  li.id = newToDo.id;
  const span = document.createElement("span"); //span element 생성
  span.innerText = newToDo.text; // span의 text를 newToDo.text로 변경
  const button = document.createElement("button"); // button element 생성
  button.id = "deleteBtn";
  button.innerText = "🗑️"; // button의 text를 변경
  button.addEventListener("click", deleteToDo);
  li.appendChild(span); // li 내부에 span을 배치
  li.appendChild(button); // li 내부에 button을 배치
  toDoList.appendChild(li); // ul 안에 li를 배치
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const NewToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(NewToDoObj);
  paintToDo(NewToDoObj); //화면에 배치하는 함수
  saveToDoS(); // 로컬스토리지에 저장하는 함수
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //이전의 값들을 배열에 저장
  parsedToDos.forEach(paintToDo); //forEach는 array의 각 item에 대해 function을 실행한다.
}
