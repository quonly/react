import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Home from "./ui/Home"
import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import CreateUser from "./features/user/CreateUser"
import Order from "./features/order/Order"
import AppLayout from "./ui/AppLayout"

const router = createBrowserRouter([
  {
    element: <AppLayout />, // with out path we call its layout route
    children: [
      // accept another array of route
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // 1 create loader
        // 2 provide loader function
        loader: menuLoader,
        // 3 provide data to the page
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
