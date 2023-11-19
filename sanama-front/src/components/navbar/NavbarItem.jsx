import Link from "next/link"

const NavbarItem = ({ name, route, isActive }) => {
    const baseItemClasses = "flex items-center transition duration-100 ease-in-out scale-90 hover:scale-100"

    const activeClasses = isActive ? "font-extrabold text-white" : "text-gray-300 hover:text-gray-300 "

    const itemClasses = `${baseItemClasses} ${activeClasses}`

    return (
        <li className={itemClasses}>
            <Link href={route} className="w-full h-full ">
                <href className="flex items-center px-3 rounded-2xl w-full h-full ">
                    <span className="" >{name}</span>
                </href>
            </Link>
        </li>
    )
}

export default NavbarItem