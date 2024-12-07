import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchType: "All",
    searchQuery: "",
    searchResult: {},
    loading: false,
    news: [],
    searchResultImages: {},
    searchResultVideos: {},
    searchResultNews: {},
    exterResponseLoading: false
}

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        changeSearchType: (state, action) => {
            state.searchType = action.payload
        },
        changeSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        changeSearchResult: (state, action) => {
            state.searchResult = action.payload
        },
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
        changeNewsData: (state, action) => {
            state.news = action.payload
        },
        changeSearchResultImages: (state, action) => {
            state.searchResultImages = action.payload
        },
        changeSearchResultVideos: (state, action) => {
            state.searchResultVideos = action.payload
        },
        changeSearchResultNews: (state, action) => {
            state.searchResultNews = action.payload
        },
        changeExterResponseLoading: (state, action) => {
            state.exterResponseLoading = action.payload
        }
    },
})


export const { changeSearchType, changeSearchQuery, changeSearchResult, changeLoading,
    changeNewsData, changeSearchResultImages, changeSearchResultVideos, changeSearchResultNews,
    changeExterResponseLoading } = searchSlice.actions

export default searchSlice.reducer