import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as CreateOrderAction,
} from './features/order/CreateOrder';
// import CreateUser from "./features/user/CreateUser"
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import { action as updateOrderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter([
  {
    element: <AppLayout />, // with out path we call its layout route
    errorElement: <Error />,
    children: [
      // accept another array of route
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        // 1 create loader
        // 2 provide loader function
        loader: menuLoader,
        // 3 provide data to the page
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
