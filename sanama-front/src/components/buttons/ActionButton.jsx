import Link from "next/link"

const ActionButton = ({ url, name, color, shadow }) => {

    return (
        <Link href={url} className="p-20 h-[300px] flex flex-col items-center text-center group  hover:bg-slate-50 rounded-2xl cursor-pointer">
            <span className={`p-5 rounded-full ${color} text-white shadow-lg ${shadow}`}></span>
            <p className="text-xl font-medium text-slate-700 mt-3">{name}</p>
        </Link>
    )
}

export default ActionButton