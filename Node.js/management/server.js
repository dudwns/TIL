const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// client가 /api/customers 로 접속하게 되면 json형식의 api(데이터)를 반환한다.
app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/1",
      name: "김영준",
      birsday: "990519",
      gender: "남",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "이주연",
      birsday: "990714",
      gender: "남",
      job: "프로그래머",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "박수빈",
      birsday: "991213",
      gender: "남",
      job: "트레이너",
    },
  ]);
}); //api 명세

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버 실행 여부를 console로 표현
