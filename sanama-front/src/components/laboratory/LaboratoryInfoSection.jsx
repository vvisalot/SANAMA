import React from "react";
import { calcularEdad, formatearFecha } from "@/util/formValidations";
import { getStatus } from "@/util/status";

const LaboratoryInfoSection = ({ dataLaboratory }) => {
  if (!dataLaboratory) {
    return <p>Cargando...</p>;
  }
  const nombrePaciente = `${dataLaboratory?.citaMedica?.paciente?.nombres} ${dataLaboratory?.citaMedica?.paciente?.apellidoPaterno} ${dataLaboratory?.citaMedica?.paciente?.apellidoMaterno}`;
  const nombreDoctor = `${dataLaboratory?.citaMedica?.medico?.nombres} ${dataLaboratory?.citaMedica?.medico?.apellidoPaterno} ${dataLaboratory?.citaMedica?.medico?.apellidoMaterno}`;
  const dni = dataLaboratory?.citaMedica?.paciente?.dni;
  const fechaNacimientoFormateada = formatearFecha(
    dataLaboratory?.citaMedica?.paciente?.fechaNacimiento
  );
  const sexo =
    dataLaboratory?.citaMedica?.paciente?.sexo === "M"
      ? "Masculino"
      : dataLaboratory?.citaMedica?.paciente?.sexo === "F"
      ? "Femenino"
      : "";

  const edad = isNaN(
    calcularEdad(dataLaboratory?.citaMedica?.paciente?.fechaNacimiento)
  )
    ? ""
    : calcularEdad(dataLaboratory?.citaMedica?.paciente?.fechaNacimiento);
  const estado = getStatus(dataLaboratory?.estado);
  return (
    <div className="col-span-2">
      <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
        Información General
      </h4>

      <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Nombre completo
          </label>
          <input
            type="text"
            value={nombrePaciente || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Documento de identidad
          </label>
          <input
            type="text"
            value={dni || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Fecha de Nacimiento
          </label>
          <input
            type="text"
            value={fechaNacimientoFormateada || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Edad
          </label>
          <input
            type="text"
            value={edad || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Sexo
          </label>
          <input
            type="text"
            value={sexo || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Estado de la Orden
          </label>
          <input
            type="text"
            value={estado.text || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Médico Prescriptor
          </label>
          <input
            type="text"
            value={nombreDoctor || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Tipo de Muestra
          </label>
          <input
            type="text"
            value={dataLaboratory?.tipoMuestra || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Exámenes a realizar
          </label>
          <input
            type="text"
            value={dataLaboratory?.instrucciones || ""}
            disabled
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LaboratoryInfoSection;
