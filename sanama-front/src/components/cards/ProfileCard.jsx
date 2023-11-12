import Link from "next/link"
import noPerfil from "./noPerfil.png"
const ProfileCard = ({ name, phone, email, address, id, module, urlEdit, imagenPerfil }) => {

  return (
    <>
      <section className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow flex flex-row">

        <figure className="px-8 py-10 flex flex-row items-center">
          {
            imagenPerfil === undefined ? (//no se pasó el prop
              <img className="w-16 h-16 center rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
            ) : (
              <>
                {imagenPerfil ? ( //se pasó el prop != null (no tiene imagen)
                  <div className="mt-2" style={{ width: '14rem', position: 'relative' }}>
                    <img
                      src={imagenPerfil}
                      alt="Vista previa de la imagen"
                      className="object-cover w-full h-full rounded-full"
                      style={{ objectFit: 'cover', margin: 'auto' }}
                    />
                  </div>
                ) : (
                  // <img className="w-16 h-16 center rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
                  <div className="mt-2" style={{ width: '14rem', position: 'relative' }}>
                    <img
                      src={noPerfil.src}
                      alt="Vista previa de la imagen"
                      className="object-cover w-full h-full rounded-full"
                      style={{ objectFit: 'cover', margin: 'auto' }}
                    />
                  </div>
                )}
              </>
            )
          }
          {/* <img className="w-16 h-16 center rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" /> */}


        </figure>

        <address className="p-11 not-italic">
          <h3 className=" text-2xl font-bold tracking-wider text-gray-900">{name}</h3>
          <div className="mt-6">
            <h3 className="text-lg font-semibold tracking-wide text-black">Datos de contacto</h3>
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
    </>
  )
}

export default ProfileCard

