import Link from "next/link";

const SidebarItem = ({ name, route, isOpen, Icon, isActive }) => {
  const baseItemClasses =
    "rounded-r-lg p-2 flex items-center transition duration-300 ease-in-out";

  const activeClasses = isActive
    ? "bg-primary-navy-blue text-white"
    : "text-gray-300 hover:bg-blue-200 hover:text-blue-800";

  const itemClasses = `${baseItemClasses} ${activeClasses}`;

  return (
    <li className={itemClasses}>
      <Link href={route}>
        <href className="flex items-center p-2 rounded-2xl fill-current dark:text-white hover:font-extrabold">
          <div className="flex items-center justify-center">
            <Icon />
          </div>
          {isOpen && <span className="ml-7">{name}</span>}
        </href>
      </Link>
    </li>
  );
};

export default SidebarItem;
