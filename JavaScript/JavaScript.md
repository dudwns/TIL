# 자바스크립트란?

<p>자바스크립트는 ‘웹페이지에 생동감을 불어넣기 위해’ 만들어진 프로그래밍 언어입니다.</p>
<p>자바스크립트로 작성한 프로그램을 스크립트(script) 라고 부릅니다. 스크립트는 웹페이지의 HTML 안에 작성할 수 있는데, 웹페이지를 불러올 때 스크립트가 자동으로 실행됩니다.</p>

 <hr>
## 자바스크립트의 타입
 <strong>number:</strong> 숫자형 타입<br>
 <strong>string:</strong> 문자형 타입<br>
<strong>boolean:</strong> true 아니면 false<br>
<strong>null:</strong> 값이 아무것도 없다는 것을 표현<br>
<strong>undefined:</strong> 값이 존재하지 않음(변수에 값을 부여하지 않은 상태)
<hr/>

## 선언자

<h3>Var</h3>
const와 let이 나오기 전에 주로 사용하던 선언자로 재선언과 재할당이 가능하다.<br>
```
var a = 1;
var a= 2;  //재선언 가능
a = 3;  //재할당 가능
 ```
<h3>const</h3>
값이 변하지 않는 상수를 선언할 때 사용하는 선언자<br>
```
const a = 1;
const a= 2;  //재선언 금지 
a = 3;  //재할당 금지
 ```
<h3>let</h3>
값이 바뀔 수 있는 변수를 선언할 때 사용하는 선언자<br>
```
let a = 1;
let a= 2;  //재선언 금지 
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
배열에 원소를 추가하는 방법
```
week.push("sun"); // 마지막에 원소 추가
```
<br>
배열의 원소를 가져오는 방법
```
console.log(week[4]); //fri 출력, 그 이유는 컴퓨터는 숫자를 0부터 세기 때문이다.
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
## function
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
console.log(a + b);
}; //2개의 인자를 가지는 함수 생성

calculator(2, 1); //a에 2, b에 1을 전달

```
<hr>
```
