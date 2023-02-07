import Navbar from "./components/Navbar";
import Masonry from "./pages/Masonry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <Router>
      <div className="App bg-gray-50 transition-all dark:bg-gray-700 overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Masonry />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
