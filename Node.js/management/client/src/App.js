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
import CircularProgress from "@mui/material/CircularProgress"; // progress 작성 라이브러리
import Box from "@mui/material/Box";

function App() {
  const [customersDate, setCustomersDate] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    (async () => {
      const customersData = await (await fetch(`/api/customers`)).json();
      setCustomersDate(customersData);
      setIsLoad(false);
    })();
  }, []);

  return (
    <>
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
            {isLoad ? (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <Box>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              customersDate.map((customer) => {
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
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default App;
