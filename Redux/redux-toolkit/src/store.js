import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  //초기 state, reducer 함수의 객체, "slice 이름"을 받아 리듀서 및 state에 해당하는 action crator와 action type을 자동으로 생성하는 함수
  name: "toDoReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter((toDo) => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: toDos.reducer }); //Redux Developer Tools 사용 가능

export const { add, remove } = toDos.actions;

export default store;
