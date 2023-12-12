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
    if (dataLaboratory?.estado !== 3) {
      setDataLaboratory((prevData) => ({
        ...prevData,
        estado: 2,
      }));
    }
    setIsEditable(!isEditable);
  };

  const handleCancelClick = () => {
    if (dataLaboratory?.estado !== 3) {
      setDataLaboratory((prevData) => ({
        ...prevData,
        estado: 3,
      }));
    }

    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleConfirm = async () => {
    try {
      await handleSave();
      setDataLaboratory((prevData) => ({
        ...prevData,
        estado: 1,
      }));
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
          estado={dataLaboratory?.estado}
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
      <div className="sm:flex sm:flex-row-reverse">
        <button
          onClick={handleConfirm}
          className={`${
            isLoading && isEditable
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 opacity-50 cursor-not-allowed"
          }  text-white px-4 py-2 rounded  focus:outline-none`}
          disabled={isLoading || isEditable}
        >
          {isLoading ? "Confirming..." : "Confirmar"}
        </button>
      </div>
    </section>
  );
};

export default LaboratoryProfile;
