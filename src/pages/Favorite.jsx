import React, { useEffect, useState } from "react";
import PostModal from "../components/PostModal";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [photos, setPhotos] = useState();
  const [modalIndex, setModalIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const localFavorities = JSON.parse(localStorage.getItem("favorites"));
    if (localFavorities) {
      setFavorites(localFavorities);
      setPhotos(localFavorities);
      setFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!showModal && firstLoad !== true) {
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
                    setModalIndex(index);
                    setShowModal(true);
                  }}>
                  <img
                    className="h-full w-full object-cover transition-all duration-300 ease-linear hover:scale-110"
                    src={photo.urls.small}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {showModal && (
        <PostModal
          data={photos}
          index={modalIndex}
          showModal={setShowModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </>
  );
}

export default Favorite;
