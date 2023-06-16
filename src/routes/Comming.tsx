import { useQuery } from "react-query";
import { getComingSoon, IAPIResponse } from "../api";
import MovieDetail from "../components/MovieDetail";

export default function ComingSoon() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "comingSoon"],
    getComingSoon
  );

  return isLoading ? <div>loading...</div> : <div>Data</div>;
}
