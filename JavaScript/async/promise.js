// promise: 자바스크립트에 내장되어 있는 비동기를 간편하게 처리할 수 있는 오브젝트
// 비동기적인 것을 수행할 때 콜백함수 대신에 유용하게 쓸 수 있다.
// state: pending(동작이 수행 중 일때) -> fulfilled(성공적으로 끝냈을 때) or rejected(문제가 발생할 때)
// Producer(해당하는 기능을 만들어내는) vs Consumer(원하는 데이터를 소비)

// 1. Producer
const promise = new Promise((resolve, reject) => {
  // 네트워크 통신, 파일 읽어오기 등은 비동기적으로 처리하는 것이 좋음 (실행중에 다음 줄이 실행이 안 됨)
  // Promise 객체를 만드는 순간 바로 실행이 되기 때문에 주의
  console.log("doing something...");
  setTimeout(() => {
    resolve("ellie"); //성공적으로 수행했을 때 실행하는 함수
    // reject(new Error("no networkkk")); //실패했을 때 실행하는 함수, Error 객체를 보냄
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise
  .then((value) => {
    console.log(value);
  }) // 성공했을 때 실행, value에는 resolve함수에서 전달한 인자를 받음
  .catch((error) => {
    console.log(error);
  }) // 실패했을 때 실행, error에는 reject함수에서 전달한 Error객체를 받음
  .finally(() => {
    console.log("finally");
  }); // 성공, 실패 상관없이 무조건 마지막에 호출되어짐

// 3. Promise chaining (Promise 연결하기)
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2) // 2
  .then((num) => num * 3) // 6
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000); // 5
    });
  })
  .then((num) => console.log(num)); // 5

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("닭"), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 계란`)), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 프라이`), 1000);
  });

getHen() //
  .then(getEgg) // 인자가 똑같으면 생략 가능 .then(value => getEgg(value))
  .catch((error) => {
    return "빵";
  })
  .then(cook)
  .then(console.log)
  .catch(console.log); // 에러 핸들링

console.log("마지막 코드");
