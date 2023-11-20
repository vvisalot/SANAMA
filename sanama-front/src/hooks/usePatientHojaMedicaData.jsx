"use client";
import { useState } from "react";

const usePatientHojaMedicaData = (idEvaluation) => {
  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  return {
    medicalRecordData,
    loading,
    errorMessageMedicalRecordForm,
  };
};

export default usePatientHojaMedicaData;
