import { ConfirmationResult } from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit';

interface AuthStateType {
  user: any;
  // confirmation: ConfirmationResult | null;
  phoneNumber: string | null;
}

const initialState: AuthStateType = {
  user: null,
  // confirmation: null,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setConfirmation: (state, action) => {
    //   state.confirmation = action.payload;
    // },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setPhoneNumber, setUser } = authSlice.actions;
export default authSlice.reducer;
