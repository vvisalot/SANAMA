import React, { useState, useEffect } from "react";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { appointmentService } from "@/services/appointmentService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomCalendar } from "./CustomCalendar";
import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import {
  useAvailableDays,
  useAvailableHours,
} from "@/hooks/useDoctorAppointments";

const RescheduleModal = ({ isOpen, onClose, medicId, appointmentId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const highlightedDates = useAvailableDays(medicId);
  const availableHours = useAvailableHours(selectedDate, medicId);

  useEffect(() => {
    if (isOpen) {
      setIsStatusUpdated(false);
    }
  }, [isOpen]);

  console.log(highlightedDates);

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
              <div>
                <div>
                  <p className="mb-4">
                    {selectedDate && selectedHour
                      ? `Fecha y Hora: ${selectedDate} ${selectedHour}`
                      : "No hay fecha ni hora reservada"}
                  </p>
                </div>
                <div className="flex">
                  <CustomCalendar
                    highlightedDates={highlightedDates}
                    onDaySelect={setSelectedDate}
                  />
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
