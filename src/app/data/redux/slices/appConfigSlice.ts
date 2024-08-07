import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: 'en',
    themeMode: 'light',
    loading: false,
    accessToken: null
};

const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        setLoading: (state=initialState, action) => {
            state.loading = action.payload;
        },
        setAccessToken: (state=initialState, action) => {
            state.accessToken = action.payload;
        },
        setLanguage: (state=initialState, action) => {
            state.language = action.payload;
        },
        setThemeMode: (state=initialState, action) => {
            state.themeMode = action.payload;
        },
    },
});

export const { setLoading, setAccessToken, setLanguage, setThemeMode } = appConfigSlice.actions;

export default appConfigSlice;