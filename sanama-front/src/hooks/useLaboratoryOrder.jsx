"use client";
import { useState, useEffect } from "react";
import { laboratoryService } from "@/services/laboratoryService";

const useLaboratoryProfile = (idLaboratory) => {
  const [medicos, setMedicos] = useState([]);
  const [dataLaboratory, setDataLaboratory] = useState({
    idOrdenLaboratorio: null,
    codigoOrden: "",
    tipoMuestra: "",
    instrucciones: "",
    doctorFirmante: "",
    observaciones: "",
    citaMedica: {
      paciente: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        dni: "",
        fechaNacimiento: "",
        sexo: "",
      },
      medico: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    },
    examenMedico: [
      {
        idExamen: null,
        nombreArchivo: "",
        archivo: "",
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response =
          await laboratoryService.listarMedicosLaboratorioValidado();
        setMedicos(response);
      } catch (error) {
        setError("Error al obtener los médicos");
      }
    };

    fetchMedicos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await laboratoryService.buscarOrdenLaboratorioPorId(
          idLaboratory
        );
        setDataLaboratory(data);
      } catch (error) {
        setError("Error al obtener la orden de laboratorio");
      }
    };
    fetchData();
  }, [idLaboratory]);

  const handleMedicoChange = (event) => {
    const selectedMedicoId = Number(event.target.value);

    const selectedMedico = medicos.find(
      (medico) => medico.idValue === selectedMedicoId
    );

    setDataLaboratory((prevData) => ({
      ...prevData,
      doctorFirmante: selectedMedico ? selectedMedico.descripcion : "",
    }));
  };

  // Otras funciones y lógica relacionada a la manipulación de datos

  return {
    medicos,
    dataLaboratory,
    setDataLaboratory,
    isLoading,
    error,
    handleMedicoChange,
    // ... otras funciones y propiedades que necesites exponer
  };
};

export default useLaboratoryProfile;
