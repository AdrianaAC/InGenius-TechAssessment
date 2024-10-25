// src/features/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  searchQuery: string;
}

const initialState: UIState = {
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
