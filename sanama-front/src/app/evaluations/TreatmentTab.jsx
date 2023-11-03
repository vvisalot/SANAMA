import React, { useState } from "react";

const TratamientoYDecisionCita = () => {
  const [tratamientoData, setTratamientoData] = useState({
    tratamiento: [],
    decisionCita: "",
    observacionesCierre: "",
  });

  const handleArrayChange = (index, value) => {
    setTratamientoData((prevState) => {
      const updatedTratamiento = [...prevState.tratamiento];
      updatedTratamiento[index] = value;
      return { ...prevState, tratamiento: updatedTratamiento };
    });
  };

  const addTratamientoField = () => {
    setTratamientoData((prevState) => ({
      ...prevState,
      tratamiento: [...prevState.tratamiento, ""],
    }));
  };

  const removeTratamientoField = (index) => {
    setTratamientoData((prevState) => {
      const updatedTratamiento = [...prevState.tratamiento];
      updatedTratamiento.splice(index, 1);
      return { ...prevState, tratamiento: updatedTratamiento };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTratamientoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-8">
      <h4 className="text-lg font-bold text-gray-700 mb-2">
        Tratamiento y Decisión de Cierre de Cita
      </h4>

      {/* Tratamiento */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Tratamiento
        </label>
        {tratamientoData.tratamiento.map((treatment, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={treatment}
              onChange={(e) => handleArrayChange(index, e.target.value)}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              placeholder={`Tratamiento ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeTratamientoField(index)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTratamientoField}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Añadir Tratamiento
        </button>
      </div>

      {/* Decisión de Cierre de Cita */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Decisión de Cierre de Cita
        </label>
        <select
          name="decisionCita"
          value={tratamientoData.decisionCita}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          <option value="Cerrar Cita">Cerrar Cita</option>
          <option value="No Cerrar Cita">No Cerrar Cita</option>
        </select>
      </div>

      {/* Observaciones sobre la Decisión de Cierre de Cita */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Observaciones sobre la Decisión de Cierre de Cita
        </label>
        <textarea
          name="observacionesCierre"
          value={tratamientoData.observacionesCierre}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows="3"
        ></textarea>
      </div>
    </div>
  );
};

export default TratamientoYDecisionCita;
