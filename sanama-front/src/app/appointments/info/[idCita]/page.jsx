"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { appointmentService } from "@/services/appointmentService";
import PatientInfo from "./PatientInfo";
import AppointmentInfo from "./AppointmentInfo";
import RescheduleModal from "./RescheduleModal";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import useAppointmentReschedule from "@/hooks/useAppointmentReschedule";
import { useRouter } from "next/router";

const ReviewAppointment = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasBeenCanceled, setHasBeenCanceled] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const router = useRouter();
  const openRescheduleModal = () => setIsRescheduleModalOpen(true);
  const closeRescheduleModal = () => setIsRescheduleModalOpen(false);

  const {
    updateAppointmentStatus,
    confirmationMessage,
    isStatusUpdated,
    error: statusUpdateError,
  } = useUpdateAppointmentStatus();

  const { appointmentReschedule } = useAppointmentReschedule();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await appointmentService.buscarCita(params.idCita);
        setAppointmentData(
          data || `No se encontraron datos de la cita  ${params.idCita}`
        );
      } catch (error) {
        setError("Ocurrió un error al cargar los datos de la cita");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.idCita, isStatusUpdated]);

  useEffect(() => {
    if (statusUpdateError) {
      setError(statusUpdateError);
    } else if (confirmationMessage) {
      console.log(confirmationMessage);
    }
  }, [statusUpdateError, confirmationMessage]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!appointmentData) return null;

  const { idCita, estado } = appointmentData;

  const handleActionClick = async (status) => {
    try {
      setLoading(true);
      await updateAppointmentStatus(idCita, status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () =>
    handleActionClick(3).then(() => setHasBeenCanceled(true));

  const handleAttendClick = () => {
    handleActionClick(2).then(() =>
      router.push(`/medicalHistory/${appointmentData.paciente.idPersona}`)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <PatientInfo pacienteData={appointmentData.paciente} />
      <AppointmentInfo
        appointmentData={appointmentData}
        doctor={appointmentData.medico}
      />

      <ActionButtons
        estado={estado}
        loading={loading}
        handleActionClick={handleActionClick}
        openRescheduleModal={openRescheduleModal}
        handleCancelClick={handleCancelClick}
        hasBeenCanceled={hasBeenCanceled}
        handleAttendClick={handleAttendClick}
      />

      <Link href="/appointments" passHref>
        <href className="block bg-gray-500 text-white p-2 w-full rounded-md text-center mt-2">
          Volver
        </href>
      </Link>

      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={closeRescheduleModal}
        medicId={appointmentData.medico.idPersona}
        appointmentId={appointmentData.idCita}
      />
    </div>
  );
};

const ActionButtons = ({
  estado,
  loading,
  handleActionClick,
  openRescheduleModal,
  handleCancelClick,
  hasBeenCanceled,
  handleAttendClick,
}) => {
  return (
    <>
      {estado === 4 && (
        <>
          <button
            className="block bg-blue-500 text-white p-2 w-full rounded-md text-center mt-2"
            onClick={handleAttendClick}
            disabled={loading}
          >
            Atender Cita
          </button>

          <button
            className="bg-blue-500 text-white p-2 w-full rounded-md mt-2"
            onClick={openRescheduleModal}
            disabled={loading}
          >
            Reprogramar Cita
          </button>

          <button
            className="bg-red-500 text-white p-2 w-full rounded-md mt-2"
            onClick={handleCancelClick}
            disabled={loading || hasBeenCanceled}
          >
            Cancelar Cita
          </button>
        </>
      )}
    </>
  );
};

export default ReviewAppointment;
