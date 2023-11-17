import React, { useState } from "react";

const TratamientoYDecisionCita = () => {
  const [tratamientoData, setTratamientoData] = useState({
    recetasMedicas: [
      {
        medicamento: "",
        indicaciones: "",
      },
    ],
    fechaDeCaducidad: "",
  });
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = (index) => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleArrayChange = (index, field, value) => {
    setTratamientoData((prevState) => {
      const updatedRecetasMedicas = [...prevState.recetasMedicas];
      updatedRecetasMedicas[index][field] = value;
      return { ...prevState, recetasMedicas: updatedRecetasMedicas };
    });
  };

  const addRecetaMedicaField = () => {
    const lastReceta =
      tratamientoData.recetasMedicas[tratamientoData.recetasMedicas.length - 1];
    if (!lastReceta || (lastReceta.medicamento && lastReceta.indicaciones)) {
      setTratamientoData((prevState) => ({
        ...prevState,
        recetasMedicas: [
          ...prevState.recetasMedicas,
          { medicamento: "", indicaciones: "" },
        ],
      }));
    }
  };

  const removeRecetaMedicaField = (index) => {
    setTratamientoData((prevState) => {
      const updatedRecetasMedicas = [...prevState.recetasMedicas];
      updatedRecetasMedicas.splice(index, 1);
      return { ...prevState, recetasMedicas: updatedRecetasMedicas };
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
      <h4 className="text-lg font-bold text-gray-700 mb-2">Receta Médica</h4>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Recetas Médicas
        </label>
        {tratamientoData.recetasMedicas.map((receta, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={receta.medicamento}
              readOnly={index !== tratamientoData.recetasMedicas.length - 1}
              onChange={(e) =>
                handleArrayChange(index, "medicamento", e.target.value)
              }
              className={`mt-1 p-2 w-3/6 border-gray-300 rounded-md ${
                index !== tratamientoData.recetasMedicas.length - 1
                  ? "bg-gray-200"
                  : ""
              }`}
              placeholder={`Medicamento ${index + 1}`}
            />
            <input
              type="text"
              value={receta.indicaciones}
              readOnly={index !== tratamientoData.recetasMedicas.length - 1}
              onChange={(e) =>
                handleArrayChange(index, "indicaciones", e.target.value)
              }
              className={`mt-1 p-2 w-full border-gray-300 rounded-md ${
                index !== tratamientoData.recetasMedicas.length - 1
                  ? "bg-gray-200"
                  : ""
              }`}
              placeholder={`Indicaciones ${index + 1}`}
            />
            {index !== tratamientoData.recetasMedicas.length - 1 && (
              <button
                type="button"
                onClick={() => toggleEditMode(index)}
                className={`p-2 rounded-md ${
                  !editMode
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                E
              </button>
            )}
            <button
              type="button"
              onClick={() => removeRecetaMedicaField(index)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRecetaMedicaField}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Añadir Receta Médica
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Caducidad
        </label>
        <input
          type="date"
          name="fechaDeCaducidad"
          value={tratamientoData.fechaDeCaducidad}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Fecha de Caducidad"
        />
      </div>
    </div>
  );
};

export default TratamientoYDecisionCita;
