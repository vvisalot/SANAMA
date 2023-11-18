"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { appointmentService } from "@/services/appointmentService";
import PatientInfo from "@/components/appointments/view/PatientInfo";
import RescheduleModal from "@/components/appointments/view/RescheduleModal";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import { useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import viewAppointmentIcon from "@/components/icons/viewAppointmentIcon";
import TitleWithIcon from "@/components/TitleWithIcon";

const ReviewAppointment = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasBeenCanceled, setHasBeenCanceled] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const router = useRouter();
  const openRescheduleModal = () => setIsRescheduleModalOpen(true);
  const closeRescheduleModal = () => setIsRescheduleModalOpen(false);
  const pathname = usePathname();

  const {
    updateAppointmentStatus,
    confirmationMessage,
    isStatusUpdated,
    error: statusUpdateError,
  } = useUpdateAppointmentStatus();

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
    router;
    handleActionClick(2).then(
      router.push(`${pathname}/${appointmentData.paciente.idPersona}`)
    );
  };

  const handleCancelClick = () =>
    handleActionClick(3).then(() => setHasBeenCanceled(true));

  return (
    <section className="p-14 h-screen content-end">
      <TitleWithIcon name={"Cita Medica"} Icon={viewAppointmentIcon} />

      <div className="container mx-auto p-4 ">
        <div className="flex justify-end mb-6 w-full">
          <ActionButtons
            estado={estado}
            loading={loading}
            openRescheduleModal={openRescheduleModal}
            handleCancelClick={handleCancelClick}
            hasBeenCanceled={hasBeenCanceled}
            handleAttendClick={handleAttendClick}
            doctor={appointmentData.medico}
            pacienteData={appointmentData.paciente}
          />
        </div>
        <PatientInfo
          pacienteData={appointmentData.paciente}
          appointmentData={appointmentData}
          doctor={appointmentData.medico}
        />

        <div className="flex flex-row-reverse">
          <Link href="/appointments" passHref>
            <href className="block justify-self-end font-semibold bg-gray-500 text-white p-2 w-80 rounded-md text-center mt-2">
              Atras
            </href>
          </Link>
        </div>
      </div>
      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={closeRescheduleModal}
        medicId={appointmentData.medico.idPersona}
        appointmentId={appointmentData.idCita}
      />
    </section>
  );
};

const ActionButtons = ({
  estado,
  loading,
  openRescheduleModal,
  handleCancelClick,
  hasBeenCanceled,
  handleAttendClick,
  pacienteData,
  doctor,
}) => {
  const router = useRouter();
  return (
    <div className="flex">
      <button
        className="flex justify-center items-center font-semibold bg-blue-500 text-white p-2 rounded-md mr-4 mt-2 mb-2"
        onClick={() =>
          router.push(`/doctors/profile/${pacienteData.idPersona}`)
        }
      >
        Ir a Paciente
      </button>
      <button
        className="flex justify-center items-center font-semibold bg-blue-500 text-white p-2 rounded-md mr-4 mt-2 mb-2"
        onClick={() => router.push(`/doctors/profile/${doctor.idPersona}`)}
      >
        Ir a Doctor
      </button>
      {estado === 4 && (
        <>
          <button
            className="flex justify-center items-center font-semibold bg-green-500 text-white p-2 rounded-md mr-4 mt-2 mb-2"
            onClick={handleAttendClick}
            disabled={loading}
          >
            <MdEdit className="mr-2" />
            Atender
          </button>

          <button
            className="flex justify-center items-center font-semibold bg-orange-400 text-white p-2 rounded-md mr-4 mt-2 mb-2"
            onClick={openRescheduleModal}
            disabled={loading}
          >
            <MdEdit />
            Reprogramar
          </button>

          <button
            className={`flex justify-center items-center font-semibold bg-red-500 text-white p-2 rounded-md mt-2 mb-2 ${
              hasBeenCanceled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCancelClick}
            disabled={hasBeenCanceled}
          >
            <MdDelete />
            "Cancelar"
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewAppointment;
