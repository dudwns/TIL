import { legacy_createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD"); //type과 payload가 만들어짐, (payload는 reducer에 보내는 인자가 들어감)
const deleteToDo = createAction("DELETE");

/* const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== action.payload);
    default:
      return state;
  }
}; */

//첫 번째 인자는 state의 default값, 두 번째 인자는 함수 내용, createReducer를 사용하면 mutate가 가능 (뒤에서 redux-toolkit과 immer가 인지하고 대신 실행해줌)
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  }, //action이 addToDo일 때 state를 mutate
  [deleteToDo]: (state, action) => state.filter((toDo) => toDo.id !== action.payload),
  // 새로운 state를 리턴할 수도 있음
});

const store = legacy_createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
