import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ACCESS_KEY from "../../keys";
import dummyData from "../../reponse";
import PostModal from "../components/PostModal";

function Masonry() {
  const useDummyData = false;
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const masonRef = useRef(null);

  const [masonryCols, setMasonryCols] = useState(
    window.innerWidth < 1024 ? 2 : 3
  );

  const fetchPhotos = async () => {
    console.log("loading");
    let data = [];
    if (useDummyData) {
      data.push(...dummyData);
    } else {
      for (let i = 1; i <= 3; i++) {
        const response = await axios.get(
          `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&page=${
            page + i
          }`
        );
        // console.log(response);
        data.push(...response.data);
      }
    }
    // console.log(page);
    setPage(page + 3);
    // console.log(data);

    setPhotos((prevPhotos) => {
      return [...prevPhotos, ...data];
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  function handleResize() {
    if (window.innerWidth >= 1024) {
      setMasonryCols(3);
    } else {
      setMasonryCols(2);
    }
  }

  function handleScroll() {
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
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return (_) => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function renderMasonry() {
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
                  onClick={() => console.log(photoIndex * masonryCols + index)}>
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
  }

  return (
    <>
      <PostModal />
      <section className="mx-auto mt-4 flex max-w-4xl">
        <div ref={masonRef} className="flex w-full justify-between px-2">
          {renderMasonry()}
        </div>
      </section>
    </>
  );
}

export default Masonry;