import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const AddMedicationForm = ({ onAddMedication }) => {
  const [nombre, setNombre] = useState("");
  const [indicacion, setIndicacion] = useState("");

  const handleAddMedication = () => {
    if (nombre.trim() && indicacion.trim()) {
      onAddMedication({ nombre: nombre.trim(), indicacion: indicacion.trim() });
      setNombre("");
      setIndicacion("");
    }
  };

  return (
    <div className="mb-4 w-full flex space-x-2 items-center rounded-lg px-4">
      <CiCirclePlus size={28} className="text-gray-500" />
      <input
        className="bg-transparent w-full h-fit p-1 py-2 text-lg"
        type="text"
        placeholder="Nombre del medicamento"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="bg-transparent w-full h-fit p-1 py-2 text-lg"
        type="text"
        placeholder="Indicación"
        value={indicacion}
        onChange={(e) => setIndicacion(e.target.value)}
      />
      <button
        type="button"
        onClick={handleAddMedication}
        className="px-4 uppercase text-gray-500"
      >
        Añadir
      </button>
    </div>
  );
};

export default AddMedicationForm;
