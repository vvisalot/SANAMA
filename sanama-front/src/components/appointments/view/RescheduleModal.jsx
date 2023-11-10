import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { doctorService } from "@/services/doctorService";
import { appointmentService } from "@/services/appointmentService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";

import { Modal } from "flowbite-react";
import PropTypes from "prop-types";

const RescheduleModal = ({ isOpen, onClose, medicId, appointmentId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setIsStatusUpdated(false);
    }
  }, [isOpen]);

  const handleDateChange = (newDate) =>
    setSelectedDate(dayjs(newDate).format("YYYY-MM-DD"));
  const handleHourChange = (newHour) => setSelectedHour(newHour);

  const handleConfirm = async () => {
    if (selectedDate && selectedHour) {
      setIsConfirming(true);
      try {
        const selectedHourNewFormat = selectedHour.substr(0, 5);
        const response = await appointmentService.actualizarHoraFecha(
          appointmentId,
          selectedHourNewFormat,
          selectedDate
        );
        console.log(response);
        setIsStatusUpdated(true);
        setConfirmationMessage(
          "El horario de la cita se ha actualizado exitosamente."
        );
      } catch (error) {
        console.error("Error al confirmar reprogramación:", error);
      } finally {
        setIsConfirming(false);
      }
    } else {
      console.error("Fecha y hora no seleccionadas");
    }
  };

  const handleAccept = () => {
    onClose();
  };

  return (
    <Modal show={isOpen} size="lg" onClose={onClose}>
      <Modal.Header>Selecciona una Fecha y hora disponible:</Modal.Header>
      {isStatusUpdated ? (
        <>
          <Modal.Body>
            <p>{confirmationMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleAccept}>Aceptar</button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Body>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex">
                <DateCalendar
                  onChange={handleDateChange}
                  value={selectedDate ? dayjs(selectedDate) : null}
                  highlightDates={highlightedDays}
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
                  />
                </div>
              </div>
            </LocalizationProvider>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleConfirm}
              disabled={isConfirming || isStatusUpdated}
            >
              {isConfirming ? "Confirmando..." : "Confirmar"}
            </button>
            <button onClick={onClose} disabled={isConfirming}>
              Cancelar
            </button>
          </Modal.Footer>
        </>
      )}
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
