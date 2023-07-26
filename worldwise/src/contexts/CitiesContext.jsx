import { createContext, useContext, useEffect, useReducer } from "react"

const CitiesContext = createContext()
const BASE_URL = "http://localhost:8000/cities/"

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      }
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      }
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      throw new Error("Unknow action type")
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  )

  async function fetchCities(type, url = BASE_URL) {
    dispatch({ type: "loading" })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({ type: type, payload: data })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      })
    }
  }

  useEffect(() => {
    fetchCities("cities/loaded")
  }, [])

  function getCity(id) {
    if (Number(id) === currentCity.id) return
    dispatch({ type: "loading" })
    fetchCities("city/loaded", BASE_URL + id)
  }

  async function createCity(newCity) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    dispatch({ type: "city/created", payload: data })
  }
  async function deleteCity(id) {
    const response = await fetch(BASE_URL + id, {
      method: "DELETE",
    })
    dispatch({ type: "city/deleted", payload: id })
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider")
  }
  return context
}

export { CitiesProvider, useCities }
