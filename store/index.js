// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
// import cart from "./cartSlice";
// const reducers = combineReducers({ cart });

// const config = {
//   key: "root",
//   storage,
// };

// const reducer = persistReducer(config, reducers);

// const store = configureStore({
//   reducer: reducer,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: [thunk],
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./cartSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  cart: CartReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: {
    cart: persistedReducer
  }
})

export default store; 