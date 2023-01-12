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
