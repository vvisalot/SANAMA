const PatientInfo = () => {
    return (

        <section className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Informacion personal</h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
                <div className="p-4">
                    <span>Genero</span>
                    <span>DNI</span>
                    <span>Fecha de nacimiento </span>
                </div>
                <div className="p-4">
                    <span>Estado</span>
                    <span>Codigo de seguro</span>
                    <span>Tipo de seguro</span>
                </div>
            </div>
        </section>

    )
}

export default PatientInfo