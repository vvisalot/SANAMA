import ActionButton from "@/components/buttons/ActionButton";
import Link from "next/link";

const PatientActions = ({ id }) => {
  return (
    <section className="my-10 rounded-2xl h-full grid grid-rows-3 items-center bg-white shadow">
      <ActionButton
        url={`/patients/profile/${id}/appointments`}
        color={"bg-orange-400"}
        shadow={"shadow-orange-200"}
        name={"Citas"}
      />

      <ActionButton
        url={`/patients/profile/${id}/medicalHistory`}
        color={"bg-red-400"}
        shadow={"shadow-red-200"}
        name={"Historia clinica"}
      />

      <ActionButton
        url={`/patients/profile/${id}/lab-results`}
        color={"bg-green-400"}
        shadow={"shadow-green-200"}
        name={"Analisis de laboratorios"}
      />
    </section>
  );
};

export default PatientActions;
