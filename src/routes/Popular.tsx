import { useQuery } from "react-query";
import { getPopular, IAPIResponse } from "../api";
import MovieDetail from "../components/MovieDetail";

export default function ComingSoon() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );

  return isLoading ? <div>loading...</div> : <div>Data</div>;
}
