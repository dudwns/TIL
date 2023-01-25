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
import Header from "./components/Header";
import { useRecoilState } from "recoil";
import { isKeyword } from "./atom";

const Container = styled.div`
  height: 100vh;
  background-color: whitesmoke;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 63px;
  padding-top: 70px;
  margin-bottom: 300px;
`;

function App() {
  const [customersData, setCustomersData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
  const [searchKeyword, setSearchKeyword] = useRecoilState(isKeyword);

  const stateRefresh = () => {
    setCustomersData("");
    setIsLoad(true);
    setSearchKeyword("");

    (async () => {
      const data = await (await fetch(`/api/customers`)).json();
      setCustomersData(data);
      setIsLoad(false);
    })();
  };

  const filteredComponents = (data) => {
    const newData = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return newData.map((c) => {
      return (
        <Customer
          stateRefresh={stateRefresh}
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birsday}
          gender={c.gender}
          job={c.job}
        />
      );
    });
  };

  useEffect(() => {
    (async () => {
      const data = await (await fetch(`/api/customers`)).json();
      setCustomersData(data);
      setIsLoad(false);
    })();
  }, []);

  return (
    <>
      <Header />
      <Container id="container">
        <CustomerAdd stateRefresh={stateRefresh} />
        <Paper id="paper">
          <Table id="container">
            <TableHead id="tableHead">
              <TableRow>
                {cellList.map((c, index) => (
                  <TableCell key={index}>{c}</TableCell>
                ))}
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
                filteredComponents(customersData)
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

export default App;
