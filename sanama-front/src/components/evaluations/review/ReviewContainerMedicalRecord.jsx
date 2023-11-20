"use client";
import React, { useState } from "react";
import useMedicalRecordForm from "@/hooks/useMedicalRecordForm";
import ReviewFormEvaluation from "./ReviewFormEvaluation";
import { toast } from "sonner";
import ViewSignature from "@/components/evaluations/ViewSignature";

const ReviewContainerMedicalRecord = ({ defaultTriaje }) => {
  const { medicalRecordData, setMedicalRecordData, validateMedicalRecordForm } =
    useMedicalRecordForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-max w-full">
      <ReviewFormEvaluation
        defaultTriaje={defaultTriaje}
        setMedicalRecordData={setMedicalRecordData}
      />
      <div className="flex flex-row-reverse">
        <ViewSignature setMedicalRecordData={setMedicalRecordData} />

        <button
          onClick={handleSubmit}
          className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          Volver
        </button>
      </div>
    </form>
  );
};

export default ReviewContainerMedicalRecord;
