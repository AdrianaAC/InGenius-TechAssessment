// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./redux/coursesSlice";
import currentCourseReducer from "./redux/currentCourseSlice";
import uiReducer from "./redux/uiSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    currentCourse: currentCourseReducer,
    ui: uiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
