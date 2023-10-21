const ProfileCard = ({ name, phone, email, address }) => {
    return (
        <div className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow">
            <div className="flex flex-col p-5">
                <div className="p-3 flex flex-row items-center">
                    <img className="w-24 center h-24 rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
                    <h3 className="pl-8 text-3xl font-bold tracking-wider text-gray-900">{name}</h3>
                </div>

                <div className="p-3">
                    <h3 className="text-xl font-bold">Datos de contacto</h3>
                    <div className="px-2 py-4">
                        <div className=" text-sm text-gray-500">{address}</div>
                        <div className="text-sm text-gray-500">{email}</div>
                        <div className="text-sm text-gray-500">{phone}</div>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default ProfileCard