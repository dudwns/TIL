const fs = require("fs"); //파일에 접근할 수 있는 라이브러리를 불러옴
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json"); //datatase.json 파일을 읽어옴
const conf = JSON.parse(data); //JSON 형식으로 변경
const mysql = require("mysql"); //mysql 라이브러리를 불러옴

//연결 설정
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect(); //실제로 연결 실행

// api/customers에 접속하면 쿼리문을 보냄, 그 결과를 사용자에게 보냄
app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
}); //api 명세

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버 실행 여부를 console로 표현
