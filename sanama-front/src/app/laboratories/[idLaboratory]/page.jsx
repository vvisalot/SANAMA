"use client";
import { useState } from "react";
import useLaboratoryProfile from "@/hooks/useLaboratoryOrder";
import ActionButtonsLab from "@/components/laboratory/ActionButtonsLab";
import LaboratoryInfoSection from "@/components/laboratory/LaboratoryInfoSection";
import LaboratoryExamInfoSection from "@/components/laboratory/LaboratoryExamInfoSection";
import TitleWithIcon from "@/components/TitleWithIcon";
import viewAppointmentIcon from "@/components/icons/viewAppointmentIcon";

const LaboratoryProfile = ({ params }) => {
  const {
    medicos,
    handleMedicoChange,
    dataLaboratory,
    setDataLaboratory,
    handleSave,
    isLoading,
    error,
  } = useLaboratoryProfile(params.idLaboratory);

  const [isEditable, setIsEditable] = useState(false);

  const handleAttendClick = () => {
    setIsEditable(!isEditable);
  };

  const handleCancelClick = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleConfirm = async () => {
    try {
      await handleSave();
    } catch (error) {
      console.error("Error handling confirmation:", error);
    }
  };

  return (
    <section className="rounded-lg p-8 mx-auto flex flex-col space-y-6 md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
      <TitleWithIcon name={"Orden de laboratorio"} Icon={viewAppointmentIcon} />
      <div className="flex place-content-between w-full mb-4 justify-end">
        <ActionButtonsLab
          loading={isLoading}
          handleAttendClick={handleAttendClick}
          handleCancelClick={handleCancelClick}
        />
      </div>
      <LaboratoryInfoSection dataLaboratory={dataLaboratory} />
      <LaboratoryExamInfoSection
        medicos={medicos}
        handleMedicoChange={handleMedicoChange}
        dataLaboratory={dataLaboratory}
        setDataLaboratory={setDataLaboratory}
        isEditable={isEditable}
      />
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          onClick={handleConfirm}
          className={`${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none`}
          disabled={isLoading}
        >
          {isLoading ? "Confirming..." : "Confirmar"}
        </button>
      </div>
    </section>
  );
};

export default LaboratoryProfile;
