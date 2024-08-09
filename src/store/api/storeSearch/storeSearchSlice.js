import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search_term: null,
    search_trigger: false,
    search_category: null,
};


const storeSearchSlice = createSlice({
    name: 'store_search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.search_term = action.payload;
        },
        setSearchTrigger: (state, action) => {
            state.search_trigger = action.payload;
        },
        setSearchCategory: (state, action) => {
            state.search_category = action.payload;
        },
    },

});

export const { setSearchTerm, setSearchTrigger, setSearchCategory } = storeSearchSlice.actions;
export default storeSearchSlice.reducer;
