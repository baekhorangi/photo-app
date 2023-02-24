import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalPhotoIndex,
  setModalPhotos,
  setShowModal,
} from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import { Photo } from "../../typings";
import PostModal from "../components/PostModal";

function Favorite() {
  const [favorites, setFavorites] = useState<Photo[]>([]);
  const [photos, setPhotos] = useState<Photo[]>();
  const [firstLoad, setFirstLoad] = useState(true);
  const showModal = useSelector((state: RootState) => state.modal.open);
  const dispatch = useDispatch();

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites));
      setPhotos(JSON.parse(localFavorites));
      setFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    console.log('aaaa')
    console.log(favorites)
    if (!showModal && firstLoad !== true) {
      console.log('a2')
      setPhotos(favorites);
    }
  }, [showModal]);

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
