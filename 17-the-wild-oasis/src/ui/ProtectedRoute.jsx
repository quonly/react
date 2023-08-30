import { styled } from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedRoute({ children }) {
  const navigate = useNavigate() // this function can call inside other function such as useeffect or useCallback
  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser()
  // 2. if there is no authenticated user, redirect to login page
  useEffect(() => {
    if (!isAuthenticated) navigate("/login")
  }, [isAuthenticated, navigate, isLoading])

  // 3. Show loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // 4. if there is a user, render the app
  if (isAuthenticated) return children
}

export default ProtectedRoute
