import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ACCESS_KEY from "../../keys";
import PostModal from "../components/PostModal";

function Search() {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("photos");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchSearch = async () => {
    console.log("loading");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/${searchType}?client_id=${ACCESS_KEY}&page=${page}&per_page=30&query=${searchQuery}`
      );
      console.log(response.headers["x-ratelimit-remaining"]);
      setSearchResults((prevResults) => {
        return [...prevResults, ...response.data.results];
      });
      if (response.data.total_pages === page) {
        setLastPage(true);
      }
      setLoading(false);
    } catch {
      alert("Something went wrong with the API, please try again later");
    }
  };

  useEffect(() => {
    // console.log("run");
    fetchSearch();
  }, [searchType, searchQuery, page]);

  useEffect(() => {
    setSearchResults([]);
    setPage(1);
    setSearchQuery(query);
    setLastPage(false);
  }, [query]);

  useEffect(() => {
    const localFavorities = JSON.parse(localStorage.getItem("favorites"));
    if (localFavorities) {
      setFavorites(localFavorities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const changeSearch = (type) => {
    if (type === searchType) {
      return;
    }
    setSearchResults([]);
    setPage(1);
    setSearchType(type);
    setLastPage(false);
  };

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

    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const renderImg = (result) => {
    let src = "";
    if (searchType === "photos") {
      src = result.urls.small;
    } else if (searchType === "collections") {
      src = result.cover_photo.urls.small;
    } else {
      src = result.profile_image.large;
    }
    return (
      <>
        <img
          className={`h-full w-full cursor-pointer object-cover transition-all duration-300 ease-linear group-hover:scale-110 ${
            searchType === "collections" && "brightness-50"
          }`}
          src={src}
          alt=""
          loading="lazy"
        />
        {searchType !== "photos" &&
          (searchType === "users" ? (
            // Overlay + Text
            <div className="absolute bottom-2 w-full  text-center text-lg font-bold text-white">
              <span className="[text-shadow:_0_0_3px_rgb(0_0_0_)]">
                {result.name}
              </span>
            </div>
          ) : (
            // Overlay Shadow + Text
            <div className="absolute top-1/2 w-full -translate-y-1/2  text-center text-lg font-bold text-white">
              {searchType === "users" ? (
                <span className="[text-shadow:_0_0_3px_rgb(0_0_0_)]">
                  {result.name}
                </span>
              ) : (
                `${result.total_photos.toLocaleString()} photos`
              )}
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <section className="mx-auto mt-4 flex min-h-full max-w-4xl">
        <div className="flex w-full flex-wrap px-2 dark:text-white">
          {/* Search header */}
          <div className="w-full text-center text-2xl ">
            Search Results for{" "}
            <span className="font-bold italic">{searchQuery}</span>
          </div>

          {/* Search buttons */}
          <div className="mb-2 flex w-full justify-between px-2 text-lg font-medium ">
            <button
              className={`${searchType !== "users" && "text-gray-400"}`}
              onClick={() => changeSearch("users")}>
              Users
            </button>
            <div className="flex">
              <button
                className={`${searchType !== "photos" && "text-gray-400"}`}
                onClick={() => changeSearch("photos")}>
                Photos
              </button>
              <button
                className={`${
                  searchType !== "collections" && "text-gray-400"
                } ml-2`}
                onClick={() => changeSearch("collections")}>
                Collections
              </button>
            </div>
          </div>

          {/* Result Display */}
          {searchResults?.map((result, index) => {
            return (
              <div
                key={index}
                className={`aspect-square p-2 ${
                  searchType === "users" ? "w-1/3 lg:w-1/4" : "w-1/2  lg:w-1/3"
                }`}>
                <div
                  className="group relative h-full w-full cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => {
                    if (searchType === "photos") {
                      setModalIndex(index);
                      setShowModal(true);
                    } else if (searchType === "users") {
                      navigate(
                        `/${searchType.slice(0, -1)}/${result.username}`
                      );
                    } else {
                      navigate(`/${searchType.slice(0, -1)}/${result.id}`);
                    }
                  }}>
                  {renderImg(result)}
                </div>
              </div>
            );
          })}

          {lastPage && (
            <div className="my-3 w-full text-center font-bold">
              End of Search Results.
            </div>
          )}
          {!searchResults.length && "There are no results for " + searchQuery}
        </div>
      </section>

      {/* Modal */}
      {searchType === "photos" && showModal && (
        <PostModal
          data={searchResults}
          index={modalIndex}
          showModal={setShowModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
    </>
  );
}

export default Search;
