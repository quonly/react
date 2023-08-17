import { useSelector } from "react-redux"

function Customer() {
  // Read data from redux store that takes a callback function that take as the single argument the entire redux store state
  const customer = useSelector(store => store.customer.fullName)

  return <h2>👋 Welcome, {customer}</h2>
}

export default Customer
