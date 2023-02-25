import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalPhotoIndex,
  setModalPhotos,
  setShowModal,
} from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import { Photo } from "../../typings";

function Favorite() {
  const favorites = useSelector((state: RootState) => state.favorites.photos);
  const [photos, setPhotos] = useState<Photo[]>(favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    setPhotos(favorites);
  }, [favorites]);

  return (
    <>
      <section className="mx-auto mt-4 flex min-h-full max-w-4xl">
        <div className="flex w-full flex-wrap px-2">
          {photos?.map((photo, index) => {
            return (
              <div key={photo.id} className="aspect-square w-1/2 p-2 lg:w-1/3">
                <div
                  className="h-full w-full cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => {
                    dispatch(setModalPhotoIndex(index));
                    dispatch(setModalPhotos(photos));
                    dispatch(setShowModal(true));
                  }}>
                  <img
                    className="h-full w-full object-cover transition-all duration-300 ease-linear hover:scale-110"
                    src={photo.urls.small}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Favorite;
