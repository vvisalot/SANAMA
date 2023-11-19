import FormContainer from "@/components/appointments/create/FormContainer";
import TitleWithIcon from "@/components/TitleWithIcon";
import createAppointmentIcon from "@/components/icons/createAppointmentIcon";
const CreateAppointmentForm = () => {
  return (
    <section className="w-full px-14 py-6">
      <TitleWithIcon name={"Nueva Cita"} Icon={createAppointmentIcon} />
      <FormContainer />
    </section>
  );
};

export default CreateAppointmentForm;
