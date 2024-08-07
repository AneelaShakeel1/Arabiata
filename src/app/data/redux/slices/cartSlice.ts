import { createSlice } from '@reduxjs/toolkit';

const initialState: {
    cartCount: number
} = {
    cartCount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
    },
});

export const { setCartCount } = cartSlice.actions;

export default cartSlice;
