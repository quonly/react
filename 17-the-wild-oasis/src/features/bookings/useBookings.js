import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"], // unique key for this query used for caching and refetching and also for calling with useQueryClient
    queryFn: getBookings, // should be return promise
  })
  return { isLoading, error, bookings }
}
