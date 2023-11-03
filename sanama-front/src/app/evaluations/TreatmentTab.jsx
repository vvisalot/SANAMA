import React, { useState } from "react";

const TratamientoYDecisionCita = () => {
  const [tratamientoData, setTratamientoData] = useState({
    tratamientos: [],
    estadoHojaMedica: "",
    crearOrdenDeLaboratorio: "",
    tipoOrdenDeLaboratorio: "",
    instruccionesLaboratorio: "",
    indicacionesFinales: "",
    recetaMedica: {
      medicamentosRecetados: "",
    },
  });

  const handleArrayChange = (index, value) => {
    setTratamientoData((prevState) => {
      const updatedTratamientos = [...prevState.tratamientos];
      updatedTratamientos[index] = value;
      return { ...prevState, tratamientos: updatedTratamientos };
    });
  };

  const addTratamientoField = () => {
    setTratamientoData((prevState) => ({
      ...prevState,
      tratamientos: [...prevState.tratamientos, ""],
    }));
  };

  const removeTratamientoField = (index) => {
    setTratamientoData((prevState) => {
      const updatedTratamientos = [...prevState.tratamientos];
      updatedTratamientos.splice(index, 1);
      return { ...prevState, tratamientos: updatedTratamientos };
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

      {/* Tratamientos */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Tratamientos
        </label>
        {tratamientoData.tratamientos.map((tratamiento, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={tratamiento}
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

      {/* Estado Hoja Médica */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Estado Hoja Médica
        </label>
        <select
          name="estadoHojaMedica"
          value={tratamientoData.estadoHojaMedica}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          <option value="Cerrar Hoja">Cerrar Hoja</option>
          <option value="Mantener Abierta">Mantener Abierta</option>
        </select>
      </div>

      {/* Crear Orden de Laboratorio */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Crear Orden de Laboratorio
        </label>
        <input
          type="text"
          name="crearOrdenDeLaboratorio"
          value={tratamientoData.crearOrdenDeLaboratorio}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Modal que abre los datos para generar la orden"
        />
      </div>

      {/* Tipo de Orden de Laboratorio */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Orden de Laboratorio
        </label>
        <input
          type="text"
          name="tipoOrdenDeLaboratorio"
          value={tratamientoData.tipoOrdenDeLaboratorio}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Tipo de orden de laboratorio"
        />
      </div>

      {/* Instrucciones de Laboratorio */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Instrucciones de Laboratorio
        </label>
        <input
          type="text"
          name="instruccionesLaboratorio"
          value={tratamientoData.instruccionesLaboratorio}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Instrucciones de laboratorio"
        />
      </div>

      {/* Indicaciones Finales */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Indicaciones Finales
        </label>
        <input
          type="text"
          name="indicacionesFinales"
          value={tratamientoData.indicacionesFinales}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Indicaciones finales"
        />
      </div>

      {/* Receta Médica */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Receta Médica
        </label>
        <input
          type="text"
          name="recetaMedica.medicamentosRecetados"
          value={tratamientoData.recetaMedica.medicamentosRecetados}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Medicamentos recetados"
        />
      </div>
    </div>
  );
};

export default TratamientoYDecisionCita;
