# Recoil

## Recoil이란?

Recoil은 React 프로젝트를 위한 많은 전역 상태관리 라이브러리들 중 하나로, 2020년 5월 Facebook에서 출시하였다.

그렇기에, 다른 라이브러리(Redux, Mobx)와는 달리 React 전용이며 React에 최적화되어 있다고 할 수 있다.

<br>

## Recoil을 사용하는 이유

- Redux에 비해 코드가 간결하다.
- 개념이 비교적 간단하다.
- Selector를 활용해 비동기 로직을 쉽게 구현할 수 있다.

<br>

## Recoil의 핵심 개념

### atom

Recoil의 가장 중요한 핵심이라고 할 수 있는 atom은 간단히 이해하고자 한다면 비눗방울로 추상화 할 수 있다.

Web Application을 구조화 한다면 구조 상단에 atom이 비눗방울처럼 둥둥 떠다니고 있고, 개발을 하다가 어떤 비눗방울(상태)이 필요하다면 해당하는 비눗방울만 쏙 빼서 쉽게 사용할 수 있다.

atom에는 우리가 전역적으로 사용할 상태(state)를 담는다.

<br>

## Recoil 사용 방법

npm을 이용하여 설치

```
npm install recoil
```

또는 yarn을 사용한다면

```
yarn add recoil
```

<br>

Redux에서는 `<Provider>`를 통해서 App에 store를 연결해주지만,
Recoil을 시작하기 위해선 index.jsx에서 렌더링 하고 있는 root를 `<RecoiRoot>`로 감싸줘야 한다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
```

<br>

atom 생성

```javascript
// atoms.js
import { atom } from "recoil";

//atom을 구분해줄 고유의 값
//deatult는 해당 key값을 가진 atom의 기본값
export const userAtom = atom({
  key: "user",
  default: {
    id: "Admin",
    password: 1234,
  },
});

export const countAtom = atom({
  key: "count",
  default: 0,
});
```

<br>

atom 사용

```javascript
import { useRecoilState } from "recoil";
import { countAtom } from "./atoms";

function App() {
  const [count, setCount] = useRecoilState(countAtom); //useState와 거의 유사하다. (atom을 통해 가져옴)

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <span>{count}</span>
      <button onClick={handleIncrease}>count 증가</button>
    </>
  );
}

export default App;
```

<br>

atom과 modifier를 분리해서 사용할 수도 있다.

```javascript
import { useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom } from "./atoms";

function App() {
  const count = useRecoilValue(countAtom); //atom의 값을 받음
  const setCount = useSetRecoilState(countAtom); //atom을 변경할 수 있는 modifier를 받음

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <span>{count}</span>
      <button onClick={handleIncrease}>count 증가</button>
    </>
  );
}

export default App;
```

<hr>

## TypeScript에서 Recoil 사용

atom 생성

```javascript
import { atom } from "recoil";

export interface Iuser {
  id: string;
  password: number;
  name: string;
}

//atom을 구분해줄 고유의 값
//deatult는 해당 key값을 가진 atom의 기본값
export const userAtom =
  atom <
  Iuser >
  {
    key: "user",
    default: {
      id: "Admin",
      password: 1234,
      name: "홍길동",
    },
  };
```

<br>

atom 사용

```javascript
import { useRecoilState } from "recoil";
import { Iuser, userAtom } from "./atoms";

function App() {
  const [user, setUser] = useRecoilState < Iuser > userAtom; //useState와 거의 유사하다. (atom을 통해 가져옴)

  return (
    <>
      <p>아이디: {user.id}</p>
      <p>비밀번호: {user.password}</p>
      <p>이름: {user.name}</p>
    </>
  );
}

export default App;
```
