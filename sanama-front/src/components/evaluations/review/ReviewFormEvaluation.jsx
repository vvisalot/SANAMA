import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import InputField from "@/components/common/InputField";
import TextAreaField from "@/components/common/TextAreaField";
import { calcularEdad, formatearFecha } from "@/util/formValidations";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputField
            key={"temperatura"}
            label={"Temperatura (°C)"}
            value={vitalSigns.temperatura}
            disabled
          />
          <InputField
            key={"frecuenciaCardiaca"}
            label={"Frecuencia Cardiaca (FC)"}
            value={vitalSigns.frecuenciaCardiaca}
            disabled
          />
          <InputField
            key={"frecuenciaRespiratoria"}
            label={"Frecuencia Respiratoria (FR)"}
            value={vitalSigns.frecuenciaRespiratoria}
            disabled
          />
          <InputField
            key={"presionArterial"}
            label={"Presión Arterial (Sistolica / Diastolica)"}
            value={vitalSigns.presionArterial}
            disabled
          />
          <InputField
            key={"saturacionOxigeno"}
            label={"Saturación de Oxígeno (%)"}
            value={vitalSigns.saturacionOxigeno}
            disabled
          />
        </div>
      </Accordion>

      <Accordion title="Motivo de la Consulta" id="triage">
        <TextAreaField
          label="Antecedentes:"
          name="evaluacionMedica.antecedentes"
          placeholder="Ingresa los antecentes.."
          data={evaluacionMedica.antecedentes}
        />
        <TextAreaField
          label="Motivo de Consulta:"
          name="evaluacionMedica.motivoConsulta"
          placeholder="Ingresa el motivo.."
          data={evaluacionMedica.motivoConsulta}
        />
        <TextAreaField
          label="Observaciones Adicionales:"
          name="evaluacionMedica.observaciones"
          placeholder="Ingresa observación.."
          data={evaluacionMedica.observaciones}
        />
      </Accordion>
      <Accordion title="Exploracion Fisica" id="expfisica">
        <ExplorationTab evaluacionMedica={evaluacionMedica} />
      </Accordion>
    </>
  );
};

const ExplorationTab = ({ evaluacionMedica }) => {
  // Suponiendo que medicalRecordData.evaluacionMedica contiene los datos necesarios

  const sectionNames = [
    "examenGeneral",
    "pielYFaneras",
    "cabezaYCuello",
    "toraxYPulmones",
    "cardiovascular",
    "abdomen",
    "urogenital",
    "extremidades",
    "snc",
  ];

  const renderCheckbox = (label, section, key) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center ml-12 mb-2 "
      transition={{ duration: 0.2 }}
    >
      <input
        type="checkbox"
        checked={Boolean(evaluationData[section])} // Marca la casilla si hay datos
        readOnly // Hace que la casilla sea de solo lectura
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </motion.div>
  );

  const renderTextArea = (label, name, section, key) => {
    if (!evaluationData[section]) return null; // No muestra el área si no hay datos
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="flex col-span-2 ml-12"
      >
        <label
          htmlFor={name}
          className="block resize-none text-sm font-medium text-gray-700 w-1/6"
        >
          {label}
        </label>
        <span className="mr-4">:</span>
        <textarea
          id={name}
          readOnly // Hace el área de texto de solo lectura
          className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={3}
          value={evaluationData[section]} // Muestra los datos
        />
      </motion.div>
    );
  };

  return (
    <div className="ml-2 mr-4 col-span-2">
      <h5 className="text-base font-medium text-gray-700 mb-2">Exploración:</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {sectionNames.map((section) =>
          renderCheckbox(
            section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            section,
            `checkbox-${section}`
          )
        )}
      </div>
      <AnimatePresence>
        <div className="resize-none grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionNames.map((section) =>
            renderTextArea(
              section
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
              `evaluacionMedica.${section}`,
              section,
              `textarea-${section}`
            )
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ReviewFormEvaluation;
