import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthticated: false,
}

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthticated: true,
      }
    case "logout":
      return {
        ...state,
        user: null,
        isAuthticated: false,
      }
    default:
      throw new Error("Unknow action")
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
}

function AuthProvider({ children }) {
  const [{ user, isAuthticated }, dispatch] = useReducer(reducer, initialState)

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      })
    }
  }

  function logout() {
    dispatch({ type: "logout" })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider")
  return context
}

export { AuthProvider, useAuth }
