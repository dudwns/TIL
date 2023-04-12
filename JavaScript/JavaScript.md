# 자바스크립트란?

<p>자바스크립트는 ‘웹페이지에 생동감을 불어넣기 위해’ 만들어진 프로그래밍 언어입니다.</p>
<p>자바스크립트로 작성한 프로그램을 스크립트(script) 라고 부릅니다. 스크립트는 웹페이지의 HTML 안에 작성할 수 있는데, 웹페이지를 불러올 때 스크립트가 자동으로 실행됩니다.</p>
 <hr>

## 자바스크립트의 타입

| 타입      | 설명                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number    | 숫자형 타입                                                                                                                                             |
| string    | 문자열 타입                                                                                                                                             |
| boolean   | 논리적 참, 거짓을 나타내는 true 와 false                                                                                                                |
| null      | 의도적으로 변수에 값이 없다는 것을 명시할 때 사용                                                                                                       |
| undefined | 값이 존재하지 않음(선언 이후 변수에 값을 부여하지 않은 상태)                                                                                            |
| symbol    | ES6에서 새롭게 추가된 타입으로 변경 불가능한 원시 타입의 값이다. 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 Property Key를 만들기 위해 사용한다. |

<br>

```
const a = 1;
console.log(typeof a); // a의 타입을 알 수 있다.
```

<hr/>

## 선언자

<h3>Var</h3>
const와 let이 나오기 전에 주로 사용하던 선언자로 재선언과 재할당이 가능하다.

```
var a = 1;
var a = 2;  //재선언 가능
a = 3;  //재할당 가능
```

<h3>const</h3>
값이 변하지 않는 상수를 선언할 때 사용하는 선언자로 재선언과 재할당이 불가능하다.

```
const a = 1;
const a = 2;  //재선언 불가능
a = 3;  //재할당 불가능
```

<h3>let</h3>
값이 바뀔 수 있는 변수를 선언할 때 사용하는 선언자로 재선언은 불가능하지만 재할당은 가능하다.

```
let a = 1;
let a = 2;  //재선언 불가능
a = 3;  //재할당 가능
```

<hr>

## 배열

데이터를 나열하기 위한 방법 중 하나이며, []를 사용한다.
<br>
<br>
<br>
배열을 선언하는 방법

```
const week = ["mon", "tue", "wed", "thu", "fri", "sat"]; //배열 선언
```

<br>
배열의 원소를 가져오는 방법

```
console.log(week[4]); // fri 출력, 그 이유는 인덱스를 0부터 세기 때문이다.
```

<br>
배열에 원소를 추가하는 방법

```
week.unshift("sun"); // 첫 번째에 원소 추가, 전체 배열을 움직이기 때문에 속도가 느림
week.push("sun"); // 마지막에 원소 추가
```

<br>
배열의 원소를 삭제하는 방법

```
week.shift(); // 첫 번째 원소 삭제, 전체 배열을 움직이기 때문에 속도가 느림
week.pop(); // 마지막 원소 삭제
week.splice(1, 1) // index가 1인 원소에서 시작해서 하나만 삭제
```

<br>
배열의 원소를 수정하는 방법

```
week.splice(1, 1, "tuesday"); // index가 1인 "tue"를 삭제하고 "tuesday"로 변경 // ['mon', 'tuesday', 'wed', 'tue', 'thu', 'fri', 'sat']
week.splice(1, 0, "tuesday"); // 아무것도 삭제하지 않고, index 1에 "tuesday"를 추가 // ['mon', 'tuesday', 'tue', 'wed', 'tue', 'thu', 'fri', 'sat']
```

<br>
원소의 index 알아내기 (없으면 -1 리턴)

```
const week = ["mon", "tue", "wed", "tue", "thu", "fri", "wed", "sat"];

console.log(week.indexOf("wed")); // 2 (앞에서부터 탐색)
console.log(week.lastIndexOf("wed")); // 6 (뒤에서부터 탐색)
```

<br>
배열에 해당 원소를 포함하고 있는지 알아내기 (있으면 true, 없으면 false를 리턴)
```
console.log(week.includes("wed")); // true
```

<br>
배열 합치기

```
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const result = array1.concat(array2);
console.log(result); // [1, 2, 3, 4, 5, 6]
```

<hr>

## Object(객체)

property를 가진 데이터를 저장해주며, {}를 사용한다.
<br>
<br>
<br>
객체를 선언하는 방법

```
const player = {
    name:"nico",
    points: 10,
    fat: true,
};
```

<br>
객체의 property 접근 (둘 다 가능)

```
console.log(player.name);
console.log(player["name"]);
```

<br>
객체의 property를 수정하는 방법

```
player.points = 15;
```

<hr>

## function(함수)

반복해서 사용할 수 있는 코드 조각으로, 어떤 코드를 캡슐화 해서 여러번 실행할 수 있게 해준다.
<br>
<br>
<br>
함수 선언

```
function 함수명() {
    실행코드
};
```

<br>
함수 실행

```
함수명();
```

<br>
함수에게 Parameter를 전달하는 방법

```
function calculator(a, b){
    return a + b; //3을 리턴, 리턴하는 즉시 함수는 종료
}; //2개의 인자를 가지는 함수 생성

const result = calculator(2, 1); //a에 2, b에 1을 전달, result는 3
```

<hr>

## 타입 변환

### 1. 묵시적 타입 변환

자바스크립트는 특정 타입의 값을 기대하는 곳에 다른 타입의 값이 오면, 자동으로 타입을 변환하여 사용한다.
즉, 문자열 값이 오길 기대하는 곳에 숫자가 오더라도 자바스크립트는 알아서 숫자를 문자열로 변환하여 사용한다.

```
10 + "문자열"; // 문자열 연결을 위해 숫자 10이 문자열로 변환됨.
"3" * "5";     // 곱셈 연산을 위해 두 문자열이 모두 숫자로 변환됨.
1 - "문자열";  // NaN
```

위의 세 번째 예제에서 뺄셈 연산을 위해 문자열이 숫자로 변환되어야 하나, 해당 문자열은 두 번째 예제의 문자열과는 달리 숫자로 변환될 수 없는 문자열이다.
따라서 의미에 맞게 자동으로 타입을 변환할 수 없으므로, 자바스크립트는 NaN 값을 반환한다.

NaN은 Not a Number의 축약형으로, 정의되지 않은 값이나 표현할 수 없는 값이라는 의미를 가진다.
이러한 NaN은 Number 타입의 값으로 0을 0으로 나누거나, 숫자로 변환할 수 없는 피연산자로 산술 연산을 시도하는 경우에 반환되는 읽기 전용 값이다.
<br>
<br>

### 2. 명시적 타입 변환

자바스크립트에서는 묵시적 타입 변환을 많이 사용하지만, 명시적으로 타입을 변환할 방법도 제공한다.
명시적 타입 변환을 위해 자바스크립트가 제공하는 전역 함수는 다음과 같다.

| 함수         | 설명                             |
| ------------ | -------------------------------- |
| Number()     | number로 변환                    |
| parseInt()   | 정수로 변환                      |
| parseFloat() | 소수점 표현이 가능한 실수로 변환 |
| String()     | string으로 변환                  |
| .toString()  | string으로 변환                  |
| Boolean()    | boolean으로 변환                 |
| Object()     | object로 변환                    |

```
Number("10"); // 숫자 10
String(true); // 문자열 "true"
Boolean(0);   // 불리언 false
Object(3);    // new Number(3)와 동일한 결과로 숫자 3
```

<hr>

## 비교 연산자

== 같다.<br>

```
5 == 5 //true
"5" == 5 //true
```

<br>
=== 변수의 값 뿐 아니라 변수의 타입까지 같다.

```
5 === 5 //true
"5" === 5 //false
```

<br>
!= 같지 않다.

```
5 != 7 //true
"5" != 5 //false
```

<br>
!== 변수의 값 뿐만 아니라 변수의 타입까지 다르다.

```
5 !== 7 //true
"5" !== 5 // true
```

<br>
\> 크다.<br>
< 작다.<br>
\>= 크거나 같다.<br>
<= 작거나 같다.<br>

```
5  >  3 // true
5 < 3 // false
3 <= 3 // true
6 <= 10 // true
1 >= 4 // false
7 >= 3 // true
```

<br>

## 논리 연산자

&& (AND 연산자): 두 피연산자가 모두 참일 때 true를 반환합니다.

```
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

<br>
|| (OR 연산자): 두 피연산자 중 하나라도 참이면 true를 반환합니다.

```
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

<br>
! (NOT 연산자): 반환된 값의 역을 반환합니다.

```
alert( !true ); // false
alert(!(20 <= 10)); // true
alert( !0 ); // true
```

<br>

## 조건문

조건문의 결과에 따라서 코드를 실행

```
if (조건문) {
   해당 조건문이 true일 때 실행
}
else if (조건문) {
    첫번째 조건문은 false이고 해당 조건문이 true일 때 실행
}
else {
    모든 조건문이 false일 때 실행
}
```

<br>
예제

```
const score = parseInt(prompt("점수를 입력하세요."));

if (isNaN(score) || score) { // isNan(): NaN이면 true 아니면 fales를 반환
    console.log("양수를 입력하세요.");
} else if ( score >= 90 ) {
    console.log("A");
} else if ( score >= 80 && score < 90 ) {
    console.log("B");
} else if ( score >= 70 && score < 80 ) {
    console.log("C");
} else if ( score >= 60 && score < 80 ) {
    console.log("D");
} else {
    console.log("F");
}
```

<hr/>

## HTML에 JavaScript 파일을 불러오는 방법

`<script>` 태그를 사용한다.  
주로 `<body>` 태그를 닫기 직전 위치에 작성한다.

```
<body>
    <script src="app.js"></script> // src 속성에 js파일 경로를 입력
</body>
```

<br>

## JavaScript에서 HTML의 Element를 접근하는 방법

### 1. document.getElementById()

Element의 id값을 추적하여 반환한다.
<br>
<br>

```
<body>
    <h1 id="title">index.html</h1>
    <script src="app.js"></script>
</body>
```

```
const title = document.getElementById("title");
```

<br>

### 2. document.getElementsByClassName()

Element의 className값을 추적하여 반환한다.<br>
많은 Element를 가져올 때 사용하고, array 형식으로 반환한다.
<br>
<br>

```
<body>
    <div class="contents"></div>
    <div class="contents"></div>
    <div class="contents"></div>
    <script src="app.js"></script>
</body>
```

```
const contents = document.getElementsByclassName("contents");
```

<br>

### 3. document.getElementsByTagName()

Element의 태그명을 추적하여 반환한다.<br>
className과 마찬가지로 array 형식으로 반환한다.
<br>
<br>

```
<body>
    <h1>hello</h1>
    <script src="app.js"></script>
</body>
```

```
const h1 = document.getElementsByTagName("h1");
```

위 방식들은 array 형식으로 반환 되기 때문에 특정 Element를 선택하거나, Element 내부의 Element를 선택하는 데에 한계가 있다.

<br>

### 4. document.querySelector()

가장 많이 사용하는 방식으로, CSS Selector를 이용하여 사용할 수 있다. (단 하나의 Element만 리턴, 해당하는 Element가 다수여도 첫번째 Element만 리턴)

만약 id가 "hello"인 element 내부의 element h1을 가져온다고 하자.

```
<body>
    <div class="hello">
      <h1>Hi</h1>
    </div>
    <script src="app.js"></script>
</body>
```

<br>
CSS를 작성할 때 사용하는 선택자와 똑같이 사용하면 된다.

```
const title = document.querySelector(".hello h1"); //class가 "hello"인 element 내부에 있는 h1태그
```

### 5. document.querySelectorAll("")

document.querySelector()와 동일하지만, 다수의 Element들을 가져오고 싶을 때 사용한다. (array 형식으로 반환)

class가 "hello"인 element 내부에 해당하는 h1이 3개라고 하자.

```
<body>
    <div class="hello">
      <h1>Hi1</h1>
    </div>
    <div class="hello">
      <h1>Hi2</h1>
    </div>
    <div class="hello">
      <h1>Hi3</h1>
    </div>
    <script src="app.js"></script>
</body>
```

```
const title = document.querySelectorAll(".hello h1"); //class가 "hello"인 element 내부에 있는 모든 h1태그
```

querySelector()의 경우 첫번째 요소인 Hi1만 가져오지만, <br>
querySelectorAll()의 경우 해당하는 Hi1, Hi2, Hi3을 모두 array 형식으로 가져온다.

<hr>

## Event(이벤트)

웹페이지에서 마우스를 클릭했을 때, 키를 입력했을 때, 특정요소에 포커스가 이동되었을 때 등 어떤 사건을 발생시키는 것.

<br>

## 이벤트 종류

### 1. 마우스 이벤트

| 이벤트      | 설명                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| click       | 요소에 마우스를 클릭했을 때 이벤트가 발생                                           |
| dbclick     | 요소에 마우스를 더블클릭했을 때 이벤트가 발생                                       |
| mouseover   | 요소에 마우스를 오버했을 때 이벤트가 발생                                           |
| mouseout    | 요소에 마우스를 아웃했을 때 이벤트가 발생                                           |
| mousedown   | 요소에 마우스를 눌렀을 때 이벤트가 발생                                             |
| mouseup     | 요소에 마우스를 떼었을 때 이벤트가 발생                                             |
| mousemove   | 요소에 마우스를 움직였을 때 이벤트가 발생                                           |
| contextmenu | context menu (마우스 오른쪽 버튼을 눌렀을 때 나오는 메뉴)가 나오기 전에 이벤트 발생 |

<br>

### 2. 키 이벤트

| 이벤트   | 설명                             |
| -------- | -------------------------------- |
| keydown  | 키를 눌렀을 때 이벤트가 발생     |
| keyup    | 키를 떼었을 때 이벤트가 발생     |
| keypress | 키를 누른 상태에서 이벤트가 발생 |

<br>

### 3. 폼 이벤트

| 이벤트 | 설명                                                                     |
| ------ | ------------------------------------------------------------------------ |
| focus  | 요소에 포커스가 이동되었을 때 이벤트 발생                                |
| blur   | 요소에 포커스가 벗어났을 때 이벤트 발생                                  |
| change | 요소에 값이 변경 되었을 때 이벤트 발생                                   |
| submit | submit 버튼을 눌렀을 때 이벤트 발생                                      |
| reset  | reset 버튼을 눌렀을 때 이벤트 발생                                       |
| select | input이나 textarea 요소 안의 텍스트를 드래그하여 선택했을 때 이벤트 발생 |

<br>

### 4. 로드 및 기타 이벤트

| 이벤트 | 설명                                       |
| ------ | ------------------------------------------ |
| load   | 페이지의 로딩이 완료되었을 때 이벤트 발생  |
| abort  | 이미지의 로딩이 중단되었을 때 이벤트 발생  |
| unload | 페이지가 다른 곳으로 이동될 때 이벤트 발생 |
| resize | 요소에 사이즈가 변경되었을 때 이벤트 발생  |
| scroll | 스크롤바를 움직였을 때 이벤트 발생         |

<br>

## 이벤트 핸들러 등록 방법

### 1. inline 방식

인라인 방식은 이벤트를 이벤트 대상의 태그 속성으로 지정하는 것이다.

```
<input type = "button" onclick = "alert('Hello world');" value = "button" />
```

<br>

### 2. 프로퍼티 방식

프로퍼티 방식은 이벤트 대상에 해당하는 객체의 프로퍼티로 이벤트를 등록하는 방식이다.

인라인 방식에 비해서 HTML과 JavaScript를 분리할 수 있다는 점에서 선호되는 방식이지만 뒤에서 배울 addEventListener 방식을 추천한다.

이벤트 핸들러 프로퍼티 방식은 이벤트에 오직 하나의 이벤트 핸들러만을 바인딩할 수 있다.

```
<button class = "btn">Click me</button>

<script>
    const btn = document.querySelector(".btn");

    btn.onclick = function () {
        alert("Button clicked 1"); // 하나의 이벤트 핸들러만 바인딩하기 때문에 실행되지 않음
    };
    btn.onclick = function () {
        alert("Button clicked 2"); //실행
    };
</script>
```

<br>

### 3. addEventListener 방식

eventTarget.addEventListener("eventType", functionName, 버블링, 캡쳐링 여부) //eventType에 on을 쓰지 않는다. (버블링은 false, 캡쳐링은 true)

addEventListener() 메소드를 이용하여 대상 DOM 요소에 이벤트를 바인딩하고 해당 이벤트가 발생했을 때 실행될 콜백 함수(이벤트 핸들러)를 지정한다.

addEventListener 함수 방식은 이전 방식에 비해 아래와 같이 보다 나은 장점을 갖는다.

- 하나의 이벤트에 대해 하나 이상의 이벤트 핸들러를 추가할 수 있다.
- 캡처링과 버블링을 지원한다.
- HTML 요소뿐만아니라 모든 DOM 요소(HTML, XML, SVG)에 대해 동작한다. 브라우저는 웹 문서(HTML, XML, SVG)를 로드한 후, 파싱하여 DOM을 생성한다.

```
<body>
    <div class="hello">
      <h1>Hi</h1>
    </div>
    <script src="app.js"></script>
</body>
```

```
const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  alert("title was clicked");
}

title.addEventListener("click", handleTitleClick); //click 할 때 handleTitleClick 이벤트를 실행
```

이벤트를 제거할 때는 removeEventListener()를 사용한다.

```
title.removeEventListener("click", handleTitleClick); // event 제거
```

<br>

## event 객체

이벤트를 발생시킨 요소와 발생한 이벤트에 대한 정보를 제공하는 객체

DOM과 관련된 이벤트가 발생하면 event객체가 동적으로 생성되고 정보가 저장된다.

이벤트 발생 요소, 이벤트 타입, 이벤트 관련 데이터 등이 저장된다.

이벤트 핸들러의 인자로 암묵적으로 전달되기 때문에, 이벤트 핸들러의 첫번째 인자는 무조건 event 객체로 받는다.
<br>

event객체에서 공통적으로 사용하는 이벤트

| 프로퍼티/메서드            | 타입         | R/W | 설명                                                                            |
| -------------------------- | ------------ | --- | ------------------------------------------------------------------------------- |
| bubbles                    | bool         | R   | 이벤트가 버블링되는지 나타냄                                                    |
| cancelable                 | bool         | R   | 이벤트의 기본 동작 취소가능 여부                                                |
| currentTarget              | element      | R   | 현재 이벤트를 처리중인 element                                                  |
| defaultPrevented           | bool         | R   | true면 preventDefault()호출상태                                                 |
| detail                     | integer      | R   | 이벤트와 관련된 추가정보                                                        |
| eventPhase                 | integer      | R   | 이벤트 핸들러가 호출된 단계 (1:캡처링, 2:타깃, 3:버블링)                        |
| preventDefault()           | Function     | R   | 이벤트의 기본행동 취소, cancelable가 true일때 가능함                            |
| stopImmediatePropagation() | Function     | R   | 이벤트 캡처링, 이벤트 버블링을 모두 취소하며 다른 이벤트 핸들러 호출을 막음.    |
| stopPropagation()          | Function     | R   | 이벤트 캡처링, 이벤트 버블링을 모두 취소함. bubbles가 true일때 가능함           |
| target                     | element      | R   | 이벤트를 발생시킨 타겟                                                          |
| trusted                    | bool         | R   | 브라우저에서 생성한 이벤트라면 true 개발자가 만든 자바스크립트 이벤트라면 false |
| type                       | string       | R   | 발생한 이벤트 타입                                                              |
| view                       | AbstractView | R   | 이벤트와 연결된 추상화된 뷰, 이벤트가 발생한 window객체와 일치                  |

<br>

## event.preventDefault()

이벤트의 기본적인 동작을 실행하지 않도록 지정

주로 사용되는 경우

1. a 태그를 눌렀을 때 href 링크로 이동하지 않게 할 경우
2. form 안에 submit 역할을 하는 버튼을 눌렀어도 페이지가 새로고침 되게 하고싶지 않은 경우 (submit은 작동됨)

```
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(event) {
  event.preventDefault(); //이벤트의 기본 동작을 막는다.
  console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit);
```

<hr>

## 자바스크립트에서 Element의 Class 제어

### className과 classList

클래스 변경은 스크립트를 통해 자주 하게 되는 동작 중 하나입니다.

아주 오래전 자바스크립트엔 "class"같은 예약어는 객체의 프로퍼티가 될 수 없다는 제약사항이 있었습니다. 지금은 이런 제약사항이 사라졌지만, 과거엔 "class" 프로퍼티를 사용할 수 없었기 때문에 elem.class를 사용하는 것 역시 불가능했습니다.

이런 배경 때문에 클래스를 위한 프로퍼티 "className"이 도입하게 되었습니다. elem.className는 "class" 속성에 대응합니다.  
<br>
className은 class 문자열 전체를 변경하게 됩니다.

```
function handleTitleClick() {
  const clickedClass = "clicked";
  if (h1.className === clickedClass) { //class = "clicked"이면
    h1.className = ""; //모든 class를 제거
  } else {            // class = "clicked"가 아니면
    h1.className = clickedClass; //무조건 class = "clicked"로 변경
  }
}
```

<br>
위처럼 속성값 전체를 바꾸는 게 아니고 클래스 하나만 추가하거나 제거하고 싶은 경우에는 elem.classList라는 프로퍼티를 사용할 수 있습니다.

```
function handleTitleClick() {
  const clickedClass = "clicked";
  if (h1.classList.contains(clickedClass)) { //현재 classList에 "clicked"가 존재하면
    h1.classList.remove(clickedClass); //현재 classList에 "clicked"만 제거
  } else {                            //존재하지 않으면
    h1.classList.add(clickedClass); //현재 classList에 "clicked" 추가
  }
}
```

<br>
classList에는 위 동작이 구현되어 있는 함수가 있습니다. (class의 유무를 확인하고 없으면 추가, 있으면 제거를 반복)

elem.classList.toggle()을 사용하면 위 동작을 한 줄의 코드로 작성할 수 있습니다.

```
function handleTitleClick() {
  h1.classList.toggle("clicked");
}
```

<hr>

## 로컬 스토리지

localStorage를 사용하면, 브라우저에 key-value 값을 Storage에 저장할 수 있습니다.

저장한 데이터는 세션간에 공유됩니다.

즉, 세션이 바뀌어도 저장한 데이터가 유지됩니다.

| 함수 및 속성          | 설명                                         |
| --------------------- | -------------------------------------------- |
| setItem( key, value ) | localStorage에 키, 값을 추가한다.            |
| getItem( key )        | localStorage에 있는 값을 가져온다.           |
| removeItem( key )     | localStorage에 있는 값을 삭제한다.           |
| clear()               | 도메인 내의 localStorage 값을 전부 삭제한다. |
| key( index )          | index로 key값 찾기                           |
| length                | localStorage에 들어있는 아이템 개수를 반환   |

localStorage에는 문자열의 값만 저장되기 때문에 배열이나 객체를 저장하기 위해서는 문자열로 변환해서 저장해야 합니다.

<br>

## JSON이란?

JSON은 JavaScript Object Notation의 약자로, 브라우저와 서버사이에서 오고가는 데이터의 형식이다.

## JSON 내장 객체

자바스크립트에서는 JSON 포멧의 데이터를 간편하게 다룰 수 있도록 JSON이라는 객체를 내장하고 있습니다.

JSON 내장 객체는 JavaScript 객체와 JSON 문자열 간의 상호 변환을 수행해주는 두 개의 메서드를 제공합니다.

| 함수             | 설명                                        |
| ---------------- | ------------------------------------------- |
| JSON.stringify() | JavaScript 객체를 JSON 문자열로 변환시킨다. |
| JSON.parse()     | JSON 문자열을 JavaScript 객체로 변환시킨다. |

```
// localStorage에 저장할 객체
const obj = {
  name : 'anna',
  age : 20
}

// localStorage에 저장할 배열
const arr = [1, 2, 3];

// 객체, 배열을 JSON 문자열로 변환
const objString = JSON.stringify(obj);
const arrString = JSON.stringify(arr);

// setItem
localStorage.setItem('person', objString);
localStorage.setItem('nums', arrString);

// getItem
const personString = localStorage.getItem('person');
const numsString = localStorage.getItem('nums');

// JSON 문자열을 객체, 배열로 변환
const personObj = JSON.parse(personString);
const numsArr = JSON.parse(numsString);
```

<hr>

## 함수의 실행 시간 제어

### setInterval()

일정 간격으로 함수를 주기적으로 호출하고 싶을 때 사용한다.<br>
setInterval(함수명, 시간) //시간은 ms단위로 나타낸다.
단 처음에 바로 실행되지 않고 설정한 시간이 지나고 부터 실행된다.

```
function sayHello() {
  console.log("hello");
}

const intervalId = setInterval(sayHello, 2000); //5초 간격으로 함수를 실행

```

Interval 함수 중단

```
clearInterval(intervalId);
```

<br>

### setTimeout()

일정 시간이 지난 후에 함수를 호출하고 싶을 때 사용한다.<br>
setTimeout(함수명, 시간) //시간은 ms단위로 나타낸다.

```
function sayHello() {
  console.log("hello");
}

const timeoutId = setTimeout(sayHello, 5000); //5초 후에 함수를 한번만 실행
```

Timeout 함수 중단

```
clearTimeout(timeoutId)
```

<hr>

## Date 객체

자바스크립트에서는 Date 객체를 사용하여 매 순간 변화하는 시간과 날짜에 관한 정보를 손쉽게 얻을 수 있다.

| 함수 (get)        | 함수(set)         | 의미      | 설명                                                                         |
| ----------------- | ----------------- | --------- | ---------------------------------------------------------------------------- |
| getFullYear()     | setFullYear()     | 년도      |                                                                              |
| getMonth()        | setMonth()        | 월        | 0 ~ 11 > 1월 ~ 12월                                                          |
| getDate()         | setDate()         | 일        | 현재 이벤트를 처리중인 element                                               |
| getDay()          | setDay()          | 요일      | 0 ~ 6 > 일요일 ~ 토요일                                                      |
| getHours()        | setHours()        | 시간      | 이벤트와 관련된 추가정보                                                     |
| getMinutes()      | setMinutes()      | 분        | 이벤트 핸들러가 호출된 단계 (1:캡처링, 2:타깃, 3:버블링)                     |
| getSeconds()      | setSeconds()      | 초        | 이벤트의 기본행동 취소, cancelable가 true일때 가능함                         |
| getMilliseconds() | setMilliseconds() | 밀리초    | 이벤트 캡처링, 이벤트 버블링을 모두 취소하며 다른 이벤트 핸들러 호출을 막음. |
| getTime()         | setTime()         | Unix 타임 | 1970/1/1 12:00 기준 경과한 밀리 초                                           |

<br>

## padStart()와 padEnd()

padStart()는 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다. 채워넣기는 대상 문자열의 시작(좌측)부터 적용됩니다. (String 타입만 가능)

padEnd()는 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다. 채워넣기는 대상 문자열의 끝(우측)부터 적용됩니다. (String 타입만 가능)

시간을 두자릿 수로 표현하는 예제 (1->01, 2 ->02, 3->03)

```
const clock = document.querySelector("h2#clock"); //h2태그중 id가 clock인 element

function getClock() {
  const date = new Date(); //Date 객체 생성
  const hours = String(date.getHours()).padStart(2, "0"); //이 string은 2글자가 되어야하고 2글자 미만이면 앞에 0을 붙임
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`; //시, 분, 초를 나타냄
}

getClock();
setInterval(getClock, 1000); //1초마다 함수를 실행
```

<hr>

## Math 객체

Math 객체는 수학에서 자주 사용하는 상수와 함수들을 미리 구현해 놓은 자바스크립트 표준 내장 객체이다.

생성자가 존재하지 않아서 따로 인스터스를 생성하지 않더라도 Math 객체의 모든 method나 property를 바로 사용할 수 있다.

<br>

자주 사용하는 함수 및 프로퍼티
| 함수 및 프로퍼티 | 설명 |
| -------- | -------------------------------- |
| Math.min(x,y,z....) | 인수로 전달받은 값 중에서 가장 작은 수를 반환 |
| Math.max(x,y,z....) | 인수로 전달받은 값 중에서 가장 큰 수를 반환 |
| Math.random() | 0보다 크거나 같고 1보다 작은 랜덤 숫자 반환 |
| Math.round(x) | 소수점 첫 번째 자리에서 반올림 후 반환 |
| Math.floor(x) | 인수와 같거나 작은 수 중에서 가장 큰 정수 반환 |
| Math.ceil(x) | 인수와 같거나 큰 수 중에서 가장 작은 정수 반환 |
| Math.abs(x) | x의 절댓값 반환 |
| Math.sqrt(x) | x의 제곱근 반환 |
| Math.cbrt(x) | x의 세제곱근 반환 |
| Math.exp(x) | e의 x제곱근 값을 반환 |
| Math.log(x) | x의 자연로그 값을 반환.(ln x) |
| Math.log2(x) | x의 2를 밑으로 가지는 로그 값을 반환 |
| Math.pow(x,y) | x의 y제곱을 반환 |
| Math.sign(x) | x의 부호 값을 반환 |
| Math.trunc(x) | x의 모든 소수 부분을 삭제하고 정수 부분만을 반환 |
| Math.PI | 원의 원주를 지름으로 나눈 비율(원주율) 값 |

<hr>

## Javascript에서 HTML Element 생성 및 추가

```
const bgImage = document.createElement("img"); //자바스크립트에서 HTML element를 생성

bgImage.src = `img/${chosenImage}`; //img의 src속성 설정

document.body.appendChild(bgImage); // body의 맨 끝에 배치
```

삭제

```
bgImage.remove(); //element 삭제
```

<hr>

## filter()

filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.

true를 반환하면 요소를 유지하고, false를 반환하면 요소를 버립니다.

filter()는 기존의 배열을 변화시키지(mutate) 않고 새로운 배열을 반환합니다.

예제

```
function isFilter(item){
  return item < 40;
}

const items = [10, 20, 50, 30, 40, 60];

const items2 = items.filter(isFilter);

console.log(items2); // [10, 30, 20]
```

arrow 함수로도 가능

```
const items = [10, 30, 50, 20, 40, 60];

const items2 = items.filter((item) => item < 40);

console.log(items2); // [10, 30, 20]
```

## forEach() 와 map()

### 1. map()은 forEach()와 달리 새로운 배열을 반환

forEach()가 배열 요소마다 한 번씩 주어진 함수(콜백)를 실행하는 것과 달리,

map()은 배열 내의 모든 요소 각각에 대하여 주어진 함수(콜백)를 호출한 결과를 모아 새로운 배열을 반환한다는 특징을 가지고 있다.

```
// Example of forEach()

const arr = [1, 2, 3, 4, 5];

const mulArr = [];

arr.forEach((num) => {
  mulArr.push(num * 3);
});

console.log(mulArr); // [3, 6, 9, 12, 15]
```

```
// Example of map()

const arr = [1, 2, 3, 4, 5];

const mulArr = arr.map((num) => num * 3);

console.log(mulArr); // [3, 6, 9, 12, 15]
```

### 2. 리턴값을 보내지 않는 forEach()

forEach()는 함수 밖으로 리턴값을 받지 못한다. 아래의 코드를 살펴보자.

```
let arr = [1, 2, 3, 4, 5];

let a = arr.forEach(function(value){
	return value;
});

console.log(a);   //undefined
```

forEach()는 undefined가 출력된다.

<br>

```
let arr=[1, 2, 3, 4, 5];

let a = arr.map(function(value){
	return value +1;
});

console.log(a);  // [2, 3, 4, 5, 6]
```

map()의 경우에는 [2, 3, 4, 5, 6]이 들어있는 배열이 출력된다.

map은 리턴값을 출력할 수 있다.
<br>
즉, forEach와 map의 가장 큰 차이는 바로 리턴값에 있다.

또한 forEach() 기존의 Ararry를 변경하는 반면, map()은 새로운 Ararry를 반환한다.

성능면에서는 map이 forEach보다 빠르고 유리하다.

상황에 따라 맞게 사용하면 될 것이다.
<br>

<정리>

1. forEach()로 할 수 있는 일은 map()으로 할 수 있으며, 그 반대도 가능하다.

2. map()은 메모리를 할당하고 반환 값을 저장한다.<br>forEach()는 반환 값을 버리고 항상 정의되지 않은 값을 반환한다.

3. forEach()는 콜백 함수가 현재 배열을 변경하도록합니다. map ()은 대신 ​​새 배열을 반환한다.

## geolocation API

사용자의 현재 위치를 지도에 표시하거나 위치 기반 개인화 정보를 제공하는 등, 웹 앱에서 위치 정보를 가져와야 하는 경우가 종종 있습니다.

Geolocation API는 navigator.geolocation을 통해 접근합니다.

이 때, 사용자의 브라우저는 위치 정보 접근 권한을 요청하게 되고, 사용자가 허가할 경우 현재 장치에서 사용 가능한 최선의 방법(GPS, WiFi, ...)을 통해 위치를 알아냅니다.

사용

```javascript
const [coords, setCoords] = useState < UseCoordsState > { latitude: null, longitude: null };

const onSuccess = ({ coords: { latitude, longitude } }: GeolocationPosition) => {
  setCoords({ latitude, longitude });
}; // 허락했을 때 실행 할 콜백 함수

useEffect(() => {
  navigator.geolocation.getCurrentPosition(onSuccess); // 현재 좌표를 알아냄
}, []);
```
