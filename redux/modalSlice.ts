import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../typings";

export interface modalState {
  open: boolean;
  photos: Photo[];
  photoIndex: number;
}

const initialState: modalState = {
  open: false,
  photos: [],
  photoIndex: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setModalPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
    },
    setModalPhotoIndex: (state, action: PayloadAction<number>) => {
      state.photoIndex = action.payload;
    },
  },
});

export const { setShowModal, setModalPhotos, setModalPhotoIndex } =
  modalSlice.actions;

export default modalSlice.reducer;
