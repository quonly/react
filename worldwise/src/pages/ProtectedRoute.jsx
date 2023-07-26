import { useEffect } from "react"
import { useAuth } from "../contexts/FakeAuthContext"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { isAuthticated } = useAuth()
  const navigate = useNavigate()

  useEffect(
    function () {
      if (!isAuthticated) navigate("/")
    },
    [isAuthticated, navigate]
  )

  return children
}

export default ProtectedRoute
