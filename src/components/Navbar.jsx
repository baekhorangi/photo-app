import SearchIcon from "../assets/search.svg";
import CameraIcon from "../assets/camera.svg";
import HeartIcon from "../assets/heart.svg";
import ScanIcon from "../assets/scan.svg";
import NavbarIcon from "./ui/NavbarIcon";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex h-24 w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="flex w-full max-w-4xl justify-between px-4">
        {/* Search */}
        <form
          className="flex max-h-14 flex-grow justify-start rounded-lg bg-white px-7 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("oooo");
          }}>
          <button type="submit">
            <img className="h-6 w-6" src={SearchIcon} alt="" />
          </button>
          <input
            className="ml-9 flex-grow text-gray-600 outline-none"
            type="text"
            placeholder="Search..."
          />
        </form>

        {/* Nav Icons */}
        <NavbarIcon
          icon={CameraIcon}
          title="Photos"
          bg={"bg-[#a2c8fa]"}
          selected={useLocation().pathname === "/"}
          onclick={() => navigate("/")}
        />

        <NavbarIcon
          icon={HeartIcon}
          title="Saved"
          bg={"bg-[#ffb4bc]"}
          selected={useLocation().pathname === "/favorites"}
          onclick={() => navigate("/favorites")}
        />
        <NavbarIcon
          icon={ScanIcon}
          title="Theme"
          onclick={() => document.documentElement.classList.toggle("dark")}
        />
      </div>
    </nav>
  );
}
export default Navbar;
