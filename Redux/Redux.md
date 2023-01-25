# Redux

## Redux란?

Redux는 클라이언트, 서버 및 기본 환경에서 일관되게 작동하고 테스트하기 쉬운 JavaScript 앱을 작성하는데 도움이 되도록 설계된 예측 가능한 상태 관리 라이브러리입니다.

Redux에서 제공하는 패턴과 도구를 사용하면 애플리케이션의 상태가 언제, 어디서, 왜, 어떻게 업데이트되고 이러한 변경이 발생할 때 애플리케이션 로직이 어떻게 작동하는지 더 쉽게 이해할 수 있습니다. Redux는 예측 가능하고 테스트 가능한 코드를 작성하도록 안내하므로 애플리케이션이 예상대로 작동할 것이라는 확신을 가질 수 있습니다.

## Redux를 어떤 상황에서 사용해야 하는가?

- 계속해서 바뀌는 상당한 양의 데이터가 있다.
- 상태를 위한 단 하나의 근원이 필요하다.
- 최상위 컴포넌트가 모든 상태를 가지고 있는 것은 더 이상 적절하지 않다.

## Redux 용어 및 함수

store: state들을 담는 저장소입니다.

reducer: state를 수정하는 함수

store.dispatch({ type: ADD }): reducer에게 인자를 전달한다. 객체만 가능하다.

countStore.subscribe(함수명): state의 변화를 감지하고 변화가 있을 때 함수를 실행한다.

store.getState(): state 값을 가져온다.

<br>
바닐라 JS에서 state를 + 또는 - 시키는 Redux 예제

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

## react에서 redux 사용하기

### Redux Toolkit

Redux Toolkit은 Redux 로직을 작성하기 위해 Redux에서 공식적으로 추천하는 방법입니다.

RTK는 Redux 앱을 만들기에 필수적으로 여기는 패키지와 함수들을 포함합니다.

대부분의 Redux 작업을 단순화하고, 흔한 실수를 방지하며, Redux 앱을 만들기 쉽게 해주는 모범 사례를 통해 만들어졌습니다.

<br>

Redux Toolkit 임포트

```
# NPM
npm install @redux.js/toolkit

# Yarn
yarn add @redux.js/toolkit
```

<br>
createSlice를 통해 보다 간결하게 Redux를 사용할 수 있다.

```javascript
//store.js

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
```

<br>
react-redux를 사용하기 위해 Provider로 감싸주고, store 속성에 작성한 store값을 불러와서 설정한다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider> //react-redux를 사용하기 위해 감싸준다. store 필요
);
```

<br>
hook이 없었을 땐 connect를 사용했지만, 이제는 hook을 통해 state를 가져오고, dispatch 할 수 있다.

```javascript
//Home.js

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store";
import ToDo from "../ToDo";

function Home() {
  const [text, setText] = useState("");
  const toDos = useSelector((state) => state); //store의 state를 바로 가져옴
  const dispatch = useDispatch(); //Redux store에서 dispatch 함수에 대한 참조를 반환
  function onChange(event) {
    setText(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(add(text)); //useDispatch()로 인해 dispatch 사용 가능
    setText("");
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}></input>
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

export default Home;
```

```javascript
//ToDo.js

import { useDispatch } from "react-redux";
import { remove } from "./store";
import { Link } from "react-router-dom";

function ToDo({ text, id }) {
  const dispatch = useDispatch(); //Redux store에서 dispatch 함수에 대한 참조를 반환
  const onClick = () => {
    dispatch(remove(id)); //dispatch함수를 통해 remove 액션 실행, 인자는(id) reducer의 payload로 전달됨
  };

  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onClick}>delete</button>
    </li>
  );
}

export default ToDo;
```
