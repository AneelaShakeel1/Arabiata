import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  loginInfo: null | any;
} = {
  loginInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    }
  },
});

export const {setLoginInfo} =
  userSlice.actions;

export default userSlice;
