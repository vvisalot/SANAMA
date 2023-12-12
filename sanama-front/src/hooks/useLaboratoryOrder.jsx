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

  const handleSave = async () => {
    const laboratorioData = {
      idOrdenLaboratorio: dataLaboratory.idOrdenLaboratorio,
      doctorFirmante: dataLaboratory.doctorFirmante,
      estado: 1,
      examenMedico: dataLaboratory.examenMedico,
      observaciones: dataLaboratory.observaciones,
    };

    const incompleteFields = [];
    for (let key in laboratorioData) {
      const value = laboratorioData[key];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && !value.trim())
      ) {
        incompleteFields.push(key);
      }
    }

    if (incompleteFields.length > 0) {
      setError(
        `Please complete the following fields: ${incompleteFields.join(", ")}`
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await laboratoryService.atenderOrdenLaboratorio(
        laboratorioData
      );

      if (result === 1) {
      } else {
        setError(
          "There was a problem saving the information. Please try again."
        );
      }
    } catch (error) {
      console.error("Error saving laboratory order", error);
      setError("There was an error saving. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAnulacion = async () => {
    const laboratorioDataCancelled = {
      idOrdenLaboratorio: dataLaboratory.idOrdenLaboratorio,
      doctorFirmante: "Default Doctor",
      estado: 3,
      examenMedico: [],
      observaciones: "Cancelled",
    };

    try {
      const result = await laboratoryService.atenderOrdenLaboratorio(
        laboratorioDataCancelled
      );

      if (result === 1) {
        if (typeof window !== "undefined") {
          window.history.back();
        }
      } else {
        setError(
          "There was a problem canceling the laboratory order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error canceling laboratory order", error);
      setError(
        "There was an error canceling the laboratory order. Please try again."
      );
    }
  };

  return {
    medicos,
    dataLaboratory,
    setDataLaboratory,
    handleSave,
    handleConfirmAnulacion,
    isLoading,
    error,
    handleMedicoChange,
  };
};

export default useLaboratoryProfile;
