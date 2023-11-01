"use client";

import { useState } from "react";
import { appointmentService } from "@/services/appointmentService";

function useAppointmentReschedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const updateAppointmentHorario = async (idCita, newHour, newDate) => {
    setLoading(true);
    setError(null);
    try {
      const data = {
        pn_id_cita: idCita,
        pt_hora_cita: newHour,
        pd_fecha_cita: newDate,
      };

      await appointmentService.actualizarHoraFecha(data);
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
    updateAppointmentHorario,
  };
}

export default useAppointmentReschedule;
