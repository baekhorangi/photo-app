interface Props {
  icon: string;
  title: string;
  bg?: string;
  selected?: boolean;
  onclick: () => void;
}

function NavbarIcon({ icon, title, bg, selected, onclick }: Props) {
  return (
    <div className="ml-3">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-lg ${
          selected && bg
        } ${
          !selected ? "hover:bg-gray-300" : ""
        } group cursor-pointer transition-all`}
        onClick={onclick}>
        <img
          className="h-6 transition-all duration-300 group-hover:scale-125"
          src={icon}
          alt=""
        />
      </div>
      <div className="mt-1 text-center text-xs font-medium text-gray-400">
        {title}
      </div>
    </div>
  );
}
export default NavbarIcon;
