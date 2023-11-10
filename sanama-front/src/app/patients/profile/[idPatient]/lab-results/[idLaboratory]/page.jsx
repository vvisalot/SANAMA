"use client";

import { useParams } from "next/navigation";

const LaboratoryProfile = ({}) => {

    const params = useParams();
    const idPaciente = params.idLaboratory;

    console.log("El id es: ", idPaciente)
   return (
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">
        Laboratorios del Paciente
      </h1>
    </section>
  );
};

export default LaboratoryProfile;