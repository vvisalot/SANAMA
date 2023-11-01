import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { useAppointments } from "@/context/AppointmentsContext";
import { medicService } from "../../services/medicService";
import { Badge } from "flowbite-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  PickersDay,
  DateCalendar,
} from "@mui/x-date-pickers";

function ServerDay({
  highlightedDays = [],
  day,
  outsideCurrentMonth,
  ...other
}) {
  const dayString = day.format("YYYY-MM-DD");
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(dayString);

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "✅" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function SelectDate() {
  const { appointmentData, setAppointmentData } = useAppointments();
  const [highlightedDays, setHighlightedDays] = useState([]);

  const handleHourChange = (hour) => {
    const formattedHour = dayjs(hour).format("HH:mm:ss");
    setAppointmentData((prevData) => ({
      ...prevData,
      selectedHour: formattedHour,
    }));
  };

  const fetchAvailableHours = (fecha, medicId) => {
    medicService
      .buscarHorariosByID(fecha, medicId)
      .then((data) => {
        setAppointmentData((prev) => ({ ...prev, availableHours: data }));
      })
      .catch((error) => {
        console.error("Error fetching available hours:", error);
      });
  };

  const fetchAvailableDays = (medicId) => {
    medicService
      .DiasDisponiblesByID(medicId)
      .then((data) => {
        setAppointmentData((prev) => ({ ...prev, availableDays: data }));
      })
      .catch((error) => {
        console.error("Error fetching available days:", error);
      });
  };

  useEffect(() => {
    if (appointmentData.selectedDoctor) {
      fetchAvailableDays(appointmentData.selectedDoctor.idPersona);
    }
  }, [appointmentData.selectedDoctor]);

  useEffect(() => {
    if (appointmentData.selectedDate && appointmentData.selectedDoctor) {
      fetchAvailableHours(
        appointmentData.selectedDate,
        appointmentData.selectedDoctor.idPersona
      );
    }
  }, [appointmentData.selectedDate, appointmentData.selectedDoctor]);

  useEffect(() => {
    const daysToHighlight = appointmentData.availableDays.map((date) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    setHighlightedDays(daysToHighlight);
  }, [appointmentData.availableDays]);

  const handleDateChange = useCallback(
    (newDate) => {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedDate: dayjs(newDate).format("YYYY-MM-DD"),
      }));
    },
    [setAppointmentData]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h2 className="text-lg font-semibold mb-4">
        Selecciona una Fecha y hora disponible:
      </h2>
      <div className="flex">
        <DateCalendar
          onChange={handleDateChange}
          value={
            appointmentData.selectedDate
              ? dayjs(appointmentData.selectedDate)
              : null
          }
          slots={{ day: ServerDay }}
          slotProps={{ day: { highlightedDays } }}
        />
        <div className="flex flex-col ml-4">
          {appointmentData.selectedDate && appointmentData.selectedHour ? (
            <p>
              Fecha y Hora: {appointmentData.selectedDate}
              {"  "}
              {appointmentData.selectedHour}
            </p>
          ) : (
            <p>No hay fecha ni hora reservada</p>
          )}
          <AvailableHoursBlock
            availableHours={appointmentData.availableHours}
            onHourClick={(hour) => {
              setAppointmentData((prevData) => ({
                ...prevData,
                selectedHour: hour,
              }));
            }}
            selectedDate={appointmentData.selectedDate}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
