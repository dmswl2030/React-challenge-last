import { useQuery } from "@tanstack/react-query";
import {
  getMovie,
  getNowPlaying,
  IAPIResponse,
  makeImagePath,
  makeBgPath,
  IMovieDetail,
} from "../api";
import { motion } from "framer-motion";
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

const MovieList = styled(motion.ul)`
  width: 700px;
  display: grid;
  padding: 2rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  justify-content: center;
  align-items: center;
`;
const MovieItem = styled(motion.li)`
  position: relative;
  width: 200px;
  height: 300px;
  font-size: 66px;
  cursor: pointer;
`;
const MovieImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
`;
const MovieTitle = styled.h2`
  width: 100%;
  display: flex;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  overflow: auto;
  top: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};

  /* Hide scrollbar */
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const DetailCover = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background-size: cover;
  background-position: center center;
`;
const DetailTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  margin-top: 30px;
  padding: 20px;
  font-size: 46px;
  font-weight: 700;
  position: relative;
`;
const DetailOverview = styled.p`
  padding: 20px;
  font-size: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;
const DetailInfoWrap = styled.div`
  height: 200px;
  padding: 20px;
  font-size: 20px;
  position: relative;
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

const movieListVariants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};
const movieItemVariants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
  },
};

export default function NowPlaying() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<string>("");
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "nowplaying"],
    getNowPlaying
  );
  const { data: movieDetail, isLoading: detailLoading } =
    useQuery<IMovieDetail>(["movie", movieId], () => getMovie(movieId), {
      enabled: movieId !== "",
    });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieList variants={movieListVariants} initial="start" animate="end">
            {data?.results.map((movie) => (
              <MovieItem
                layoutId={movie.id + ""}
                key={movie.id}
                variants={movieItemVariants}
                whileHover={{
                  y: -10,
                }}
                onClick={() => {
                  setIsClicked(!isClicked);
                  setMovieId(movie.id + "");
                }}
              >
                <MovieImage src={makeImagePath(movie.poster_path)} />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieItem>
            ))}
          </MovieList>
          {isClicked ? (
            <>
              <Overlay
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
              />
              <DetailWrap layoutId={movieDetail?.id + ""}>
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
                      Budget: {formattedNumber(Number(movieDetail?.budget))}
                    </DetailInfo>
                    <DetailInfo>
                      Revenue:
                      {formattedNumber(Number(movieDetail?.revenue))}
                    </DetailInfo>
                    <DetailInfo>
                      Runtime: {movieDetail?.runtime} minutes
                    </DetailInfo>
                    <DetailInfo>
                      Rating: {movieDetail?.vote_average.toFixed(1)}
                    </DetailInfo>
                    <DetailInfo>Homepage: {movieDetail?.homepage}</DetailInfo>
                  </DetailInfoWrap>
                </>
              </DetailWrap>
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
