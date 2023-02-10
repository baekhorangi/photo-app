import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Heart2Icon from "../assets/heart-2.svg";
import StarIcon from "../assets/star.svg";

function PostModalItem({ photo, favorites, setFavorites }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col justify-between">
      {/* User info */}
      <div className="flex items-center">
        <img
          className="h-14 w-14 cursor-pointer rounded-lg"
          src={photo.user.profile_image.medium}
          alt=""
          onClick={() => navigate(`/user/${photo.user.id}`)}
        />
        <div
          className="ml-4 cursor-pointer font-medium"
          onClick={() => navigate(`/user/${photo.user.id}`)}>
          <h3 className="dark:text-white">{`${photo.user.name}`}</h3>
          {/* <h3>{`${data[0]?.user.}`}</h3> */}
        </div>
      </div>

      {/* Image */}
      <div className="flex h-3/4 items-center justify-center">
        <img
          className="max-h-full max-w-full cursor-pointer rounded-lg object-contain"
          src={photo.urls.regular}
          alt=""
          onClick={() => navigate(`/photo/${photo.id}`)}
        />
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between">
        {/* Likes */}
        <div className="flex w-1/3 items-center">
          <img className="max-h-8 cursor-not-allowed" src={Heart2Icon} alt="" />
          <p className="ml-3 text-lg font-medium text-[#FF4557]">{`${photo.likes}`}</p>
        </div>
        {/* Download */}
        <div className="flex w-1/3 justify-center">
          <button className="rounded-lg bg-blue-500 py-2 px-20 text-center font-medium text-white transition hover:bg-blue-600">
            <a href={photo.links.download} target="_blank">
              Download
            </a>
          </button>
        </div>
        {/* Favorite */}
        <div
          className="flex w-1/3 items-center justify-end"
          onClick={() => {
            setFavorites((prevFavs) => {
              if (
                prevFavs.filter((elem) => elem.id === photo.id).length !== 0
              ) {
                console.log("remove");
                return prevFavs.filter((elem) => elem.id !== photo.id);
              }
              console.log("add");
              return [...prevFavs, photo];
            });
          }}>
          <button>
            <img
              className={`${
                favorites.filter((elem) => elem.id === photo.id).length === 0 &&
                "grayscale"
              }`}
              src={StarIcon}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModalItem;
