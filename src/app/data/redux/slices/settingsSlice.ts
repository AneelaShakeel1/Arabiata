import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  profileInfo: null | any;
  changePasswordInfo: null | any;
  addressInfo: null | any;
  contactusInfo: null | any;
} = {
  profileInfo: null,
  changePasswordInfo: null,
  addressInfo: null,
  contactusInfo: null,
};

const settingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileInfo: (state, action) => {
      state.profileInfo = action.payload;
    },
    setChangePasswordInfo: (state, action) => {
      state.changePasswordInfo = action.payload;
    },
    setAddressInfo: (state, action) => {
      state.addressInfo = action.payload;
    },
    setContactusInfo: (state, action) => {
      state.contactusInfo = action.payload;
    },


  },
});

export const {
  setProfileInfo,
  setChangePasswordInfo,
  setAddressInfo,
  setContactusInfo
} =
  settingsSlice.actions;

export default settingsSlice;
