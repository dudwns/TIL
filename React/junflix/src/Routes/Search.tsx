import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import { getSearch, IGetSearch } from "../api";
import { makeImagePath } from "../utils";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  justify-items: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
  margin-top: 5%;
  padding: 30px;
`;

const Box = styled(motion.div)<{ boxphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.boxphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  width: 300px;
  font-size: 66px;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

function Search() {
  const location = useLocation(); //useLocation(): 지금 있는 곳에 관한 정보를 얻을 수 있음
  const keyword: string = new URLSearchParams(location.search).get("keyword") || ""; //URL에서 특정 쿼리 문자열을 가져오거나 수정할 때 사용한다.
  console.log(keyword);
  const { data, isLoading } = useQuery<IGetSearch>(["movies", "nowPlaying"], () =>
    getSearch(keyword)
  );

  return (
    <Container>
      {isLoading
        ? "Loading..."
        : data?.results.map((data) => (
            <Box
              layoutId={data.id + ""}
              key={data.id}
              boxphoto={makeImagePath(data.backdrop_path, "w500")}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
            >
              <Info variants={infoVariants}>
                <h4>{data.name}</h4>
              </Info>
            </Box>
          ))}
    </Container>
  );
}
export default Search;
