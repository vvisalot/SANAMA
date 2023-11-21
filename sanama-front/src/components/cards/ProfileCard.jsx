import Link from "next/link"
import noPerfil from "./noPerfil.png"
const ProfileCard = ({ name, phone, email, address, id, module, urlEdit, imagenPerfil }) => {

  return (
    <section className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow flex flex-row">
      <address className="p-11 not-italic">
        <h3 className=" text-3xl font-bold tracking-wider text-gray-900">{name}</h3>
        <div className="mt-6">
          <h3 className="text-lg font-semibold tracking-wide text-black">Datos de contacto</h3>
        </div>

        <dl className="py-4">
          <dd className="text-sm text-gray-500">Correo electronico: {email}</dd>
          <dd className="text-sm text-gray-500">Telefono: {phone}</dd>
          <dd className="text-sm text-gray-500">Direccion: {address}</dd>
        </dl>
        <Link className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" href={`/${module}/profile/${id}/${urlEdit}`}>

          Modificar datos

        </Link>
      </address>
    </section >

  )
}

export default ProfileCard

