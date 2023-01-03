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
즉, 문자열 값이 오길 기대하는 곳에 숫자가 오더라도 자바스크립트는 알아서 숫자를 문자열로 변환하여 사용한다

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

Number(): number로 변환<br>
parseInt(): 정수로 변환<br>
parseFloat(): 소수로 변환<br>
String(): string으로 변환<br>
.toString(): string으로 변환<br>
Boolean(): boolean으로 변환<br>
Object(): object로 변환<br>

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
