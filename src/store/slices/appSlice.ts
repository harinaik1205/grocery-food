import { createSlice } from '@reduxjs/toolkit';

type VerticalStateType = 'grocery' | 'restaurant';

interface AppState {
  currentVertical: VerticalStateType;
}

const initialState: AppState = {
  currentVertical: 'grocery',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentVertical: (state, action) => {
      state.currentVertical = action.payload;
    },
  },
});

export const { setCurrentVertical } = appSlice.actions;
export default appSlice.reducer;
