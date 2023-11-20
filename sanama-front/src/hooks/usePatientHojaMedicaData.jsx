import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";
import { patientService } from "@/services/patientService";
const usePatientHojaMedicaData = (idEvaluation, idPaciente) => {
  const [medicalRecordData, setMedicalRecordData] = useState(null);
  const [patientData, setPatientData] = useState(null);
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

  useEffect(() => {
    const fecthPatientData = async () => {
      setLoading(true);
      try {
        const data = await patientService.mostrarPacienteRegistrado(idPaciente);
        setPatientData(data);
      } catch (error) {
        setErrorMessageMedicalRecordForm(
          "Error fetching patient data: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fecthPatientData();
  }, [idPaciente]);

  return {
    patientData,
    medicalRecordData,
    loading,
    errorMessageMedicalRecordForm,
  };
};

export default usePatientHojaMedicaData;
