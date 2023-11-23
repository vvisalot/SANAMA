"use client";
import React, { useState, useEffect, useCallback } from "react";
import { patientService } from "@/services/patientService";
import { useRouter, useParams, usePathname } from "next/navigation";
import MedicalRecordsTable from "@/components/MedicalRecordsTable";
import { parseHojaMedicaTable } from "@/util/medicalRecordParser";
import usePatientForm from "@/hooks/usePatientForm";
import { sexParser } from "@/util/patientParser";
import TitleWithIcon from "@/components/TitleWithIcon";
import iconoHistorial from "@/components/icons/iconoHistorial";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import { appointmentService } from "@/services/appointmentService";

const HistorialClinico = () => {
  const params = useParams();
  const pathname = usePathname();
  const idPaciente = params.idPaciente;
  const idCita = params.idCita;
  const router = useRouter();

  const { patientForm, setPatientForm } = usePatientForm();
  const [historialClinico, setHistorialClinico] = useState(null);
  const [hojasMedicas, setHojasMedicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatusId, setCurrentStatusId] = useState(null);
  const [isEvaluationCreated, setIsEvaluationCreated] = useState(false);
  const [idValue, setIdValue] = useState(null);

  const fetchCitaStatus = async () => {
    try {
      const data = await appointmentService.getStatusCita(idCita);
      console.log("EL ESTADO ES: ", data)
      const idValue = data.idValue;
      console.log("ID Value: ", idValue); 
      setIdValue(data.idValue); 
    } catch (error) {
      console.error(error);
    }
  };  
  fetchCitaStatus(); 

  useEffect(() => {
    fetchCitaStatus();
  }, [idCita]);

  const isEvaluationButtonDisabled = idValue === 1 || idValue === 4 || idValue === 5;
  const isOrderButtonDisabled = idValue === 2 || idValue === 4 || idValue === 5;
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [patientData, medicalHistoryData] = await Promise.all([
        patientService.mostrarPacienteRegistrado(idPaciente),
        patientService.buscarHistorialClinico(idPaciente),
      ]);

      setPatientForm((prevForm) => ({
        ...prevForm,
        ...patientData,
        sexo: sexParser(patientData.sexo),
      }));

      const tableData = parseHojaMedicaTable(medicalHistoryData.hojasMedicas);
      setHistorialClinico({
        idHistorialClinico: medicalHistoryData.idHistorialClinico,
        codigo: medicalHistoryData.codigo,
        estadoHojaMedica: true,
      });
      setHojasMedicas(tableData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [idPaciente, setPatientForm]);

  useEffect(() => {
    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente, fetchData]);

  const handleNewMedicalEvaluation = useCallback(() => {
    router.push(`${pathname}/new/`);
    setIsEvaluationCreated(true);
  }, [router, pathname]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el historial clínico</p>;
  if (!historialClinico) return <p>No se encontró el historial clínico</p>;

  const options = [
    {
      text: "Ver hoja médica",
      link: "/",
      icon: "/icons/eye.svg",
    },
    {
      text: "Ver laboratorios",
      link: "/laboratories",
      icon: "/icons/eye.svg",
    },
  ];

  return (
    <section className="p-4 md:p-14 h-screen">
      <TitleWithIcon name={`Atencion Medica`} Icon={iconoHistorial} />
      <div className="bg-gray-100 max-h-screen p-4 md:p-8">
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-4">
            Historial Clínico: {historialClinico.codigo}
          </h1>
          <div className="flex flex-wrap mb-2 space-x-32 px-4">
            <div className="flex-1 min-w-1/2">
              <p className="flex justify-between">
                <strong className="mr-2">Nombre:</strong>
                <span>{`${patientForm.nombres} ${patientForm.apellidoPaterno} ${patientForm.apellidoMaterno}`}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">DNI:</strong>
                <span>{patientForm.dni}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Fecha de Nacimiento:</strong>
                <span>{patientForm.fechaNacimiento}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Sexo:</strong>
                <span>{patientForm.sexo}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Código de Seguro:</strong>
                <span>{patientForm.codigoSeguro}</span>
              </p>
            </div>
            <div className="flex-1 min-w-1/2">
              <p className="flex justify-between">
                <strong className="mr-2">Dirección:</strong>
                <span>{patientForm.direccion}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Teléfono:</strong>
                <span>{patientForm.telefono}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Correo Electrónico:</strong>
                <span>{patientForm.correo}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Tipo de Seguro:</strong>
                <span>{patientForm.tipoSeguro}</span>
              </p>
            </div>
          </div>
        </div>

        <div className=" flex mb-6 space-x-4">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNewMedicalEvaluation}
            disabled={isEvaluationButtonDisabled}
          >
            Nueva Evaluacion Medica
          </button>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isOrderButtonDisabled}
          >
            Nueva Orden de Laboratorio
          </button>

          <LaboratoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            appointmentId={idCita}
          />
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Hojas Medicas Existentes:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-600">Desde:</label>
              <input className="border rounded p-2 w-full" type="date" />
            </div>
          </div>
          <MedicalRecordsTable
            data={hojasMedicas}
            options={options}
          ></MedicalRecordsTable>
        </div>
      </div>
    </section>
  );
};

export default HistorialClinico;
