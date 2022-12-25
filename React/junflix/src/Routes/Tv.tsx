import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvDetail, getTvs, IGetTvsResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion"; //AnimatePresence: render 되거나 destroy 될 때 효과를 줄 수 있음
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom"; //라우터 버전 5에서는 useNavigate -> useHistory

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 150px;
`;

const Loader = styled.div`
  height: 20vh;
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
  font-size: 38px;
  margin-bottom: 20px;
  font-weight: 800;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 30%;
  font-weight: 800;
`;

const BtnList = styled.div`
  display: flex;
  width: 370px;
  justify-content: space-between;
  margin-top: 20px;
`;

const PlayBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 10px;
  font-size: 25px;
  border: none;
  cursor: pointer;
  svg {
    width: 26px;
    height: 26px;
    border-radius: 13px;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid black;
  }
`;

const MoreInfo = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 60px;
  background-color: rgba(256, 256, 256, 0.3);
  border-radius: 10px;
  font-size: 25px;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.white.lighter};
  svg {
    width: 26px;
    height: 26px;
    border-radius: 13px;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid ${(props) => props.theme.white.lighter};
    fill: ${(props) => props.theme.white.lighter};
  }
`;

const PrevBtn = styled.button`
  position: absolute;
  top: 105px;
  left: 10px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  fill: ${(props) => props.theme.white.lighter};
  opacity: 0;
  transition: opacity 0.5s linear;
`;

const NextBtn = styled.button`
  position: absolute;
  top: 105px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  fill: ${(props) => props.theme.white.lighter};
  opacity: 0;
  transition: opacity 0.5s linear;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
  &:hover {
    ${PrevBtn}, ${NextBtn} {
      opacity: 1;
    }
  }
`;

const PopularText = styled.h3`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-left: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;

  @media only screen and (max-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled(motion.div)<{ boxphoto: string }>`
  background-color: ${(props) => props.theme.black.darker};
  background-image: url(${(props) => props.boxphoto});
  background-size: cover;
  background-position: center center;
  height: 180px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const ErrorImg = styled.div`
  font-size: 18px;
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 20px;
  color: ${(props) => props.theme.white.lighter};
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 950px;
  height: 700px;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  display: flex;
  overflow: scroll;

  @media only screen and (max-width: 1000px) {
    width: 600px;
  }
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigPoster = styled.div`
  width: 260px;
  height: 370px;
  background-size: cover;
  position: absolute;
  top: 280px;
  left: 50px;

  @media only screen and (max-width: 1000px) {
    width: 160px;
    height: 270px;
    left: 20px;
    top: 60px;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  height: 100%;
  position: absolute;
  top: 300px;
  left: 330px;
  font-size: 38px;
  font-weight: 600;

  @media only screen and (max-width: 1000px) {
    top: 300px;
    left: 200px;
    font-size: 26px;
  }
`;

const BigInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  position: absolute;
  top: 420px;
  left: 310px;

  @media only screen and (max-width: 1000px) {
    left: 5px;
    top: 420px;
  }
`;

const BigList = styled.ul`
  display: flex;
`;

const BigItem = styled.li`
  padding: 0 20px;
  margin-bottom: 20px;
  border-right: 1px solid gray;
  color: ${(props) => props.theme.white.lighter};

  &:last-child {
    border: none;
  }
`;

const BigIntro = styled.div`
  margin: 0 20px;
  margin-bottom: 10px;
  border-left: 3px solid white;
  font-size: 14px;
  padding-left: 10px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigOverview = styled.p`
  padding: 0 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 14px;
`;

const rowVariants = {
  hidden: ({ back }: ICustomProps) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }), //window.douterWidth: 브라우저 전체의 너비에서 gap의 값을 더해줌
  visible: { x: 0 },
  exit: ({ back }: ICustomProps) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

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

interface ICustomProps {
  back: boolean;
}

interface IDetailProps {
  id: number;
  name: string;
}

interface IDetail {
  vote_average: number;
  genres: IDetailProps[];
  poster_path: string;
  first_air_date: string;
  languages: string;
}

const offset = 6;

function Tv() {
  const navigate = useNavigate(); //url을 이동할 수 있음
  const bigTvMatch = useMatch("/tv/:tvId");
  const { data, isLoading } = useQuery<IGetTvsResult>(["tv", "popularTv"], getTvs);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1; //내림 처리, Math.ceil()는 올림 처리, page가 0부터 시작하기 때문에 1 감소
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1)); //index가 maxIndex보다 크면 0으로 되돌림
    }
  };
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving(); //한번씩 클릭만 가능하게 설정
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1; //내림 처리, Math.ceil()는 올림 처리, page가 0부터 시작하기 때문에 1 감소
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); //index가 maxIndex보다 크면 0으로 되돌림
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number | undefined) => {
    navigate(`/tv/${movieId}`); //url을 바꿔줌
  };
  const onOverlayClick = () => {
    navigate(-1);
  };
  const clickedTv =
    bigTvMatch?.params.tvId && data?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvId); //선택된 영화의 API를 URL의 movieId로 찾음

  const { data: detail, isLoading: detailLoading } = useQuery<IDetail>(
    ["detail", bigTvMatch?.params.tvId],
    () => getTvDetail(bigTvMatch?.params.tvId)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/*데이터가 없으면 빈 스트링을 보냄 */}
          <Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")} // 이미지 경로를 설정해 주는 함수를 utils.ts에서 호출
          >
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
            <BtnList>
              <PlayBtn>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
                재생
              </PlayBtn>
              <MoreInfo onClick={() => onBoxClicked(data?.results[0].id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
                  <path d="M144 80c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                </svg>
                상세 정보
              </MoreInfo>
            </BtnList>
          </Banner>
          <Slider>
            <PopularText>POPULAR TV SHOWS</PopularText>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              {/*onExitComplete: Exit가 끝났을 때 실행되는 함수
              initial={false}: 컴포넌트가 처음 시작될 때 hidden을 시작하지 않음 */}
              <Row
                custom={{ back }}
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
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      boxphoto={makeImagePath(tv.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(tv.id)}
                    >
                      {tv.backdrop_path ? null : (
                        <ErrorImg>
                          Sorry,
                          <br /> No images are currently
                          <br /> available.
                        </ErrorImg>
                      )}
                      <Info variants={infoVariants}>
                        <h4>{tv.name ? tv.name : tv.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <PrevBtn onClick={decreaseIndex}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </PrevBtn>
            <NextBtn onClick={increaseIndex}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </NextBtn>
          </Slider>

          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <BigMovie layoutId={bigTvMatch.params.tvId}>
                  {clickedTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      >
                        <BigTitle>{clickedTv.title ? clickedTv.title : clickedTv.name}</BigTitle>
                      </BigCover>
                      <BigPoster
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            detail?.poster_path,
                            "w500"
                          )})`,
                        }}
                      ></BigPoster>
                      <BigInfo>
                        <BigList>
                          <BigItem>
                            {detail?.first_air_date ? detail?.first_air_date : "정보 없음"}
                          </BigItem>
                          <BigItem>{detail?.genres.map((data) => `${data.name}, `)}</BigItem>
                          <BigItem>
                            평점: {detail?.vote_average ? detail.vote_average : "정보 없음"}
                          </BigItem>
                          <BigItem>
                            언어: {detail?.languages ? detail.languages : "정보 없음"}
                          </BigItem>
                        </BigList>
                        <BigOverview>
                          {clickedTv.overview ? clickedTv.overview : "정보 없음"}
                        </BigOverview>
                      </BigInfo>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
