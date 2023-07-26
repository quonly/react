import { useState, useEffect } from "react"

const KEY = "968667e1"

export function useMovies(query) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState("")

  useEffect(
    function () {
      // callback?.()
      
      const controller = new AbortController() // browser API

      async function fetchMovies() {
        try {
          setIsloading(true)
          setError("")
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          )

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies")

          const data = await res.json()
          if (data.Response === "False") throw new Error("Movies not found")
          setMovies(data.Search)
          setError("")
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message)
            setError(err.message)
          }
        } finally {
          setIsloading(false)
        }
      }
      if (query.length < 3) {
        setMovies([])
        setError("")
        return
      }
      // handleCloseMovie()
      fetchMovies()

      return () => controller.abort()
    },
    [query]
  )
    return { movies, isLoading, error } 
}