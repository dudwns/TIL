import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion"; //AnimatePresence: render 되거나 destroy 될 때 효과를 줄 수 있음
import { useState } from "react";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  //상단을 투명하게, 하단을 불투명하게
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);

  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
`;

const rowVariants = {
  hidden: { x: 2000 },
  visible: { x: 0 },
  exit: { x: -2000 },
};

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex((prev) => prev + 1);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/*데이터가 없으면 빈 스트링을 보냄 */}
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index} //key가 변경되면 React.js는 새로운 Row가 만들어졌다고 생각함, 원래 있던 Row는 파괴 됨
              >
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
