import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavorites } from "../../redux/favoriteSlice";
import { setShowModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import { Photo } from "../../typings";
import Heart2Icon from "../assets/heart-2.svg";
import StarIcon from "../assets/star.svg";

interface Props {
  photo: Photo;
}

function PostModalItem({ photo }: Props) {
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.favorites.photos);
  const dispatch = useDispatch();

  return (
    <div className="flex h-full flex-col justify-between">
      {/* User info */}
      <div className="flex items-center">
        <img
          className="h-14 w-14 cursor-pointer rounded-lg hover:brightness-90"
          src={photo.user.profile_image.medium}
          alt=""
          loading="lazy"
          onClick={() => {
            navigate(`/user/${photo.user.username}`);
            dispatch(setShowModal(false));
          }}
        />
        <div
          className="ml-4 cursor-pointer font-medium"
          onClick={() => {
            navigate(`/user/${photo.user.username}`);
            dispatch(setShowModal(false));
          }}>
          <h3 className="dark:text-white">{`${photo.user.name}`}</h3>
        </div>
      </div>

      {/* Image */}
      <div className="flex h-3/4 items-center justify-center">
        <img
          className="max-h-full max-w-full cursor-pointer rounded-lg object-contain"
          src={photo.urls.regular}
          alt=""
          loading="lazy"
          onClick={() => {
            navigate(`/photo/${photo.id}`);
            dispatch(setShowModal(false));
          }}
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
          <a href={photo.links.download} target="_blank">
            <button className="rounded-lg bg-blue-500 py-2 px-20 text-center font-medium text-white transition hover:bg-blue-600">
              Download
            </button>
          </a>
        </div>
        {/* Favorite */}
        <div
          className="flex w-1/3 items-center justify-end"
          onClick={() => {
            dispatch(setFavorites(photo));
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
