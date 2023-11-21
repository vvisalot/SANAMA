"use client";
import React, { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { useRouter, useParams, usePathname } from "next/navigation";
import MedicalRecordsTable from "@/components/MedicalRecordsTable";
import { parseHojaMedicaTable } from "@/util/medicalRecordParser";
import usePatientForm from "@/hooks/usePatientForm";
import { sexParser } from "@/util/patientParser";
import TitleWithIcon from "@/components/TitleWithIcon";
import iconoHistorial from "@/components/icons/iconoHistorial";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";

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
  const [isModalOpen, SetisModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await patientService.mostrarPacienteRegistrado(idPaciente);

        setPatientForm({
          ...patientForm,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          nombres: data.nombres,
          tipoSeguro: data.tipoSeguro,
          codigoSeguro: data.codigoSeguro,
          dni: data.dni,
          direccion: data.direccion,
          telefono: data.telefono,
          correo: data.correo,
          sexo: sexParser(data.sexo),
          fechaNacimiento: data.fechaNacimiento,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await patientService.buscarHistorialClinico(idPaciente);
        const tableData = parseHojaMedicaTable(data.hojasMedicas);
        setHistorialClinico({
          idHistorialClinico: data.idHistorialClinico,
          codigo: data.codigo,
          estadoHojaMedica: true,
        });
        setHojasMedicas(tableData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (idPaciente) {
      fetchHistorial();
    }
  }, [idPaciente]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el historial clínico</p>;
  if (!historialClinico) return <p>No se encontró el historial clínico</p>;

  const PatientDataDisplay = ({ patient }) => (
    <div className="flex flex-wrap mb-2 space-x-32 px-4">
      <div className="flex-1 min-w-1/2">
        <p className="flex justify-between">
          <strong className="mr-2">Nombre:</strong>
          <span>{`${patient.nombres} ${patient.apellidoPaterno} ${patient.apellidoMaterno}`}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">DNI:</strong>
          <span>{patient.dni}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Fecha de Nacimiento:</strong>
          <span>{patient.fechaNacimiento}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Sexo:</strong>
          <span>{patient.sexo}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Código de Seguro:</strong>
          <span>{patient.codigoSeguro}</span>
        </p>
      </div>

      <div className="flex-1 min-w-1/2">
        <p className="flex justify-between">
          <strong className="mr-2">Dirección:</strong>
          <span>{patient.direccion}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Teléfono:</strong>
          <span>{patient.telefono}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Correo Electrónico:</strong>
          <span>{patient.correo}</span>
        </p>
        <p className="flex justify-between">
          <strong className="mr-2">Tipo de Seguro:</strong>
          <span>{patient.tipoSeguro}</span>
        </p>
      </div>
    </div>
  );

  const options = [
    {
      text: "Ver resultados",
      link: "/",
      icon: "/icons/eye.svg",
    },
    {
      text: "Ver laboratorios",
      link: "/",
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
          <PatientDataDisplay patient={patientForm} />
        </div>

        <div className=" flex mb-6 space-x-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push(`${pathname}/new/`)}
          >
            Nueva Evaluacion Medica
          </button>
          <button
            onClick={() => SetisModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Nueva Orden de Laboratorio
          </button>

          <LaboratoryModal
            isOpen={isModalOpen}
            onClose={() => SetisModalOpen(false)}
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
