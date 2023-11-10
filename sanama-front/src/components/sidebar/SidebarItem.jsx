import Link from "next/link";

const SidebarItem = ({ name, route, isOpen, Icon, isActive }) => {
  const itemClasses = isActive
    ? "text-blue-500 bg-blue-100" // active classes
    : "text-white hover:bg-blue-50"; // default classes

  return (
    <li className={`rounded-lg p-2 ${itemClasses}`}>
      <Link
        href={route}
        className="flex items-center p-2 fill-current text-white-900 rounded-2xl dark:text-white
                            hover:bg-sky-100 hover:text-blue-700 hover:font-extrabold  "
      >
        <div className="flex items-center justify-center">
          {" "}
          {/* Contenedor para el ícono */}
          <Icon />
        </div>
        {isOpen && <span className="ml-2">{name}</span>}
      </Link>
    </li>
  );
};
export default SidebarItem;
