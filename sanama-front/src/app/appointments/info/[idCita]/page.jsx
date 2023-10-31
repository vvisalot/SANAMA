"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import { appointmentService } from "@/services/appointmentService";
import PatientInfo from "./PatientInfo";
import AppointmentInfo from "./AppointmentInfo";

const ReviewAppointment = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { updateAppointmentStatus } = useUpdateAppointmentStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await appointmentService.buscarCita(params.idCita);
        if (data && data.length > 0) {
          setAppointmentData(data[0]);
        } else {
          setError("No se encontraron datos de la cita");
        }
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al cargar los datos de la cita");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.idCita]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!appointmentData) {
    return null;
  }

  const {
    selectedPatientData: pacienteData,
    selectedDoctor: doctorResponsable,
    estado,
  } = appointmentData;

  const handleActionClick = async (status) => {
    try {
      setLoading(true);
      await updateAppointmentStatus(appointmentData.idCita, status);
      // Actualizar la interfaz de usuario según sea necesario
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al actualizar el estado de la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <PatientInfo pacienteData={pacienteData} />
      <AppointmentInfo
        appointmentData={appointmentData}
        doctor={doctorResponsable}
      />

      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md"
        onClick={() => handleActionClick(2)}
        disabled={loading || estado === "EN_CONSULTORIO"}
      >
        Atender Cita
      </button>
      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md mt-2"
        onClick={() => handleActionClick(/* estado adecuado */)}
        disabled={loading}
      >
        Reprogramar Cita
      </button>
      <button
        className="bg-red-500 text-white p-2 w-full rounded-md mt-2"
        onClick={() => handleActionClick(3)}
        disabled={loading || estado === "CANCELADA"}
      >
        Cancelar Cita
      </button>
      <Link href="/AppointmentManagement">
        <a className="block bg-gray-500 text-white p-2 w-full rounded-md text-center mt-2">
          Volver
        </a>
      </Link>
    </div>
  );
};

export default ReviewAppointment;
