import React, { Dispatch, SetStateAction, useState } from "react";
import XIcon from "../assets/xmark.svg";
import LeftChevronIcon from "../assets/left-chevron.svg";
import RightChevronIcon from "../assets/right-chevron.svg";
import PostModalItem from "./PostModalItem";
import { Photo } from "../../typings";
import { useDispatch, useSelector } from "react-redux";
import { setModalPhotoIndex, setShowModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";

interface Props {
  favorites: Photo[];
  setFavorites: Dispatch<SetStateAction<Photo[]>>;
}

function PostModal({ favorites, setFavorites }: Props) {
  const photos = useSelector((state: RootState) => state.modal.photos);
  const photoIndex = useSelector((state: RootState) => state.modal.photoIndex);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-1/2 left-1/2 z-10 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gray-800/90">
      {/* Modal Container */}
      <div className="z-10 h-3/5 w-full max-w-4xl px-4">
        {/* Modal */}

        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-50 p-8 shadow-2xl dark:bg-gray-700">
          {/* X Button */}
          <button
            className="absolute top-8 right-8 transition hover:scale-110"
            onClick={() => dispatch(setShowModal(false))}>
            <img src={XIcon} alt="" />
          </button>

          {/* Left Chevron */}
          <button
            className="absolute top-1/2 rounded-full bg-gray-400/90 py-3 px-4 transition hover:scale-110"
            onClick={() =>
              dispatch(
                setModalPhotoIndex(
                  (photoIndex + photos.length - 1) % photos.length
                )
              )
            }>
            <img src={LeftChevronIcon} alt="" />
          </button>

          {/* Right Chevron */}
          <button
            className="absolute top-1/2 right-8 rounded-full bg-gray-400/90 py-3 px-4 transition hover:scale-110"
            onClick={() =>
              dispatch(setModalPhotoIndex((photoIndex + 1) % photos.length))
            }>
            <img src={RightChevronIcon} alt="" />
          </button>

          {/* Post */}
          <PostModalItem
            photo={photos[photoIndex]}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </div>
      </div>

      {/* Outside Overlay */}
      <div
        className="absolute h-full w-full"
        onClick={() => dispatch(setShowModal(false))}></div>
    </div>
  );
}

export default PostModal;
