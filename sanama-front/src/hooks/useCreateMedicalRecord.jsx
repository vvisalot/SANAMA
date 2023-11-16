import { useState } from "react";
import { patientService } from "@/services/patientService";

const useCreateMedicalRecord = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const createMedicalRecord = async (idCita, idHistorialClinico) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toTimeString().split(" ")[0];

    const newMedicalRecord = {
      idHistorialClinico: idHistorialClinico,
      hojasMedicas: [
        {
          idCitaMedica: idCita,
          hojaRefencia: null,
          horaAtencion: formattedTime.slice(0, 5),
          fechaAtencion: formattedDate,
        },
      ],
    };

    try {
      const response = await patientService.registrarHojaMedica(
        newMedicalRecord
      );
      if (response && response !== -1) {
        alert("¡Nueva Hoja Médica creada con éxito!");
        console.log("New Medical Record created successfully:", response);
      } else {
        alert("Error al crear la Hoja Médica. Respuesta no exitosa.");
        console.error(
          "Failed to create the new medical record: Response was not successful."
        );
        setSubmissionError(
          "Error al crear la Hoja Médica. Respuesta no exitosa."
        );
      }
    } catch (error) {
      alert("Error al crear la Hoja Médica. Por favor, intente de nuevo.");
      console.error("Error:", error);
      setSubmissionError(
        "Error al crear la Hoja Médica. Por favor, intente de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createMedicalRecord, isSubmitting, submissionError };
};

export default useCreateMedicalRecord;
