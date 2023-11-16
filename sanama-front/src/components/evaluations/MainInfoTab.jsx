import React from "react";
const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())
  ) {
    edad--;
  }
  return edad;
};
const formatearFecha = (fecha) => {
  const fechaNac = new Date(fecha);
  return `${fechaNac.getDate().toString().padStart(2, "0")}/${(
    fechaNac.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${fechaNac.getFullYear()}`;
};

const MainInfoComponent = ({ patientTriageData }) => {
  if (!patientTriageData) {
    return <p>Cargando...</p>; // Or any other loading state representation
  }

  const { paciente, triaje } = patientTriageData;
  const edad = calcularEdad(paciente.fechaNacimiento);
  const fechaNacimientoFormateada = formatearFecha(paciente.fechaNacimiento);
  const sexo = paciente.sexo === "M" ? "Masculino" : "Femenino";
  return (
    <>
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Información del Paciente
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Paciente"
            value={`${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`}
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
            value={triaje ? triaje.peso : "-"}
            disabled
          />
          <InputField
            label="Talla (cm)"
            value={triaje ? triaje.talla : "-"}
            disabled
          />
        </div>
      </div>
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
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default MainInfoComponent;
