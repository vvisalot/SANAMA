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
  const recetaMedica = hojaMedicaData.recetaMedica;
  const medicamentos = recetaMedica.medicamentos;
  const vitalSigns = evaluacionMedica.signosVitales || {};
  const diagnosticos = evaluacionMedica.diagnosticos;
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

      <Accordion title="Motivo de la Consulta" id="triage" active={true}>
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

      <Accordion title="Signos Vitales" id="triage" active={true}>
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

      <Accordion title="Exploracion Fisica" id="expfisica" active={true}>
        <ExplorationTab evaluationData={evaluacionMedica} />
      </Accordion>

      <Accordion title="Nivel de Consciencia" id="glasgow" active={true}>
        <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            key={"glasgow"}
            label={"Prueba de Glasgow"}
            value={evaluacionMedica.glasgow}
            disabled
          />
          <InputField
            key={"eyesOpen"}
            label={"Abertura Ocular"}
            value={evaluacionMedica.eyesOpen}
            disabled
          />
          <InputField
            key={"talkingCorrectly"}
            label={"Respuesta Verbal)"}
            value={evaluacionMedica.talkingCorrectly}
            disabled
          />
          <InputField
            key={"ableToMoveBody"}
            label={"Respuesta Motriz"}
            value={evaluacionMedica.ableToMoveBody}
            disabled
          />
        </div>
      </Accordion>

      <Accordion title="Diagnostico" id="diagnostico" active={true}>
        <div className="w-full grid justify-items-center">
          <table className="w-3/6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">CIE-10</th>
                <th className="px-6 py-3">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {diagnosticos.map((diagnostico, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{diagnostico.idCiex}</td>
                  <td className="px-6 py-3">{diagnostico.ciex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="Receta Medica" id="receta" active={true}>
        <div className="w-full grid justify-items-center">
          <table className="w-3/6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Indicaciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((medicamento, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{medicamento.nombre}</td>
                  <td className="px-6 py-3">{medicamento.indicacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-3/6 mt-2">
            <InputField
              key={"fechaCaducidad"}
              label={"Fecha de Caducidad"}
              value={recetaMedica.fechaCaducidad}
              disabled
            />
          </div>
        </div>
      </Accordion>
    </>
  );
};

const ExplorationTab = ({ evaluationData }) => {
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
    </div>
  );
};

export default ReviewFormEvaluation;
