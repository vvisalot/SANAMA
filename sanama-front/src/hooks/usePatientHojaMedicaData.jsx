import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";

const usePatientHojaMedicaData = (idEvaluation) => {
  const [medicalRecordData, setMedicalRecordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      setLoading(true);
      try {
        const data = await attentionService.buscarHojaMedicaPaciente(
          idEvaluation
        );
        setMedicalRecordData(data);
      } catch (error) {
        setErrorMessageMedicalRecordForm(
          "Error fetching medical record: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [idEvaluation]);

  return { medicalRecordData, loading, errorMessageMedicalRecordForm };
};

export default usePatientHojaMedicaData;
