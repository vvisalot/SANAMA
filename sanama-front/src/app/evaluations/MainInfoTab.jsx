import React from "react";

const MainInfoComponent = ({ formData, handleInputChange }) => {
  return (
    <>
      {/* Main Info */}
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Información Principal
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* DNI */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <input
              type="text"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Altura */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Altura (cm)
            </label>
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peso (kg)
            </label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Persona Responsable */}
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Persona Responsable
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre del responsable */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Responsable
            </label>
            <input
              type="text"
              name="personaResponsable.nombre"
              value={formData.personaResponsable.nombre}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* DNI del responsable */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI del Responsable
            </label>
            <input
              type="text"
              name="personaResponsable.dni"
              value={formData.personaResponsable.dni}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainInfoComponent;
