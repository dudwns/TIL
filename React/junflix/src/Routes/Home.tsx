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
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5 }, //window.douterWidth: 브라우저 전체의 너비에서 gap의 값을 더해줌
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1; //내림 처리, Math.ceil()는 올림 처리, page가 0부터 시작하기 때문에 1 감소
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); //index가 maxIndex보다 크면 0으로 되돌림
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/*데이터가 없으면 빈 스트링을 보냄 */}
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")} // 이미지 경로를 설정해 주는 함수를 utils.ts에서 호출
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              {/*onExitComplete: Exit가 끝났을 때 실행되는 함수
              initial={false}: 컴포넌트가 처음 시작될 때 hidden을 시작하지 않음 */}
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index} //key가 변경되면 React.js는 새로운 Row가 만들어졌다고 생각함, 원래 있던 Row는 파괴 됨
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path, "w500")} />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
