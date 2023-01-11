/* const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input"); 
const loginButton = loginForm.querySelector("button"); //document가 아니고 가져온 HTML element 내부에서 찾을수도 있음
 */

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todoForm = document.querySelector("#todo-form");
const greeting2 = document.querySelector("#greeting2");

const HIDDEN_CLASSNAME = "hidden"; //string만 포함된 변수는 대문자로 표기 + 중요한 변수가 아니라서
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault(); //이벤트의 기본 동작을 막는다.
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username); //로컬 스토리지에 값을 저장 (키, 값)
  paintGreetings(username);
}

function paintGreetings(username) {
  loginForm.classList.add(HIDDEN_CLASSNAME);
  greeting.innerText = `안녕하세요. ${username} 님`; //"Hello " + username와 같은 방식 (string이랑 변수를 하나로 합쳐준다.)
  greeting2.innerText = `오늘도 좋은 하루 보내세요!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting2.classList.remove(HIDDEN_CLASSNAME);
  todoForm.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY); //로컬 스토리지에 있는 값을 가져옴

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
  todoForm.classList.add(HIDDEN_CLASSNAME);
} else {
  paintGreetings(savedUsername);
  todoForm.classList.remove(HIDDEN_CLASSNAME);
}
