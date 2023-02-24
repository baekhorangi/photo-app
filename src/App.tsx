import Navbar from "./components/Navbar";
import Masonry from "./pages/Masonry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import User from "./pages/User";
import PhotoType from "./pages/Photo";
import Collection from "./pages/Collection";
import PostModal from "./components/PostModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Photo } from "../typings";

function App() {
  const showModal = useSelector((state: RootState) => state.modal.open);

  const [favorites, setFavorites] = useState<Photo[]>([]);
  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites));
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
        {showModal && (
          <PostModal favorites={favorites} setFavorites={setFavorites} />
        )}
      </div>
    </Router>
  );
}

export default App;
