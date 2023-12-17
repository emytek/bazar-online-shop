import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
  },
});

//export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
