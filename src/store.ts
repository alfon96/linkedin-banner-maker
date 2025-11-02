import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./inputSlice";
import fontReducer from "./fontSlice";

export const store = configureStore({
  reducer: { input: inputReducer, fonts: fontReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
