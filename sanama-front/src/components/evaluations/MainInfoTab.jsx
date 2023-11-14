import React from "react";

const MainInfoComponent = ({ appointmentData }) => {
  if (!appointmentData) {
    return <p>Loading appointment data...</p>; // Or any other loading state representation
  }

  const {
    paciente,
    medico,
    horaCita,
    fechaCita,
    codigoCita,
    tieneAcompanhante,
    nombreAcompanhante,
    dniAcompanhante,
    parentezco,
  } = appointmentData;

  return (
    <>
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Información de la Cita
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Código de Cita" value={codigoCita} disabled />

          <InputField label="Fecha de la Cita" value={fechaCita} disabled />

          <InputField label="Hora de la Cita" value={horaCita} disabled />

          {/* Patient's Information */}
          <InputField
            label="Nombre del Paciente"
            value={`${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`}
            disabled
          />

          <InputField label="DNI del Paciente" value={paciente.dni} disabled />

          {/* Doctor's Information */}
          <InputField
            label="Nombre del Médico"
            value={`${medico.nombres} ${medico.apellidoPaterno} ${medico.apellidoMaterno}`}
            disabled
          />

          <InputField
            label="Especialidad del Médico"
            value={medico.especialidad.nombre}
            disabled
          />
        </div>
      </div>

      {tieneAcompanhante && (
        <div className="col-span-2">
          <h4 className="text-lg font-bold text-gray-700 mb-2">
            Información del Acompañante
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Nombre del Acompañante"
              value={nombreAcompanhante}
              disabled
            />

            <InputField
              label="DNI del Acompañante"
              value={dniAcompanhante}
              disabled
            />

            {/* Assuming 'parentezco' is an ID that represents a relationship, you might want to map it to a human-readable form */}
            <InputField
              label="Parentesco"
              value={`Parentesco ID: ${parentezco}`}
              disabled
            />
          </div>
        </div>
      )}
    </>
  );
};

const InputField = ({ label, value, disabled, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        className="mt-1 p-2 w-full border-gray-300 rounded-md"
      />
    </div>
  );
};

export default MainInfoComponent;
