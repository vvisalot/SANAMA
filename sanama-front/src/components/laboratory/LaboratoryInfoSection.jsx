import React from "react";
import InputField from "../common/InputField";
import { calcularEdad } from "@/util/formValidations";

const LaboratoryInfoSection = ({ dataLaboratory }) => {
  if (!dataLaboratory) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="w-full p-10 rounded-lg shadow-md">
      <section className="rounded-lg p-8 mx-auto flex flex-col space-y-6 md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        <h4 className="text-2xl font-bold mb-4">
          Información de orden de laboratorio
        </h4>

        <div className="grid grid-cols-4 gap-4">
          <InputField
            label="Nombre completo"
            value={`${dataLaboratory?.citaMedica?.paciente?.nombres} ${dataLaboratory?.citaMedica?.paciente?.apellidoPaterno} ${dataLaboratory?.citaMedica?.paciente?.apellidoMaterno}`}
            disabled
            width="w-full"
          />
          <InputField
            label="Documento de identidad"
            value={dataLaboratory?.citaMedica?.paciente?.dni}
            disabled
            width="w-full"
          />

          <InputField
            label="Sexo"
            value={
              dataLaboratory?.citaMedica?.paciente?.sexo === "F"
                ? "Femenino"
                : "Masculino"
            }
            disabled
            width="w-full"
          />
          <InputField
            label="Edad"
            value={calcularEdad(
              dataLaboratory?.citaMedica?.paciente?.fechaNacimiento
            )}
            disabled
            width="w-full"
          />
          <InputField
            label="Médico Prescriptor"
            value={`${dataLaboratory?.citaMedica?.medico?.nombres} ${dataLaboratory?.citaMedica?.medico?.apellidoPaterno} ${dataLaboratory?.citaMedica?.medico?.apellidoMaterno}`}
            disabled
            width="w-full"
          />
          <InputField
            label="Tipo de Examen"
            value={dataLaboratory?.tipoMuestra}
            disabled
            width="w-full"
          />

          <InputField
            label="Exámenes a realizar"
            value={dataLaboratory?.instrucciones}
            disabled
            type="textarea"
            width="w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default LaboratoryInfoSection;
