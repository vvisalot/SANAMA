import FormMenu from "./FormMenu"
import PatientForm from "./PatientForm"

const CreateAppointmentForm = () => {
    return (
        <>
            <h1 className="pl-10 pt-10 font-bold tracking-wide text-3xl">Crear nueva cita</h1>
            <section className="flex">
                <PatientForm />
                <FormMenu />
            </section>
        </>


    )
}

export default CreateAppointmentForm