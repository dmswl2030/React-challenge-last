import { motion } from "framer-motion";
import { HiXCircle } from "react-icons/hi";
import { formattedNumber } from "../utils";
import styled from "styled-components";
import { IMovieDetail, makeBgPath } from "../api";

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

interface MovieDetailProps {
  data: IMovieDetail | undefined;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>; //상태를 업데이트하고 컴포넌트를 다시 렌더링하기 위해서 사용함
}

const MovieDetail = ({ data, isClicked, setIsClicked }: MovieDetailProps) => {
  return (
    <>
      <Overlay
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsClicked(!isClicked)}
      />
      <DetailWrap layoutId={data?.id + ""}>
        <>
          <DetailCover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeBgPath(
                data?.backdrop_path!
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
          <DetailTitle>{data?.title}</DetailTitle>
          <DetailOverview>{data?.overview}</DetailOverview>
          <DetailInfoWrap>
            <DetailInfo>
              Budget: {formattedNumber(Number(data?.budget))}
            </DetailInfo>
            <DetailInfo>
              Revenue: {formattedNumber(Number(data?.revenue))}
            </DetailInfo>
            <DetailInfo>Runtime: {data?.runtime} minutes</DetailInfo>
            <DetailInfo>Rating: {data?.vote_average.toFixed(1)}</DetailInfo>
            <DetailInfo>Homepage: {data?.homepage}</DetailInfo>
          </DetailInfoWrap>
        </>
      </DetailWrap>
    </>
  );
};

export default MovieDetail;
