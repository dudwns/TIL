const images = ["0.jpg", "1.jpg", "2.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); //자바스크립트에서 HTML element를 생성

bgImage.src = `img/${chosenImage}`; //img의 src속성 설정

document.body.appendChild(bgImage); // body의 맨 끝에 배치
