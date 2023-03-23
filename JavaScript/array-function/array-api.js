// join: 배열의 모든 원소를 구분자를 넣어서 string으로 반환
const fruits = ["apple", "banana", "orange"];
const result1 = fruits.join(",");
console.log(result1);

// split: 주어진 String을 배열로 반환
const fruitsStr = "사과, 키위, 바나나, 체리";
const result2 = fruitsStr.split(",", 2); //구분자는 필수, limit(앞에 2개만 가능)
console.log(result2);

// reverse: 주어진 배열의 순서를 거꾸로
const array = [1, 2, 3, 4, 5];
const result3 = array.reverse();
console.log(result3);
console.log(array); //원본 자체가 바뀜

// 제외하고 싶은 인자를 제외한 새로운 배열을 리턴
const array2 = [1, 2, 3, 4, 5];
// const result4 = array2.splice(0, 2); //원본 자체에서 인자를 삭제하고, 삭제한 인자를 배열로 리턴 (시작 인덱스, 개수)
// const result4 = array2.splice(2, 0, 1, 2) index가 2인 자리에 원소 추가 가능 [1, 2, 1, 2, 3, 4, 5]
const result4 = array2.slice(2, 5); // 인자를 복제해서 새로운 배열을 리턴 (시작 인덱스, 종료 인덱스 - 1) [3, 4, 5]
console.log(result4);
console.log(array2);

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student("A", 29, true, 45),
  new Student("A", 28, false, 80),
  new Student("A", 30, true, 90),
  new Student("A", 40, false, 66),
  new Student("A", 18, true, 88),
];

// 5. 학생의 점수가 90점인 학생을 찾기
// find: 조건에 만족하는 첫번째 요소만 리턴
// const result5 = students.filter((student) => student.score === 90);
// console.log(result5);
const result5 = students.find((student) => student.score === 90);
console.log(result5);

// 6. 등록되어 있는 학생들을 찾기
// filter: 조건에 만족하는 모든 요소를 새로운 배열로 리턴
const result6 = students.filter((student) => student.enrolled);
console.log(result6);

// 7. 점수만 들어있는 배열을 리턴
// map: 배열 안에 들어있는 요소 하나하나를 다른 값으로 매핑
const result7 = students.map((student) => student.score);
console.log(result7);

// 8. 학생들의 점수가 50점보다 작은 학생이 있는지 없는지 확인
// some: 조건을 만족하는 요소가 하나라도 있으면 true, 아예 없으면 false를 리턴
const result8 = students.some((student) => student.score < 50);
console.log(result8);

// 9. 모든 학생들의 점수가 50점보다 낮은지 확인
// every: 조건을 모두 만족하면 true, 아니면 false를 리턴
const result9 = students.every((student) => student.score < 50);
console.log(result9);

// 10. 학생들의 평균 점수를 구하라
// reduce: 배열 하나하나를 돌면서 값을 누적 current -> previous
const result10 = students.reduce((prev, curr) => prev + curr.score, 0);
console.log(result10 / students.length);

// 11. 학생들의 점수가 50점 이상인 점수만 string으로 변환
const result11 = students
  .map((student) => student.score)
  .filter((score) => score >= 50)
  .join(",");
console.log(result11);

// 12. 학생들의 점수를 정렬해서 string으로 변환
// sort: -값을 리턴하게 되면 a가 b보다 작다고 판단하여 배열의 원소를 정렬 (원본 자체가 바뀜)
// compareFunction이 생략되면 유니 코드 코드 포인트 값에 따라 정렬됨
const result12 = students
  .map((student) => student.score)
  .sort((a, b) => a - b)
  .join();
console.log(result12);
