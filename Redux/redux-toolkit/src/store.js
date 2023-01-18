import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  //초기 state, reducer 함수의 객체, "slice 이름"을 받아 리듀서 및 state에 해당하는 action creator와 action type을 자동으로 생성하는 함수
  name: "toDoReducer", //이름
  initialState: [], //초기값
  reducers: {
    //리듀서 작성, 이때 해당 리듀서의 키값으로 액션함수가 자동으로 생성된다. (action은 type과 payload가 만들어짐)
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() }); //action type이 add일 때 state를 mutate
    },
    remove: (state, action) => state.filter((toDo) => toDo.id !== action.payload), // 새로운 state를 리턴할 수도 있음
  },
  extraReducers: {}, //액션함수가 자동으로 생성되지 않는 별도의 액션함수가 존재하는 리듀서를 정의(선택 옵션)
});

const store = configureStore({ reducer: toDos.reducer }); //store 생성, Redux Developer Tools 사용 가능

export const { add, remove } = toDos.actions;

export default store;
