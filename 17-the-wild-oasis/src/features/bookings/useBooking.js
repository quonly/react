// import { useQuery } from "@tanstack/react-query"
// import { getBooking } from "../../services/apiBookings"
// import { useParams } from "react-router-dom"

// export function useBooking() {
//   const { bookingId } = useParams()
//   console.log(bookingId)
//   const { isLoading, data: booking } = useQuery({
//     queryKey: ["booking", bookingId], // unique key for this query used for caching and refetching and also for calling with useQueryClient
//     queryFn: () => getBooking(bookingId), // should be return promise
//     retry: false,
//   })
//   console.log("booking", booking)
//   console.log("isloading", isLoading)
//   return { isLoading, booking }
// }

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}
