import { useQuery } from "@tanstack/react-query";
import {
  getMovie,
  getPopular,
  IAPIResponse,
  makeImagePath,
  IMovieDetail,
} from "../api";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import MovieDetail from "../components/MovieDetail";

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

export default function Popular() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<string>("");
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
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
              <MovieDetail
                data={movieDetail}
                setIsClicked={setIsClicked}
                isClicked={isClicked}
              />
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
