import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search_term: null,
    search_trigger: false,
    search_category: null,
    pagination_category: null,
    page_count: 1,
    isLoading: false
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
        setPageCount: (state, action) => {
            state.page_count = action.payload;
        },

        setPaginationCategory: (state, action) => {
            state.pagination_category = action.payload;
        },

        setLoader: (state, action) => {
            state.isLoading = action.payload;
        }
    },

});

export const { setSearchTerm, setSearchTrigger, setSearchCategory, setPageCount, setPaginationCategory, setLoader } = storeSearchSlice.actions;
export default storeSearchSlice.reducer;
