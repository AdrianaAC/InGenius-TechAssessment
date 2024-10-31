// src/features/coursesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../types';
import { fetchCourses as fetchCoursesAPI } from '../api';

interface CoursesState {
  courses: Course[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CoursesState = {
  courses: [],
  status: 'idle',
};

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetchCoursesAPI();
  return response;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'idle';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default coursesSlice.reducer;
