import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constant"

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  // filter
  const filterValue = searchParams.get("status")
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue }
  // { field: "totalPrice", value: 5000,method: 'gte' }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
  const [field, direction] = sortByRaw.split("-")
  const sortBy = { field, direction }

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // unique key for this query used for caching and refetching and also for calling with useQueryClient
    queryFn: () => getBookings({ filter, sortBy, page }), // should be return promise
  })

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })

  return { isLoading, error, bookings, count }
}
