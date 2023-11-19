"use client";
import { useState } from "react";
import { toast } from "sonner";

const useMedicalRecordForm = () => {
  const [medicalRecordData, setMedicalRecordData] = useState({
    hojaRefencia: null,
    firma: "",
    idCitaMedica: -1, // default value
    evaluacionMedica: {
      motivoConsulta: "",
      antecedentes: "",
      examenGeneral: "",
      pielYFaneras: "",
      cabezaYCuello: "",
      toraxYPulmones: "",
      cardiovascular: "",
      abdomen: "",
      urogenital: "",
      extremidades: "",
      snc: "",
      glasgow: "",
      eyesOpen: "",
      talkingCorrectly: "",
      ableToMoveBody: "",
      observaciones: "",
      indicacionesFinales: "",
      requiereSignosVitales: false,
      signosVitales: {
        temperatura: "",
        frecuenciaCardiaca: "",
        frecuenciaRespiratoria: "",
        presionArterial: "",
        saturacionOxigeno: "",
        peso: "",
        talla: "",
      },
      diagnosticos: [],
    },
    recetaMedica: {
      fechaCaducidad: "",
      medicamentos: [],
    },
  });

  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  const validateMedicalRecordForm = () => {
    if (!medicalRecordData.idCitaMedica) {
      setErrorMessageMedicalRecordForm(
        "Please specify the medical appointment ID."
      );
      toast.error(errorMessageMedicalRecordForm);
      return false;
    }
    // More validations...

    setErrorMessageMedicalRecordForm("");
    return true;
  };

  return {
    medicalRecordData,
    setMedicalRecordData,
    validateMedicalRecordForm,
  };
};

export default useMedicalRecordForm;
