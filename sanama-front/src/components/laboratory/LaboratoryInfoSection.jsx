import React from "react";
import InputField from "../common/InputField";
import { calcularEdad, formatearFecha } from "@/util/formValidations";
import { getStatus } from "@/util/status";

const LaboratoryInfoSection = ({ dataLaboratory }) => {
  if (!dataLaboratory) {
    return <p>Cargando...</p>;
  }
  const edad = calcularEdad(
    dataLaboratory?.citaMedica?.paciente?.fechaNacimiento
  );
  const fechaNacimientoFormateada = formatearFecha(
    dataLaboratory?.citaMedica?.paciente?.fechaNacimiento
  );
  const sexo =
    dataLaboratory?.citaMedica?.paciente?.sexo === "M"
      ? "Masculino"
      : "Femenino";

  const estado = getStatus(dataLaboratory?.estado);

  return (
    <div className="col-span-2">
      <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
        Información de orden de laboratorio
      </h4>

      <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          label="Fecha de Nacimiento"
          value={fechaNacimientoFormateada}
          disabled
        />
        <InputField label="Edad" value={edad} disabled width="w-full" />
        <InputField label="Sexo" value={sexo} disabled width="w-full" />
        <InputField label="Estado de la Orden" value={estado.text} disabled />
      </div>
      <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
    </div>
  );
};

export default LaboratoryInfoSection;
