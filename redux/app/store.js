import { configureStore } from "@reduxjs/toolkit";
import appSclice from "../freatures/appSclice";

export const store = configureStore({
  reducer: {
    app: appSclice,
  },
});
