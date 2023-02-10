import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ACCESS_KEY from "../../keys";
import dummyData from "../../reponse";
import PostModal from "../components/PostModal";

function Masonry() {
  const useDummyData = false;
  const [favorites, setFavorites] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const masonRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const localFavorities = JSON.parse(localStorage.getItem("favorites"));
    if (localFavorities) {
      setFavorites(localFavorities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const [masonryCols, setMasonryCols] = useState(
    window.innerWidth < 1024 ? 2 : 3
  );

  const fetchPhotos = async () => {
    console.log("loading");
    if (useDummyData) {
      setPhotos((prevPhotos) => {
        return [...prevPhotos, ...dummyData];
      });
    } else {
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=30`
      );
      setPhotos((prevPhotos) => {
        return [...prevPhotos, ...response.data];
      });
    }
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setMasonryCols(3);
    } else {
      setMasonryCols(2);
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const smallestColumn = Array.from(masonRef.current.children).reduce(
      (a, b) => (a.lastChild.offsetTop < b.lastChild.offsetTop ? a : b)
    );

    if (
      scrollTop + windowHeight >=
        smallestColumn.children[smallestColumn.childElementCount - 1]
          .offsetTop &&
      !loading
    ) {
      setLoading(true);
      fetchPhotos();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return (_) => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const renderMasonry = () => {
    return new Array(masonryCols).fill(0).map((_, index) => {
      return (
        <div key={index} className="flex w-1/2 flex-col p-2 lg:w-1/3">
          {photos
            ?.filter((_, photoIndex) => photoIndex % masonryCols == index)
            .map((photo, photoIndex) => {
              return (
                <div
                  key={photoIndex}
                  className="mb-4 cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => {
                    // console.log(photoIndex * masonryCols + index);
                    setModalIndex(photoIndex * masonryCols + index);
                    setShowModal(true);
                  }}>
                  <img
                    className="w-full transition-all duration-300 ease-linear hover:scale-110"
                    src={photo.urls.small}
                    alt=""
                    loading="lazy"
                  />
                </div>
              );
            })}
        </div>
      );
    });
  };

  return (
    <>
      <section className="mx-auto mt-4 max-w-4xl">
        <div ref={masonRef} className="flex w-full justify-between px-2">
          {renderMasonry()}
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

export default Masonry;
