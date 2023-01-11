const clock = document.querySelector("h2#clock"); //h2태그중 id가 clock인 element

function getClock() {
  const date = new Date(); //Date 객체 생성
  const hours = String(date.getHours()).padStart(2, "0"); //이 string은 2글자가 되어야하고 2글자가 아니면 앞에 0을 붙임
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`; //시, 분, 초를 나타냄
}

getClock();
setInterval(getClock, 1000); //1초마다 함수를 실행
