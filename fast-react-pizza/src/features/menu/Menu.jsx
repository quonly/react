import { useLoaderData } from "react-router-dom"
import { getMenu } from "../../services/apiRestaurant"
import MenuItem from "./MenuItem"

function Menu() {
  const menu = useLoaderData() // data comes from loader function. useEffect = fetch on render and loader = render as you fetch

  return (
    <ul>
      {menu.map(pizza => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}

export async function loader() {
  // fetch the data and then return it
  const menu = await getMenu()
  return menu
}

export default Menu
