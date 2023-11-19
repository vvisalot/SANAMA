import React from "react";
import InputField from "../common/InputField";

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
        <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
          Datos del Pacientes
        </h4>

        <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          <InputField label="Sexo" value={sexo} disabled />Z

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

export default MainInfoComponent;
