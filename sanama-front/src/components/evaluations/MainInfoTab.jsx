import React from "react";

const MainInfoComponent = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Información Principal
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />

          <InputField
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
          />

          <InputField
            label="Género"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
          />

          <InputField
            label="Edad"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            type="number"
          />
        </div>
      </div>

      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Persona Responsable
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre del Responsable"
            name="personaResponsable.nombre"
            value={formData.personaResponsable.nombre}
            onChange={handleInputChange}
          />

          <InputField
            label="DNI del Responsable"
            name="personaResponsable.dni"
            value={formData.personaResponsable.dni}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha y Hora de Ultima Atención
        </label>
        <input
          type="date"
          name="fechaAtencion"
          value={formData.fechaAtencion}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        />
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        />
      </div>
    </>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 w-full border-gray-300 rounded-md"
      />
    </div>
  );
};

export default MainInfoComponent;
