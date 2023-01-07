/* const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input"); 
const loginButton = loginForm.querySelector("button"); //document가 아니고 가져온 HTML element 내부에서 찾을수도 있음
 */

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(event) {
  event.preventDefault(); //이벤트의 기본 동작을 막는다.
  console.log(loginInput.value);
  console.dir(event);
}

loginForm.addEventListener("submit", onLoginSubmit);
