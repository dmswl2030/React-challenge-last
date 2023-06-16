import { useQuery } from "@tanstack/react-query";
import {
  getMovie,
  getNowPlaying,
  IAPIResponse,
  makeImagePath,
  makeBgPath,
  IMovieDetail,
} from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiXCircle } from "react-icons/hi";
import { formattedNumber } from "../utils";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 25px;
`;
const MovieList = styled.ul`
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const MovieItem = styled.li``;
const Box = styled(motion.div)<{ bgphoto: string }>`
  width: 200px;
  height: 300px;
  border-radius: 20px;
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  cursor: pointer;
`;
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -10,
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
};
const ItemTitle = styled.h2`
  width: 200px;
  height: 20px;
  margin-top: 15px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const DetailWrap = styled(motion.div)`
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const DetailCover = styled.div`
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 600px;
`;
const DetailTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  margin-top: 30px;
  padding: 20px;
  font-size: 46px;
  font-weight: 700;
  position: relative;
  top: -80px;
`;

const DetailOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
const DetailInfoWrap = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
`;
const DetailInfo = styled.p`
  padding: 5px 0;
  color: ${(props) => props.theme.white.lighter};
`;
const BigXButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default function NowPlaying() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<IMovieDetail | undefined>();
  const [movieId, setMovieId] = useState<string>("");
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "nowplaying"],
    getNowPlaying
  );
  // const { data: movieDetail } = useQuery<IMovieDetail>(["movie", movieId], () =>
  //   getMovie(movieId)
  // );

  const onClickMovie = (movieId: string) => {
    const { data } = useQuery<IMovieDetail>(["movie", movieId], () =>
      getMovie(movieId)
    );
    setMovieDetail(data);
  };

  return (
    <Wrapper>
      <Title>Now Playing Movies</Title>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieList>
            {data?.results.map((movie) => (
              <MovieItem key={movie.id}>
                <AnimatePresence initial={false}>
                  <Box
                    layoutId={movie.id + ""}
                    key={movie.id}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    onClick={() => {
                      setIsClicked(!isClicked);
                      setMovieId(movie.id + "");
                      onClickMovie(movie.id + "");
                    }}
                    transition={{ type: "tween" }}
                    bgphoto={makeImagePath(movie.backdrop_path)}
                  ></Box>
                  <ItemTitle>{movie.title}</ItemTitle>
                </AnimatePresence>
              </MovieItem>
            ))}
          </MovieList>
          <AnimatePresence>
            {isClicked && movieDetail ? (
              <>
                <Overlay
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setIsClicked(!isClicked);
                  }}
                />
                <DetailWrap>
                  <>
                    <DetailCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeBgPath(
                          movieDetail?.backdrop_path!
                        )})`,
                      }}
                    >
                      <BigXButton>
                        <HiXCircle
                          style={{ fontSize: "30px" }}
                          onClick={() => setIsClicked(!isClicked)}
                        ></HiXCircle>
                      </BigXButton>
                    </DetailCover>
                    <DetailTitle>{movieDetail?.title}</DetailTitle>
                    <DetailOverview>{movieDetail?.overview}</DetailOverview>
                    <DetailInfoWrap>
                      <DetailInfo>
                        Budget: ${formattedNumber(Number(movieDetail?.budget))}
                      </DetailInfo>
                      <DetailInfo>
                        Revenue: $
                        {formattedNumber(Number(movieDetail?.revenue))}
                      </DetailInfo>
                      <DetailInfo>
                        Runtime: {movieDetail?.runtime} minutes
                      </DetailInfo>
                      <DetailInfo>
                        Rating: {movieDetail?.vote_average}
                      </DetailInfo>
                      <DetailInfo>Homepage: {movieDetail?.homepage}</DetailInfo>
                    </DetailInfoWrap>
                  </>
                </DetailWrap>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
