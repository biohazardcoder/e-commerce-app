import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminTypes } from "../types/types";

interface UserState {
  data: AdminTypes | {};
  isPending: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: UserState = {
  data: {},
  isPending: false,
  error: "",
  isAuth: false,
};

const UserSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<AdminTypes>) {
      state.data = payload;
      state.isPending = false;
      state.isAuth = true;
      state.error = "";
    },
    setPending(state) {
      state.isPending = true;
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.isPending = false;
      state.isAuth = false;
    },
    setLogout: (state) => {
      state.data = {};
      state.isAuth = false;
    }
  },
});

export const { setUser, setPending, setError,setLogout } = UserSlicer.actions;
export default UserSlicer.reducer;
