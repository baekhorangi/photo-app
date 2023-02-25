import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setModalPhotoIndex,
  setModalPhotos,
  setShowModal,
} from "../../redux/modalSlice";
import { CollectionInfo, Photo, User as UserType } from "../../typings";

function User() {
  const { userID } = useParams();
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [userCollections, setUserCollections] = useState<
    CollectionInfo[] | null
  >(null);
  const [userPhotos, setUserPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/${userID}?client_id=${ACCESS_KEY}`
      );
      setUserInfo(response.data);
      const response2 = await axios.get(
        `https://api.unsplash.com/users/${userID}/collections?client_id=${ACCESS_KEY}&per_page=6`
      );
      setUserCollections(response2.data);
    } catch {
      alert("Something went wrong with the API, please try again later");
    }
  };

  const fetchUserPhotos = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/${userID}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=30`
      );
      setUserPhotos((prevPhotos) => {
        return [...prevPhotos, ...response.data];
      });
      if (response.headers["x-total"] <= page * 30) {
        setLastPage(true);
      }
      setLoading(false);
    } catch {
      alert("Something went wrong with the API, please try again later");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchUserPhotos();
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
        {/* User Info */}
        <div className="flex flex-col items-center justify-center px-4 dark:text-white">
          {/* User Img */}
          <img
            src={userInfo?.profile_image.large}
            className="rounded-lg"
            alt=""
            loading="lazy"
          />

          {/* User Name + Bio + Links */}
          <h2 className="mt-2 text-2xl font-bold">{userInfo?.name}</h2>
          <p className="mt-3 w-2/3 text-center leading-none">{userInfo?.bio}</p>
          {userInfo?.social.instagram_username && (
            <a
              href={`https://instagram.com/${userInfo.social.instagram_username}`}
              target="_blank"
              className="mt-3 text-gray-400">
              @{userInfo.social.instagram_username}
            </a>
          )}

          {/* User Stats */}
          <div className="mt-4 flex w-full justify-center text-center">
            <div className="w-1/4">
              <p className="font-bold ">{userInfo?.downloads}</p>
              <p>Downloads</p>
            </div>
            <div className="w-1/4">
              <p className="font-bold ">{userInfo?.followers_count}</p>
              <p>Followers</p>
            </div>
            <div className="w-1/4">
              <p className="font-bold ">{userInfo?.following_count}</p>
              <p>Following</p>
            </div>
          </div>

          {/* User Collections */}
          <div className="mt-5 flex flex-wrap items-center justify-center">
            {userCollections?.map((collection) => {
              return (
                <div
                  key={collection.id}
                  className="w-1/4 p-2 text-center lg:w-1/6">
                  <div
                    className="aspect-square cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => navigate(`/collection/${collection.id}`)}>
                    {collection.cover_photo ? (
                      <img
                        className="h-full w-full  object-cover transition-all duration-300 ease-linear hover:scale-110"
                        src={collection.cover_photo.urls.small}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-300 text-lg font-bold text-black ">
                        No Cover.
                      </div>
                    )}
                  </div>
                  <p className="truncate font-semibold">{collection.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo Display */}
        <div className="mt-3 flex w-full flex-wrap px-2 dark:text-white">
          {userPhotos?.map((photo, index) => {
            return (
              <div key={photo.id} className="aspect-square w-1/2 p-2 lg:w-1/3">
                <div
                  className="h-full w-full cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => {
                    dispatch(setModalPhotoIndex(index));
                    dispatch(setModalPhotos(userPhotos));
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
          {lastPage && (
            <div className="my-3 w-full text-center font-bold">
              End of Photos.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default User;
