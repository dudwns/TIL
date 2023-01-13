# Redux

## Redux란?

Redux는 클라이언트, 서버 및 기본 환경에서 일관되게 작동하고 테스트하기 쉬운 JavaScript 앱을 작성하는데 도움이 되도록 설계된 예측 가능한 상태 관리 라이브러리입니다.

Redux에서 제공하는 패턴과 도구를 사용하면 애플리케이션의 상태가 언제, 어디서, 왜, 어떻게 업데이트되고 이러한 변경이 발생할 때 애플리케이션 로직이 어떻게 작동하는지 더 쉽게 이해할 수 있습니다. Redux는 예측 가능하고 테스트 가능한 코드를 작성하도록 안내하므로 애플리케이션이 예상대로 작동할 것이라는 확신을 가질 수 있습니다.

## Redux 용어 및 함수

store: state들을 담는 저장소입니다.
reducer: state를 수정하는 함수
store.dispatch({ type: ADD }): reducer에게 인자를 전달한다. 객체만 가능하다.
countStore.subscribe(함수명): state의 변화를 감지하고 변화가 있을 때 함수를 실행한다.
store.getState(): state 값을 가져온다.

state를 + 또는 - 시키는 Redux 예제

```javascript
import { legacy_createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD"; //오타가 날 수 있으니까 변수로 설정
const MINUS = "MINUS"; //오타가 날 수 있으니까 변수로 설정

//현재 값이 없다면 0, action은 modifier와 communicate 하는 방법
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD: //action의 type을 검사해서 "ADD" 이면 count를 1 증가
      return count + 1; //reducer가 리턴하는 모든것이 어플리케이션의 state가 됨
    case MINUS:
      return count - 1;
    default:
      return count;
  }
}; //reducer는 함수여야 함 (data를 수정하는 함수)

const countStore = legacy_createStore(countModifier); //store: 데이터가 저장되는 곳, reducer를 전달해야 함

const onChange = () => {
  number.innerText = countStore.getState(); //store에 변화가 있을때마다 감지해서 호출됨
};

countStore.subscribe(onChange); //store 안에 있는 변화를 감지하는 함수

const handleAdd = () => {
  countStore.dispatch({ type: ADD }); //reducer에 action을 보냄, action은 object여야 함
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
```
