import Link from "next/link"
const ProfileCard = ({ name, phone, email, address, id, module, urlEdit }) => {
    return (
        <section className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow flex flex-col">

            <figure className="px-8 py-10 flex flex-row items-center">
                <img className="w-16 h-16 center rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
                <h3 className="ml-6 text-2xl font-bold tracking-wider text-gray-900">{name}</h3>

            </figure>

            <address className="px-10 not-italic">
                <div>
                    <h3 className="text-xl font-semibold tracking-wide text-black">Datos de contacto</h3>
                </div>

                <dl className="py-2">
                    <dd className="text-sm text-gray-500">Correo electronico: {email}</dd>
                    <dd className="text-sm text-gray-500">Telefono: {phone}</dd>
                    <dd className="text-sm text-gray-500">Direccion: {address}</dd>
                </dl>
                {/* {doctor ? (
                    // Renderizar el enlace solo si dataDoctor no es null
                    <Link href={`/${module}/profile/${id}/${urlEdit}`} state ={doctor }>
                        <href className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Modificar datos
                        </href>
                    </Link>
                    
                ) : (
                    // Renderizar algo diferente si dataDoctor es null
                    <Link href={`/${module}/profile/${id}/${urlEdit}`}>
                        <href className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Modificar datos
                        </href>
                    </Link>
                )} */}
                <Link className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" href={`/${module}/profile/${id}/${urlEdit}`}>
                    
                        Modificar datos
                    
                </Link>
            </address>

        </section >
    )
}

export default ProfileCard

