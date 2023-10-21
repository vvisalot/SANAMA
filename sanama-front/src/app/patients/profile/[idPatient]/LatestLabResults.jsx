//Pendiente meter datos reales del paciente.
//Los informes de laboratorio son pdfs que se pueden descargar.

import Link from "next/link"

const LatestLabResults = () => {
    return (
        <>
            <div className="p-6 w-full h-[300px] font-bold bg-white border border-gray-200 rounded-xl shadow">
                Ultimos resultados de laboratorio
            </div>
            <div>
                <Link href='#'> Subir archivo</Link>
                <Link href='#'> Ver todos</Link>

            </div>
        </>

    )

}

export default LatestLabResults