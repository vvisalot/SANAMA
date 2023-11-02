import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";

function AvailableHoursBlock({
  availableHours = [],
  onHourClick,
  selectedHour,
  isLoading,
}) {
  useEffect(() => {
    if (availableHours.length > 0 && !selectedHour) {
      onHourClick(availableHours[0].horaInicio);
    }
  }, [availableHours, selectedHour, onHourClick]);

  const formattedHours = useMemo(
    () =>
      (Array.isArray(availableHours) ? availableHours : []).map((horario) => {
        const horaInicioFormateada = horario.horaInicio.slice(0, 5);
        const horaFinFormateada = horario.horaFin.slice(0, 5);
        return {
          ...horario,
          rangoHorario: `${horaInicioFormateada} - ${horaFinFormateada}`,
        };
      }),
    [availableHours]
  );

  return (
    <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-[250px] mt-2">
      {formattedHours.map((horario) => (
        <button
          key={horario.idTurno}
          onClick={() => onHourClick(horario.horaInicio)}
          className={`px-4 py-2 text-sm w-full border rounded-md transition-all ${
            selectedHour === horario.horaInicio
              ? "bg-blue-500 text-white border-blue-500"
              : "text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-500"
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
  selectedHour: PropTypes.string,
  isLoading: PropTypes.bool,
};

AvailableHoursBlock.defaultProps = {
  isLoading: false,
};

export default AvailableHoursBlock;
