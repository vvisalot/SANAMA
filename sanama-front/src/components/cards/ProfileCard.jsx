import Link from "next/link"

const ProfileCard = ({ name, phone, email, address }) => {
    return (

        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-10">
                <div className="flex flex-row items-center p-4">
                    <img className="w-24 center h-24 mb-3 rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
                    <h3 className="pl-8 text-2xl font-bold tracking-wider text-gray-900">{name}</h3>
                </div>
                <h3 className="text-xl">Datos de contacto</h3>
                <span className="py-1 text-sm text-gray-500 dark:text-gray-400">{address}</span>
                <span className="py-1 text-sm text-gray-500 dark:text-gray-400">{email}</span>
                <span className="py-1 text-sm text-gray-500 dark:text-gray-400">{phone}</span>
            </div>
        </div>

    )
}

export default ProfileCard