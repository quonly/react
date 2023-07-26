import Sidebar from "../components/Sidebar"
import Map from "../components/Map"
import styles from "./AppLayout.module.css"
import { useAuth } from "../contexts/FakeAuthContext"
import User from "../components/User"

function AppLayout() {
  const { isAuthticated } = useAuth()
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthticated && <User />}
    </div>
  )
}

export default AppLayout
