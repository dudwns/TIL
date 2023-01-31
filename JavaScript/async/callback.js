//자바스크립트는 동기적이다. : 호이스팅이 된 이후부터 순서에 맞춰서 하나하나씩 동기적으로 실행됨
// hoisting: var, function declaration이 제일 위로 올라감
// 동기: 코드가 순서대로 실행되는 것
// 비동기: 코드가 언제 실행될지 알 수 없는 것
// 콜백 함수: 다른 함수의 인자로써 이용되는 함수, 파라미터로 전달받은 함수

console.log("1"); // 동기
setTimeout(() => console.log("2"), 1000); // 비동기, 1초 뒤에 콜백을 실행
console.log("3"); // 동기

// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log("hello")); // 동기

// Asynchronous callback
function printWithDelay(print, timeout) {
  // 함수의 선언은 hoisting 됨 (위로 올라감)
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000); // 비동기

// Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if ((id == "ellie" && password == "dream") || (id == "coder" && password == "academy")) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);

// 이렇게 콜백 지옥으로 코드를 짜면 가독성이 너무 떨어진다.
// 유지보수와 디버그도 어렵다.
