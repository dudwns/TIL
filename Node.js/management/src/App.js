import "./App.css";
import Customer from "./components/Customer";
import Paper from "@mui/material/Paper"; //외부를 감싸기 위해 사용하는 컴포넌트
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/material"; //css를 작성할 수 있도록 하는 라이브러리

const customers = [
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
];

function App() {
  return (
    <Paper id="paper">
      <Table id="container">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => {
            return (
              <Customer
                key={customer.id}
                id={customer.id}
                image={customer.image}
                name={customer.name}
                birthday={customer.birsday}
                gender={customer.gender}
                job={customer.job}
              />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
