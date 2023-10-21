const ProfileCard = ({ name, phone, email, address }) => {
    return (
        <div className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow">
            <div className="flex flex-col p-5">
                <div className="flex flex-row items-center p-4">
                    <img className="w-24 center h-24 mb-3 rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
                    <h3 className="pl-8 text-2xl font-bold tracking-wider text-gray-900">{name}</h3>
                </div>

                <h3 className="text-xl px-3 py-2 font-bold">Datos de contacto</h3>
                <span className="py-1 px-4 text-sm text-gray-500">{address}</span>
                <span className="py-1 px-4 text-sm text-gray-500">{email}</span>
                <span className="py-1 px-4 text-sm text-gray-500">{phone}</span>


            </div>
        </div>
    )
}

export default ProfileCard