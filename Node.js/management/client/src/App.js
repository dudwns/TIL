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
import CustomerAdd from "./components/CustomerAdd";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-color: #2f2f2f;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  & h1 {
    color: whitesmoke;
    text-align: center;
    padding-top: 30px;
  }
`;

function App() {
  const [customersData, setCustomersData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const stateRefresh = () => {
    setCustomersData("");
    setIsLoad(true);

    (async () => {
      const data = await (await fetch(`/api/customers`)).json();
      setCustomersData(data);
      setIsLoad(false);
    })();
  };

  useEffect(() => {
    (async () => {
      const data = await (await fetch(`/api/customers`)).json();
      setCustomersData(data);
      setIsLoad(false);
    })();
  }, []);

  return (
    <Container>
      <h1>고객 리스트</h1>
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
              <TableCell>설정</TableCell>
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
              customersData.map((customer) => {
                return (
                  <Customer
                    stateRefresh={stateRefresh}
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
      <CustomerAdd stateRefresh={stateRefresh} />
    </Container>
  );
}

export default App;
