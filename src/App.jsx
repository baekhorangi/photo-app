import Navbar from "./components/Navbar";
import Masonry from "./pages/Masonry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import User from "./pages/User";
import Photo from "./pages/Photo";
import Collection from "./pages/Collection";

function App() {
  return (
    <Router>
      <div className="App min-h-screen overflow-x-hidden bg-gray-50 transition-all dark:bg-gray-700">
        <Navbar />
        <Routes>
          <Route path="/" element={<Masonry />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/user/:userID" element={<User />} />
          <Route path="/photo/:photoID" element={<Photo />} />
          <Route path="/collection/:collectionID" element={<Collection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
