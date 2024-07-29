import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestion = createAsyncThunk(
  "suggestion/fetchSuggestion", // Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion
  async () => {
    const response = await fetch("http://localhost:3004/api/suggestion");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  suggestion: "",
  loading: false,
  //error: true,
  error: null,
};

const options = createSlice({
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload;
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//export default suggestionSlice.reducer;
export default options.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion.data;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
