import React from "react";
import Heart2Icon from "../assets/heart-2.svg";
import StarIcon from "../assets/star.svg";

function PostModalItem({ photo, index, setIndex }) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* User info */}
      <div className="flex items-center">
        <img
          className="h-14 w-14 rounded-lg"
          src={photo.user.profile_image.medium}
          alt=""
        />
        <div className="ml-4 font-medium">
          <h3 className="">{`${photo.user.name}`}</h3>
          {/* <h3>{`${data[0]?.user.}`}</h3> */}
        </div>
      </div>

      {/* Image */}
      <div className="flex h-3/4 items-center justify-center">
        <img
          className=" max-h-full max-w-full rounded-lg object-contain"
          src={photo.urls.regular}
          alt=""
          onClick={() => setIndex((index) => index + 1)}
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
        <div className="flex w-1/3 items-center justify-end">
          <button>
            <img src={StarIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModalItem;
