import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import InputField from "@/components/common/InputField";
import TextAreaField from "@/components/common/TextAreaField";
import { calcularEdad, formatearFecha } from "@/util/formValidations";

const ReviewFormEvaluation = ({ patientData, hojaMedicaData }) => {
  if (!patientData) {
    return <p>Cargando...</p>; // Or any other loading state representation
  }

  const edad = calcularEdad(patientData.fechaNacimiento);
  const fechaNacimientoFormateada = formatearFecha(patientData.fechaNacimiento);
  const sexo = patientData.sexo === "M" ? "Masculino" : "Femenino";
  const evaluacionMedica = hojaMedicaData.evaluacionMedica;
  const vitalSigns = evaluacionMedica.signosVitales || {};

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
              evaluacionMedica.signosVitales
                ? evaluacionMedica.signosVitales.peso
                : "-"
            }
            disabled
          />
          <InputField
            label="Talla (cm)"
            value={
              evaluacionMedica.signosVitales
                ? evaluacionMedica.signosVitales.talla
                : "-"
            }
            disabled
          />
        </div>
      </div>

      <Accordion title="Signos Vitales" id="triage">
        <div className="ml-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <InputField
            key={"temperatura"}
            label={"Temperatura"}
            value={vitalSigns.temperatura}
            disabled
          />
        </div>
        <div className="ml-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <InputField
            key={"frecuenciaCardiaca"}
            label={"Frecuencia Cardiaca"}
            value={vitalSigns.frecuenciaCardiaca}
            disabled
          />
        </div>
      </Accordion>

      <Accordion title="Motivo de la Consulta" id="triage">
        <TextAreaField
          label="Antecedentes:"
          name="evaluacionMedica.antecedentes"
          placeholder="Ingresa los antecentes.."
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="evaluacionMedica.motivoConsulta"
          placeholder="Ingresa el motivo.."
        />
        <TextAreaField
          label="Observaciones Adicionales:"
          name="evaluacionMedica.observaciones"
          placeholder="Ingresa observación.."
        />
      </Accordion>
    </>
  );
};

export default ReviewFormEvaluation;
