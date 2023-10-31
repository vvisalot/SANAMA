import { useState } from "react";
import { appointmentService } from "@/services/appointmentService";

function useUpdateAppointmentStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const updateAppointmentStatus = async (idCita, newStatus) => {
    setLoading(true);
    setError(null);
    try {
      const data = {
        idCita: idCita,
        nuevoEstado: newStatus,
      };

      await appointmentService.actualizarEstadoCita(data);
      setIsStatusUpdated(true);
      setConfirmationMessage(
        "El estado de la cita se ha actualizado exitosamente."
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la cita:", error.message);
      setError("Error al actualizar el estado de la cita");
      setIsStatusUpdated(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isStatusUpdated,
    confirmationMessage,
    updateAppointmentStatus,
  };
}

export default useUpdateAppointmentStatus;
