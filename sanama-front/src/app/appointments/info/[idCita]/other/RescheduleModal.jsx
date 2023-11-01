import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { medicService } from "../../services/medicService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  PickersDay,
  DateCalendar,
} from "@mui/x-date-pickers";
import { Badge, Modal, Spinner } from "flowbite-react";
import useAppointmentReschedule from "@/hooks/useAppointmentReschedule";

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

const RescheduleModal = ({
  show,
  onClose,
  onSelect,
  appointmentId,
  medicId,
  selectedDate,
  onDateChange,
  selectedHour,
  onHourChange,
}) => {
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const {
    updateAppointmentHorario,
    loading,
    error,
    isStatusUpdated,
    confirmationMessage,
  } = useAppointmentReschedule();

  const fetchAvailableHours = useCallback(
    (fecha) => {
      medicService
        .buscarHorariosByID(fecha, medicId)
        .then((data) => setAvailableHours(data))
        .catch((error) =>
          console.error("Error fetching available hours:", error)
        );
    },
    [medicId]
  );

  const fetchAvailableDays = useCallback(() => {
    medicService
      .DiasDisponiblesByID(medicId)
      .then((data) => {
        setAvailableDays(data);
        const daysToHighlight = data.map((date) =>
          dayjs(date).format("YYYY-MM-DD")
        );
        setHighlightedDays(daysToHighlight);
      })
      .catch((error) => console.error("Error fetching available days:", error));
  }, [medicId]);

  useEffect(() => {
    if (medicId) {
      fetchAvailableDays();
    }
  }, [medicId, fetchAvailableDays]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableHours(selectedDate);
    }
  }, [selectedDate, fetchAvailableHours]);

  const handleDateChange = useCallback(
    (newDate) => {
      onDateChange(dayjs(newDate).format("YYYY-MM-DD"));
    },
    [onDateChange]
  );

  const handleConfirm = async () => {
    if (selectedDate && selectedHour) {
      await updateAppointmentHorario(appointmentId, selectedHour, selectedDate);
      if (isStatusUpdated) {
        onSelect();
        onClose();
      }
    } else {
      console.error("Fecha y hora no seleccionadas");
    }
  };

  return (
    <Modal show={show} size="lg" popup={true} onClose={onClose}>
      <Modal.Header>
        <h2 className="text-lg font-semibold mb-4">
          Selecciona una Fecha y hora disponible:
        </h2>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {confirmationMessage && (
          <p className="text-green-500 mb-4">{confirmationMessage}</p>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col md:flex-row">
            <DateCalendar
              onChange={handleDateChange}
              value={selectedDate ? dayjs(selectedDate) : null}
              slots={{ day: ServerDay }}
              slotProps={{ day: { highlightedDays } }}
            />
            <div className="flex flex-col ml-4 mt-4 md:mt-0">
              {selectedDate && selectedHour ? (
                <p className="mb-4">
                  Fecha y Hora: {selectedDate} {selectedHour}
                </p>
              ) : (
                <p className="mb-4">No hay fecha ni hora reservada</p>
              )}
              <AvailableHoursBlock
                availableHours={availableHours}
                onHourClick={onHourChange}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </LocalizationProvider>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" light={true} /> : "Confirmar"}
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          onClick={onClose}
        >
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RescheduleModal;
