import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search_term: null,
    search_trigger: false
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
    },

});

export const { setSearchTerm, setSearchTrigger } = storeSearchSlice.actions;
export default storeSearchSlice.reducer;
