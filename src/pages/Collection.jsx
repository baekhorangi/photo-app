import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostModal from "../components/PostModal";

function Collection() {
  const { collectionID } = useParams();
  const [collectionInfo, setCollectionInfo] = useState(null);
  const [collectionPhotos, setCollectionPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

  const navigate = useNavigate();

  useEffect(() => {
    const localFavorities = JSON.parse(localStorage.getItem("favorites"));
    if (localFavorities) {
      setFavorites(localFavorities);
    }

    fetchCollectionInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchCollectionPhotos = async () => {
    console.log("loading");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/collections/${collectionID}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=30`
      );
      // console.log(response);
      setCollectionPhotos((prevResults) => {
        return [...prevResults, ...response.data];
      });
      if (response.headers["x-total"] <= page * 30) {
        setLastPage(true);
      }
      // setPage(page + 1);
      setLoading(false);
    } catch {
      alert("Something went wrong with the API, please try again later");
    }
  };

  const fetchCollectionInfo = async () => {
    console.log("loading info");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/collections/${collectionID}?client_id=${ACCESS_KEY}`
      );
      setCollectionInfo(response.data);
    } catch {
      alert("Something went wrong with the API, please try again later");
    }
  };

  useEffect(() => {
    fetchCollectionPhotos();
  }, [page]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (windowHeight + scrollTop + 1 >= scrollHeight && !loading && !lastPage) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <section className="mx-auto mt-4 flex min-h-full max-w-4xl flex-col">
        <div className="flex w-full flex-col items-center justify-center px-4 dark:text-white">
          {/* Info */}

          {/* Info - Title */}
          <h2 className="text-4xl font-bold">{collectionInfo?.title}</h2>

          {/* Info - User */}
          <div className="my-5 flex items-center justify-center text-xl">
            <img
              className="cursor-pointer rounded-lg"
              src={collectionInfo?.user.profile_image.small}
              alt=""
              loading="lazy"
              onClick={() => navigate(`/user/${collectionInfo?.user.username}`)}
            />
            <h3
              className="ml-3 cursor-pointer"
              onClick={() =>
                navigate(`/user/${collectionInfo?.user.username}`)
              }>
              {collectionInfo?.user.name}
            </h3>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap items-center justify-center">
            {collectionInfo?.tags.map((tag) => {
              return (
                <button
                  onClick={() => navigate(`/search/${tag.title}`)}
                  className="mx-1 rounded-lg border border-black px-3 hover:bg-gray-300 dark:border-white dark:hover:bg-gray-900"
                  key={tag.title}>
                  {tag.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Display */}
        <div className="mt-5 flex w-full flex-wrap px-2 dark:text-white">
          {collectionPhotos?.map((photo, index) => {
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
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
          {lastPage && (
            <div className="my-3 w-full text-center font-bold">
              End of Collection.
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <PostModal
          data={collectionPhotos}
          index={modalIndex}
          showModal={setShowModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </>
  );
}

export default Collection;
