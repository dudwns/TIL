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

const multer = require("multer"); //multer 라이브러리를 불러옴
const upload = multer({ dest: "./upload" }); //upload 폴더를 사용자의 파일이 업로드 되는 공간으로 설정

// api/customers에 접속하면 쿼리문을 보냄, 그 결과를 사용자에게 보냄
app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER WHERE isDeleted = 0", (err, rows, fields) => {
    res.send(rows);
  });
}); //api 명세

app.use("/image", express.static("./upload")); // upload 폴더를 공유, 사용자가 image 폴더로 접근하면 실질적으로는 upload 폴더와 매핑됨

//post 메소드로 "/api/customers"에 접속을 한 경우 (insert)
app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?,now(), 0)";
  let name = req.body.name;
  let image = "/image/" + req.file.filename;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    // console.log(err); 오류가 나면 디버깅하는 방법
    // console.log(rows);
  });
});

//delete 메소드로 "/api/customers"에 접속을 한 경우 (delete)
app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버 실행 여부를 console로 표현
