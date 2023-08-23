import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

// Create a Redux store holding the state of your app.
const store = configureStore({
  reducer: {
    // Register the reducer here.
    user: userReducer,
    cart: cartReducer,
  },
});

// Export the store globally so that we can access it in our components whenever we want. In the top level component (main.jsx), we will use the Provider component from react-redux to make the store available to all components.
export default store;
