// src/features/currentCourseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Lesson } from "../types";

interface CurrentCourseState {
  selectedCourse: Course | null;
  selectedModuleIndex: number | null;
  selectedLessonIndex: number | null;
}

const initialState: CurrentCourseState = {
  selectedCourse: null,
  selectedModuleIndex: null,
  selectedLessonIndex: null,
};

const currentCourseSlice = createSlice({
  name: "currentCourse",
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<Course>) => {
      state.selectedCourse = action.payload;
    },
    setSelectedModule: (state, action: PayloadAction<number>) => {
      state.selectedModuleIndex = action.payload;
    },
    setSelectedLesson: (state, action: PayloadAction<number>) => {
      state.selectedLessonIndex = action.payload;
    },
  },
});

export const { setSelectedCourse, setSelectedModule, setSelectedLesson } =
  currentCourseSlice.actions;
export default currentCourseSlice.reducer;
