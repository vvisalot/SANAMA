"use client";
import { useState } from "react";
import useLaboratoryProfile from "@/hooks/useLaboratoryOrder";
import ActionButtonsLab from "@/components/laboratory/ActionButtonsLab";
import LaboratoryInfoSection from "@/components/laboratory/LaboratoryInfoSection";
import LaboratoryExamInfoSection from "@/components/laboratory/LaboratoryExamInfoSection";
import TitleWithIcon from "@/components/TitleWithIcon";
import viewAppointmentIcon from "@/components/icons/viewAppointmentIcon";
import { laboratoryService } from "@/services/laboratoryService";
import { toast } from "sonner";

const LaboratoryProfile = ({ params }) => {
  const {
    medicos,
    handleMedicoChange,
    dataLaboratory,
    setDataLaboratory,
    isLoading,
    setIsLoading,
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
    setIsEditable(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const laboratorioData = {
      idOrdenLaboratorio: params.idLaboratory,
      doctorFirmante: dataLaboratory.doctorFirmante,
      estado: 1,
      examenMedico: dataLaboratory.examenMedico,
      observaciones: dataLaboratory.observaciones,
    };

    console.log(laboratorioData);
    try {
      const result = await laboratoryService.atenderOrdenLaboratorio(
        laboratorioData
      );
      console.log(result);
      if (result === 1) {
      } else {
        setError(
          "There was a problem saving the information. Please try again."
        );
        toast.error(
          "There was a problem saving the information. Please try again."
        );
      }
    } catch (error) {
      console.error("Error saving laboratory order", error);
      setError("There was an error saving. Please try again.");
      toast.error("There was an error saving. Please try again.");
    } finally {
      setIsLoading(false);
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
      <form onSubmit={handleSubmit} className="sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`${
            !isLoading && isEditable
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 opacity-50 cursor-not-allowed"
          } text-white px-4 py-2 rounded focus:outline-none`}
        >
          {isLoading ? "Confirming..." : "Confirmar"}
        </button>
      </form>
    </section>
  );
};

export default LaboratoryProfile;
