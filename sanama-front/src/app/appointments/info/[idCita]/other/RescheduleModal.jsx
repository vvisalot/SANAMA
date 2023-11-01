import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { doctorService } from "@/services/doctorService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { Modal } from "flowbite-react";
import PropTypes from "prop-types";

const RescheduleModal = ({ isOpen, onClose, medicId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableDays = useCallback(async () => {
    try {
      const data = await doctorService.DiasDisponiblesByID(medicId);
      setHighlightedDays(data.map((date) => dayjs(date).format("YYYY-MM-DD")));
    } catch (error) {
      console.error("Error fetching available days:", error);
    }
  }, [medicId]);

  const fetchAvailableHours = useCallback(
    async (fecha) => {
      try {
        const data = await doctorService.buscarHorariosMedicoFecha(
          fecha,
          medicId
        );
        setAvailableHours(data);
      } catch (error) {
        console.error("Error fetching available hours:", error);
      }
    },
    [medicId]
  );

  useEffect(() => {
    if (medicId) fetchAvailableDays();
  }, [medicId, fetchAvailableDays]);
  useEffect(() => {
    if (selectedDate) fetchAvailableHours(selectedDate);
  }, [selectedDate, fetchAvailableHours]);

  const handleDateChange = (newDate) =>
    setSelectedDate(dayjs(newDate).format("YYYY-MM-DD"));
  const handleHourChange = (newHour) => setSelectedHour(newHour);

  const handleConfirm = async () => {
    if (selectedDate && selectedHour) {
      setLoading(true);
      try {
        // Lógica para actualizar el horario de la cita
      } catch (error) {
        console.error("Error al confirmar reprogramación:", error);
      }
      setLoading(false);
    } else {
      console.error("Fecha y hora no seleccionadas");
    }
  };

  return (
    <Modal show={isOpen} size="lg" onClose={onClose}>
      <Modal.Header>Selecciona una Fecha y hora disponible:</Modal.Header>
      <Modal.Body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex">
            <DateCalendar
              onChange={handleDateChange}
              value={selectedDate ? dayjs(selectedDate) : null}
            />
            <div className="ml-4">
              <p className="mb-4">
                {selectedDate && selectedHour
                  ? `Fecha y Hora: ${selectedDate} ${selectedHour}`
                  : "No hay fecha ni hora reservada"}
              </p>
              <AvailableHoursBlock
                availableHours={availableHours}
                onHourClick={handleHourChange}
                selectedHour={selectedHour}
                isLoading={loading}
              />
            </div>
          </div>
        </LocalizationProvider>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleConfirm} disabled={loading}>
          Confirmar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </Modal.Footer>
    </Modal>
  );
};

RescheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  medicId: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default RescheduleModal;
