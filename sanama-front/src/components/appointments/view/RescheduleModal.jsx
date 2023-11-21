import React, { useState, useEffect } from "react";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { appointmentService } from "@/services/appointmentService";
import { CustomCalendar } from "./CustomCalendar";
import { Modal } from "flowbite-react";
import swal from "sweetalert";
import PropTypes from "prop-types";
import {
  useAvailableDays,
  useAvailableHours,
} from "@/hooks/useDoctorAppointments";

const RescheduleModal = ({ isOpen, onClose, medicId, appointmentId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const highlightedDates = useAvailableDays(medicId);
  const availableHours = useAvailableHours(selectedDate, medicId);

  useEffect(() => {
    if (isOpen) {
      setIsStatusUpdated(false);
    }
  }, [isOpen]);

  const handleHourChange = (newHour) => setSelectedHour(newHour);

  const handleConfirm = async () => {
    if (selectedDate && selectedHour) {
      swal({
        title: "¿Estás seguro?",
        text: "Confirmarás la nueva fecha y hora para la cita.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willConfirm) => {
        if (willConfirm) {
          setIsConfirming(true);
          try {
            const selectedHourNewFormat = selectedHour.substr(0, 5);
            const response = await appointmentService.actualizarHoraFecha(
              appointmentId,
              selectedHourNewFormat,
              selectedDate
            );
            setIsStatusUpdated(true);
            swal(
              "¡Confirmado!",
              "El horario de la cita se ha actualizado exitosamente.",
              "success"
            );
          } catch (error) {
            console.error("Error al confirmar reprogramación:", error);
            swal(
              "Error",
              "No se pudo actualizar el horario de la cita.",
              "error"
            );
          } finally {
            setIsConfirming(false);
            onClose();
          }
        }
      });
    } else {
      swal(
        "Información incompleta",
        "Por favor, selecciona una fecha y hora.",
        "info"
      );
    }
  };

  return (
    <Modal show={isOpen} size="lg" onClose={onClose}>
      <Modal.Header>Selecciona una Fecha y hora disponible:</Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <p className="mb-4">
              {selectedDate && selectedHour
                ? `Reservar el: ${selectedDate} ${selectedHour}`
                : "No hay fecha ni hora reservada"}
            </p>
          </div>
          <div className="flex gap-4">
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
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleConfirm}
          disabled={isConfirming || isStatusUpdated}
        >
          {"Confirmar"}
        </button>
        <button onClick={onClose} disabled={isConfirming}>
          Cancelar
        </button>
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
