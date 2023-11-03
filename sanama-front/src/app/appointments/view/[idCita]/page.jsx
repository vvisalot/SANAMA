"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { appointmentService } from "@/services/appointmentService";
import PatientInfo from "@/components/appointments/view/PatientInfo";
import AppointmentInfo from "@/components/appointments/view/AppointmentInfo";
import RescheduleModal from "@/components/appointments/view/RescheduleModal";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import useAppointmentReschedule from "@/hooks/useAppointmentReschedule";
import { useRouter } from "next/navigation";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

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

  const handleAttendClick = () => {
    handleActionClick(2).then(() =>
      router.push(`/medicalHistory/${appointmentData.paciente.idPersona}`)
    );
  };

  const handleCancelClick = () =>
    handleActionClick(3).then(() => setHasBeenCanceled(true));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Manage Appointment</h1>
      <PatientInfo pacienteData={appointmentData.paciente} />
      <AppointmentInfo
        appointmentData={appointmentData}
        doctor={appointmentData.medico}
      />

      <ActionButtons
        estado={estado}
        loading={loading}
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
            className={`bg-red-500 text-white p-2 w-full rounded-md mt-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCancelClick}
            disabled={loading || hasBeenCanceled}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#FFFFFF"
                  />
                </svg>
                Cargando...
              </>
            ) : (
              "Cancelar Cita"
            )}
          </button>
        </>
      )}
    </>
  );
};

export default ReviewAppointment;
