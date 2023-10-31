import { useState } from "react";
import { useAppointments } from "@/context/AppointmentsContext";
import { appointmentService } from "@/services/appointmentService";

function useAppointmentInfo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAppointmentRegistered, setIsAppointmentRegistered] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { appointmentData } = useAppointments();

  const handleRegisterAppointment = async () => {
    const pacienteData = appointmentData.selectedPatientData;
    const doctorResponsable = appointmentData.selectedDoctor;
    const companionData = appointmentData.companionData;
    const selectedTriage = appointmentData.selectedTriage;

    setLoading(true);
    setError(null);
    try {
      const data = {
        paciente: { idPersona: pacienteData.idPersona },
        medico: { idPersona: doctorResponsable.idPersona },
        horaCita: appointmentData.selectedHour,
        fechaCita: appointmentData.selectedDate,
        tieneAcompanhante: companionData ? true : false,
        nombreAcompanhante: companionData.nombreAcompanhante,
        dniAcompanhante: companionData ? companionData.dniAcompanhante : null,
        parentezco: companionData ? companionData.parentezco : null,
        requiereTriaje: selectedTriage ? 1 : 0,
      };

      const responseData = await appointmentService.registrarCita(data);
      setIsAppointmentRegistered(true);
      setConfirmationMessage("La cita se ha registrado exitosamente.");
    } catch (error) {
      console.error("Error al registrar la cita médica:", error.message);
      setError("Error al registrar la cita médica");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isAppointmentRegistered,
    confirmationMessage,
    handleRegisterAppointment,
  };
}

export default useAppointmentInfo;
