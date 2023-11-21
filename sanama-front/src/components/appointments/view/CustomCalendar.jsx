import React from "react";
import dayjs from "dayjs";

export const CustomCalendar = ({ highlightedDates, onDaySelect }) => {
  return (
    <div>
      {highlightedDates.map((dateString) => {
        const date = dayjs(dateString); // Convertir la cadena de texto a un objeto de fecha
        return (
          <button
            key={dateString} // Usar la cadena de texto como clave
            onClick={() => onDaySelect(dateString)}
            style={{
              backgroundColor: "lightgreen",
              margin: "5px",
              // Otros estilos que desees agregar
            }}
          >
            {date.format("DD MMM YYYY")} {/* Formatear la fecha para mostrar */}
          </button>
        );
      })}
    </div>
  );
};
