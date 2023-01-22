import "./App.css";
import Customer from "./components/Customer";
import Paper from "@mui/material/Paper"; //외부를 감싸기 위해 사용하는 컴포넌트
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/material"; //css를 작성할 수 있도록 하는 라이브러리
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [customersDate, setCustomersDate] = useState([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const customersData = await (await fetch(`/api/customers`)).json();
      setCustomersDate(customersData);
    })();
  }, []);

  return (
    <>
      <Stack spacing={2} direction="row">
        <CircularProgress variant="determinate" value={25} />
        <CircularProgress variant="determinate" value={50} />
        <CircularProgress variant="determinate" value={75} />
        <CircularProgress variant="determinate" value={100} />
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
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
            {customersDate
              ? customersDate.map((customer) => {
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
                })
              : ""}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default App;
