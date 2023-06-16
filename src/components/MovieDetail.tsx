import { useQuery } from "react-query";
import { useParams, useNavigate, useMatch, PathMatch } from "react-router-dom";
import { getMovie, IMovieDetail, IAPIResponse } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiXCircle } from "react-icons/hi";
import styled from "styled-components";

interface IProps {
  data: IAPIResponse;
}

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
const BigCover = styled.div`
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 600px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  margin-top: 30px;
  padding: 20px;
  font-size: 46px;
  font-weight: 700;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
const BigXButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default function MovieDetail({ data }: IProps) {
  const [movieId, setMovieId] = useState<string>("");
  const { data: movieDetailData, isLoading } = useQuery<IMovieDetail>(
    ["movie", movieId],
    () => getMovie(movieId)
  );

  return (
    <div>디테일 화면!!!!!!!!</div>
    // <AnimatePresence>

    //   {bigMovieMatch ? (
    //     <>
    //       <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
    //       <BigMovie layoutId={bigMovieMatch.params.id}>
    //         {clickedMovie && (
    //           <>
    //             <BigCover
    //               style={{
    //                 backgroundImage: `linear-gradient(to top, black, transparent), url(${makeBgPath(
    //                   clickedMovie.backdrop_path
    //                 )})`,
    //               }}
    //             >
    //               <BigXButton>
    //                 <HiXCircle
    //                   style={{ fontSize: "30px" }}
    //                   onClick={onOverlayClick}
    //                 ></HiXCircle>
    //               </BigXButton>
    //             </BigCover>
    //             <BigTitle>{clickedMovie.title}</BigTitle>
    //             <BigOverview>{clickedMovie.overview}</BigOverview>
    //           </>
    //         )}
    //       </BigMovie>
    //     </>
    //   ) : null}
    // </AnimatePresence>
  );
}
