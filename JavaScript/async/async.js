// async & await: promise를 더 깔끔하게 사용 가능

// 1. async

/* function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve("yeongjun");
  });
} */

// async를 붙이면 코드블럭 안에 있는 것을 promise로 실행 가능
async function fetchUser() {
  return "yeongjun";
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await
// async가 붙은 함수 안에서만 사용 가능
// await: 뒤에 코드를 실행한 후 다음 줄 실행

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return "사과";
}

async function getBanana() {
  await delay(1000);
  return "바나나";
}

async function pickFruits() {
  const apple = await getApple(); //1초를 기다림
  const banana = await getBanana(); //1초를 기다림 (서로 관여가 없는 구문이기에 총 2초로 비효율적)
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

//useful Promise API
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) => fruits.join(" + ")); //배열 안에 Promise를 병렬적으로 수행 (1초밖에 안 걸림)
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]); // 배열 안에 Promise 중 가장 먼저 수행되는 것을 리턴
}
pickOnlyOne().then(console.log);

// throw "error"; //사용자 정의 예외를 발생(throw)할 수 있습니다. 예외가 발생하면 현재 함수의 실행이 중지되고 (throw 이후의 명령문은 실행되지 않습니다.)
// 제어 흐름은 콜스택의 첫 번째 catch 블록으로 전달됩니다. 호출자 함수 사이에 catch 블록이 없으면 프로그램이 종료됩니다.
