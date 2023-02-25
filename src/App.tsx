import Navbar from "./components/Navbar";
import Masonry from "./pages/Masonry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import User from "./pages/User";
import PhotoType from "./pages/Photo";
import Collection from "./pages/Collection";
import PostModal from "./components/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Photo } from "../typings";
import { setFavorites } from "../redux/favoriteSlice";

function App() {
  const showModal = useSelector((state: RootState) => state.modal.open);
  const favorites = useSelector((state: RootState) => state.favorites.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      console.log("loading favorites");
      const parsedLocalFavorites: Photo[] = JSON.parse(localFavorites);
      for (let i = 0; i < parsedLocalFavorites.length; i++)
        dispatch(setFavorites(parsedLocalFavorites[i]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [showModal]);

  return (
    <Router>
      <div className="App min-h-screen overflow-x-hidden bg-gray-50 transition-all dark:bg-gray-700">
        <Navbar />
        <Routes>
          <Route path="/" element={<Masonry />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/user/:userID" element={<User />} />
          <Route path="/photo/:photoID" element={<PhotoType />} />
          <Route path="/collection/:collectionID" element={<Collection />} />
        </Routes>
        {showModal && <PostModal />}
      </div>
    </Router>
  );
}

export default App;
