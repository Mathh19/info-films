import { useParams } from "react-router-dom";
import { getTVData } from "../services/get-data";
import { useQuery } from "@tanstack/react-query";

export const Tv = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getTVData(id!),
  });
  console.log(data);

  return <div>tv</div>;
};
