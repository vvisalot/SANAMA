import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import InputField from "@/components/common/InputField";
import { calcularEdad, formatearFecha } from "@/util/formValidations";

const ReviewFormEvaluation = ({ patientData, hojaMedicaData }) => {
  if (!patientData) {
    return <p>Cargando...</p>; // Or any other loading state representation
  }

  const edad = calcularEdad(patientData.fechaNacimiento);
  const fechaNacimientoFormateada = formatearFecha(patientData.fechaNacimiento);
  const sexo = patientData.sexo === "M" ? "Masculino" : "Femenino";

  return (
    <>
      <div className="col-span-2">
        <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
          Datos del Pacientes
        </h4>

        <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputField
            label="Paciente"
            value={`${patientData.nombres} ${patientData.apellidoPaterno} ${patientData.apellidoMaterno}`}
            disabled
          />
          <InputField
            label="Fecha de Nacimiento"
            value={fechaNacimientoFormateada}
            disabled
          />
          <InputField label="Edad" value={edad} disabled />
          <InputField label="Sexo" value={sexo} disabled />

          <InputField
            label="Peso (kg)"
            value={
              hojaMedicaData.signosVitales
                ? hojaMedicaData.signosVitales.peso
                : "-"
            }
            disabled
          />
          <InputField
            label="Talla (cm)"
            value={
              hojaMedicaData.signosVitales
                ? hojaMedicaData.signosVitales.talla
                : "-"
            }
            disabled
          />
        </div>
      </div>
      <Accordion title="Ultimo Triaje" id="triage">
        <viewVitalSigns defaultTriaje={hojaMedicaData.signosVitales} />
      </Accordion>
    </>
  );
};

export default ReviewFormEvaluation;
