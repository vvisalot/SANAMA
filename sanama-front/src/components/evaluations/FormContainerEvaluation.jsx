"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VitalSigns from "@/components/evaluations/vitalSigns";
import ChiefComplaint from "@/components/evaluations/chiefComplaint";
import ExplorationTab from "@/components/evaluations/ExplorationTab";
import GlasgowComaScale from "@/components/evaluations/MentalStatusTab";
import useCreateMedicalRecord from "@/hooks/useCreateMedicalRecord";
import MedicalDecision from "@/components/evaluations/MedicalDecision";
import Accordion from "@/components/evaluations/acordeon";
import { toast } from "sonner";

const FormContainerEvaluation = ({ idCita, formData, setFormData }) => {
  const router = useRouter();
  const [allFormComplete, setAllFormComplete] = useState(false);
  const [step, setStep] = useState(1);
  const { createMedicalRecord, isSubmitting, submissionError } =
    useCreateMedicalRecord();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const loadingRegister = async (data) => {
    console.log(data);
    await appointmentService.registrarCita(data);
    router.push("/appointments");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateAppointmentForm(fechaNacimiento, validatePatientForm)) {
      console.log("El formulario es válido. Enviar datos.");
      setAllFormComplete(true);
    } else {
      console.log("No se han completado correctamente los campos.");
      setAllFormComplete(false);
      return;
    }

    if (patientId.idPersona == -1) {
      try {
        const patientData = {
          nombres: patientForm.nombres,
          apellidoPaterno: patientForm.apellidoPaterno,
          apellidoMaterno: patientForm.apellidoMaterno,
          dni: patientForm.dni,
          fechaNacimiento: fechaNacimiento,
          sexo: sexo.charAt(0),
          telefono: patientForm.telefono,
          estado: 1,
          codigoSeguro: patientForm.codigoSeguro,
          tipoSeguro: patientForm.tipoSeguro,
          direccion: patientForm.direccion,
          correo: patientForm.correo,
        };
        const patientResponse = await patientService.registrarPaciente(
          patientData
        );

        if (patientResponse !== null || patientResponse !== -1) {
          const newPatientId = patientResponse;

          setPatientId({
            idPersona: newPatientId,
          });

          const appointmentFormData = {
            paciente: {
              idPersona: newPatientId,
            },
            medico: doctorId,
            horaCita: schedule.hora,
            fechaCita: schedule.fecha,
            tieneAcompanhante:
              legalResponsibilityForm.tieneAcompañante === "Si" ? true : false,
            nombreAcompanhante:
              legalResponsibilityForm.tieneAcompañante === "Si"
                ? `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}`
                : null,
            dniAcompanhante:
              legalResponsibilityForm.tieneAcompañante === "Si"
                ? legalResponsibilityForm.dni
                : null,
            parentezco:
              legalResponsibilityForm.tieneAcompañante === "Si"
                ? legalResponsibilityForm.parentesco
                : null,
            requiereTriaje: triageRequirement === "Si" ? 1 : 0,
          };
          // let response = await appointmentService.registrarCita(appointmentFormData)
          // const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

          console.log("Paciente registrado y cita registrada");
          toast.promise(() => loadingRegister(appointmentFormData), {
            loading: "Registrando paciente y cita",
            success: "Paciente y cita registrados",
            error: "Error al registrar paciente y cita",
          });
        } else {
          console.log("Error al registrar paciente y cita");
          toast.error("Error al registrar paciente y cita");
        }
      } catch (error) {
        console.log(
          "Error en la respuesta del servidor para registrar un paciente y cita"
        );
        toast.error(
          "Error en la respuesta del servidor para registrar un paciente y cita"
        );
      }
    } else {
      try {
        const appointmentFormData = {
          paciente: patientId,
          medico: doctorId,
          horaCita: schedule.hora,
          fechaCita: schedule.fecha,
          tieneAcompanhante:
            legalResponsibilityForm.tieneAcompañante === "Si" ? true : false,
          nombreAcompanhante:
            legalResponsibilityForm.tieneAcompañante === "Si"
              ? `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}`
              : null,
          dniAcompanhante:
            legalResponsibilityForm.tieneAcompañante === "Si"
              ? legalResponsibilityForm.dni
              : null,
          parentezco:
            legalResponsibilityForm.tieneAcompañante === "Si"
              ? legalResponsibilityForm.parentesco
              : null,
          requiereTriaje: triageRequirement === "Si" ? 1 : 0,
        };

        // let response = await appointmentService.registrarCita(appointmentFormData)

        toast.promise(() => loadingRegister(appointmentFormData), {
          loading: "Registrando cita",
          success: "Cita registrada",
        });
      } catch (error) {
        toast.error("Error al registrar cita para un paciente existente");
        console.log("Error al registrar cita para un paciente existente");
      }
    }
  };

  return (
    <>
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4 h-max">
          <Accordion title="Clinical Tab" id="clinical">
            <VitalSigns
              formData={formData.signosVitales}
              handleInputChange={handleInputChange}
            />
          </Accordion>
          <Accordion title="Motivo de la Consulta" id="triage">
            <ChiefComplaint
              formData={formData.ChiefComplaint}
              handleInputChange={handleInputChange}
            />
          </Accordion>

          <Accordion title="Exploracion Fisica" id="triage">
            <ExplorationTab
              formData={formData.exploracionFisica}
              handleInputChange={handleInputChange}
            />
          </Accordion>
          <Accordion title="Nivel de Consciencia" id="triage">
            <GlasgowComaScale
              formData={formData.estadoMental}
              handleInputChange={handleInputChange}
            />
          </Accordion>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
              onClick={handleNextStep}
            >
              Siguiente
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="flex space-x-4 h-fill">
          <MedicalDecision
            formData={formData}
            handleSubmit={handleSubmit}
            createMedicalRecord={createMedicalRecord}
            idCita={idCita}
          />
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              Anterior
            </button>
            <button className="bg-blue-500 hover.bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md">
              Finalizar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormContainerEvaluation;
