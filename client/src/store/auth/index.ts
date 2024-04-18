import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  id: string | null;
  email: string | null;
  admin: boolean | null;
  token: string | null;
  user: {
    id: string | null;
    first_name: string | null;
    last_name: string | null;
    address: string | null;
    phone: string | null;
  };
}
export interface IAuthState {
  auth: AuthState;
}

const initialState: AuthState = {
  id: null,
  email: null,
  admin: null,
  token: null,
  user: {
    id: null,
    first_name: null,
    last_name: null,
    address: null,
    phone: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLogin: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.user.id = action.payload.user?.id;
      state.user.first_name = action.payload.user?.first_name;
      state.user.last_name = action.payload.user?.last_name;
      state.user.address = action.payload.user?.address;
      state.user.phone = action.payload.user?.phone;
    },
  },
});

export const { saveLogin } = authSlice.actions;
export default authSlice.reducer;
