import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../typings";

export interface favoriteState {
  photos: Photo[];
}

const initialState: favoriteState = {
  photos: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Photo>) => {
      if (
        state.photos.filter((photo) => photo.id === action.payload.id)
          .length !== 0
      ) {
        state.photos = state.photos.filter(
          (photo) => photo.id !== action.payload.id
        );
      } else {
        state.photos = [...state.photos, action.payload];
      }
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
