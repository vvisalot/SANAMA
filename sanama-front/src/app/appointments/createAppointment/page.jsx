const CreateAppointmentForm = () => {
    return (
        <section className="p-10">
            < h1 className="font-bold text-blue-500 text-6xl pb-8" >Crear nueva cita</h1>
            <article className="flex box-content ">
                <div className="w-1/3 flex-row font-semibold text-2xl tracking-wide p-10 bg-white">
                    Informacion del paciente
                </div>


                <div className="w-2/3 flex flex-row p-10 bg-slate-600 ">
                    Datos de la cita

                </div>
            </article >
        </section>

    )
}

export default CreateAppointmentForm