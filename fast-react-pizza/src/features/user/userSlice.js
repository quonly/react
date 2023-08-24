import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
// thunk is a middleware that sits between the dispatching and the reducer it self
// using redux/toolkit way of creating a Thunk function.
export const fetchAddress = createAsyncThunk(
  // 1. pending 2. fullfilled 3. rejected
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    console.log(positionObj);
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address }; // Payload of the FULFILLED state
  },
);

// We define the initial state of the user slice
const initialState = {
  username: 'unknow',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

// We create a user slice with a reducer to update the user's name
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = "There was a problem getting your address. Make sure to fill this field";
      });
  },
});

// We export the reducer and the action creator
export const { updateName } = userSlice.actions;

// We export the reducer to be included in the store
export default userSlice.reducer;
