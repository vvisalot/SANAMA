import FormContainer from "./FormContainer"
import FormMenu from "./FormMenu"

const CreateAppointmentForm = () => {
    return (
        <>
            <h1 className="pl-10 pt-10 font-bold tracking-wide text-4xl">Crear nueva cita</h1>
            <section className="flex">
                <FormContainer />
            </section>
        </>


    )
}

export default CreateAppointmentForm