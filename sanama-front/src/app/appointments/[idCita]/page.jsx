"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { appointmentService } from "@/services/appointmentService";
import PatientInfo from "@/components/appointments/view/PatientInfo";
import RescheduleModal from "@/components/appointments/view/RescheduleModal";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import TitleWithIcon from "@/components/TitleWithIcon";
import ActionButtons from "@/components/appointments/view/ActionButtons";
import viewAppointmentIcon from "@/components/icons/viewAppointmentIcon";

const ReviewAppointment = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasBeenCanceled, setHasBeenCanceled] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const router = useRouter();

  const { updateAppointmentStatus } = useUpdateAppointmentStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await appointmentService.buscarCita(params.idCita);
        setAppointmentData(
          data || `No se encontraron datos de la cita  ${params.idCita}`
        );
      } catch (error) {
        setError("Error al cargar los datos de la cita");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.idCita]);

  const handleActionClick = useCallback(
    async (status) => {
      try {
        setLoading(true);
        await updateAppointmentStatus(appointmentData.idCita, status);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [appointmentData, updateAppointmentStatus]
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!appointmentData) return null;

  return (
    <section className="p-14 h-screen content-end">
      <TitleWithIcon name={"Cita Medica"} Icon={viewAppointmentIcon} />
      <div className="flex place-content-between w-full">
        <div>
          <Link href="/appointments" passHref>
            <href class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              Volver a Citas
            </href>
          </Link>
        </div>
        <div className="flex">
          <ActionButtons
            estado={appointmentData.estado}
            loading={loading}
            setIsRescheduleModalOpen={setIsRescheduleModalOpen}
            setHasBeenCanceled={setHasBeenCanceled}
            handleActionClick={handleActionClick}
            idMedico={appointmentData.medico.idPersona}
            idPaciente={appointmentData.paciente.idPersona}
          />
        </div>
      </div>
      <PatientInfo
        pacienteData={appointmentData.paciente}
        appointmentData={appointmentData}
        doctor={appointmentData.medico}
      />

      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        medicId={appointmentData.medico.idPersona}
        appointmentId={appointmentData.idCita}
      />
    </section>
  );
};

export default ReviewAppointment;
