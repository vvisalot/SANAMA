import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useAppointments } from "@/context/AppointmentsContext";

function AvailableHoursBlock({ availableHours = [], onHourClick, isLoading }) {
  const { appointmentData } = useAppointments();

  useEffect(() => {
    if (availableHours.length > 0 && !appointmentData.selectedHour) {
      onHourClick(availableHours[0].horaInicio);
    }
  }, [availableHours, appointmentData.selectedHour, onHourClick]);

  const formattedHours = useMemo(
    () =>
      availableHours.map((horario) => {
        const horaInicioFormateada = horario.horaInicio.slice(0, 5);
        const horaFinFormateada = horario.horaFin.slice(0, 5);
        return {
          ...horario,
          rangoHorario: `${horaInicioFormateada} - ${horaFinFormateada}`,
        };
      }),
    [availableHours]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-2">
        <div className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (availableHours.length === 0) {
    return (
      <p className="text-center mt-2 text-sm text-gray-600">
        No hay horarios disponibles
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-[250px] mt-2">
      {formattedHours.map((horario, index) => (
        <button
          key={horario.idTurno}
          onClick={() => onHourClick(horario.horaInicio)}
          className={`px-4 py-2 text-sm w-full border rounded-md transition-all ${
            appointmentData.selectedHour === horario.horaInicio
              ? "bg-blue-500 text-white border-blue-500"
              : "text-gray-700 border-gray-300"
          }`}
        >
          {horario.rangoHorario}
        </button>
      ))}
    </div>
  );
}

AvailableHoursBlock.propTypes = {
  availableHours: PropTypes.arrayOf(
    PropTypes.shape({
      idTurno: PropTypes.number.isRequired,
      horaInicio: PropTypes.string.isRequired,
      horaFin: PropTypes.string.isRequired,
    })
  ).isRequired,
  onHourClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

AvailableHoursBlock.defaultProps = {
  isLoading: false,
};

export default AvailableHoursBlock;
