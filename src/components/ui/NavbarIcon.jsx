function NavbarIcon({icon, title}) {
  return (
    <div className="ml-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white">
        <img className="h-6" src={icon} alt="" />
      </div>
      <div className="mt-1 text-center text-xs font-medium text-gray-400">
        {title}
      </div>
    </div>
  );
}
export default NavbarIcon;
