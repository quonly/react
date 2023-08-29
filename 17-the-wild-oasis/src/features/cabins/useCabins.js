import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"], // unique key for this query used for caching and refetching and also for calling with useQueryClient
    queryFn: getCabins, // should be return promise
  })
  return { isLoading, cabins }
}
