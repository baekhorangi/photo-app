import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heart2Icon from "../assets/heart-2.svg";
import StarIcon from "../assets/star.svg";
import EyeIcon from "../assets/eye.svg";
import Tags from "../components/ui/Tags";
import { Photo as PhotoType } from "../../typings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setFavorites } from "../../redux/favoriteSlice";

function Photo() {
  const { photoID } = useParams();
  const [photo, setPhoto] = useState<PhotoType>();
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.favorites.photos);
  const dispatch = useDispatch();

  const fetchPhoto = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${photoID}?client_id=${ACCESS_KEY}`
      );
      setPhoto(response.data);
    } catch (e) {
      alert("Something went wrong with the API, please try again later");
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, []);

  return (
    <section className="mx-auto mt-4 flex min-h-full max-w-4xl flex-col dark:text-white">
      <div className="flex w-full flex-col justify-center px-4">
        {/* User */}
        <div className="flex items-center justify-center">
          <img
            className="cursor-pointer rounded-lg hover:brightness-90"
            src={photo?.user.profile_image.medium}
            alt=""
            loading="lazy"
            onClick={() => navigate(`/user/${photo?.user.username}`)}
          />
          <p
            className="ml-4 cursor-pointer text-lg font-medium"
            onClick={() => navigate(`/user/${photo?.user.username}`)}>
            {photo?.user.name}
          </p>
        </div>

        {/* Image */}
        <a href={photo?.links.download} className="mt-4" target="_blank">
          <img
            className="rounded-lg"
            src={photo?.urls.regular}
            alt=""
            loading="lazy"
          />
        </a>

        {/* Stats + Favorite */}
        <div className="mt-3 mb-1 flex justify-center">
          {/* Likes */}
          <div className="flex w-1/6 items-center justify-center">
            <img
              className="max-h-8 cursor-not-allowed"
              src={Heart2Icon}
              alt=""
            />
            <p className="ml-3 text-lg font-medium text-[#FF4557]">{`${photo?.likes}`}</p>
          </div>

          {/* Views */}
          <div className="flex w-1/6 items-center justify-center">
            <img className="max-h-8 dark:invert" src={EyeIcon} alt="" />
            <p className="ml-3 text-lg font-medium ">{`${photo?.views}`}</p>
          </div>

          {/* Favorite */}
          <div
            className="flex w-1/6 items-center justify-center"
            onClick={() => dispatch(setFavorites(photo!))}>
            <button>
              <img
                className={`${
                  favorites.filter((elem) => elem.id === photo?.id).length ===
                    0 && "grayscale"
                }`}
                src={StarIcon}
                alt=""
              />
            </button>
          </div>
        </div>

        {/* Tags */}
        <Tags tags={photo?.tags} />
      </div>
    </section>
  );
}

export default Photo;
