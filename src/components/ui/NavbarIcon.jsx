function NavbarIcon({ icon, title, bg, selected, onclick }) {
  return (
    <div className="ml-3 cursor-pointer" onClick={onclick}>
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-lg ${
          selected && bg
        }`}>
        <img className="h-6" src={icon} alt="" />
      </div>
      <div className="mt-1 text-center text-xs font-medium text-gray-400">
        {title}
      </div>
    </div>
  );
}
export default NavbarIcon;
