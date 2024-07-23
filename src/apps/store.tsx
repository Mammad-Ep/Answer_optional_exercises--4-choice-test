import { configureStore } from "@reduxjs/toolkit";
import SliderSlice from "./services/SliderSlice";
import CartApi from "./services/CartApi";
// ___________________________________________________________

const store = configureStore({

  reducer: {
    SliderSlice: SliderSlice,
    [CartApi.reducerPath]:CartApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CartApi.middleware)
})


export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;

export default store;