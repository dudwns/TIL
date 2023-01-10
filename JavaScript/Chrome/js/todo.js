const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

const toDos = [];

function saveToDoS() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //string으로 변환
}

function deleteToDo(event) {
  const li = event.target.parentElement; //이벤트 타겟의 부모 element
  li.remove();
}

function paintToDo(newToDo) {
  const li = document.createElement("li"); //li element 생성
  const span = document.createElement("span"); //span element 생성
  span.innerText = newToDo; // span의 text를 newToDo로 변경
  const button = document.createElement("button"); // button element 생성
  button.innerText = "❌"; // button의 text를 변경
  button.addEventListener("click", deleteToDo);
  li.appendChild(span); // li 내부에 span을 배치
  li.appendChild(button); // li 내부에 button을 배치
  toDoList.appendChild(li); // ul 안에 li를 배치
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  toDos.push(newToDo);
  paintToDo(newToDo);
  saveToDoS();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
