"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

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
