const images = ["0", "1", "2"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); //자바스크립트에서 HTML element를 생성

bgImage.src = `img/${chosenImage}.jpg`; //img의 src속성 설정

bgImage.id = "bgImage";

document.body.appendChild(bgImage); // body의 맨 끝에 배치

let img = parseInt(chosenImage);

function imageChange() {
  if (img >= 2) {
    img = 0;
  } else {
    img = img + 1;
  }
  bgImage.src = `img/${img}.jpg`;
}

setInterval(imageChange, 10000);
