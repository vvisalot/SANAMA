import React, { useState, useCallback } from "react";
import Datepicker from "tailwind-datepicker-react";
import { useTratamientoData } from "@/hooks/useTratamientoData";

const TratamientoYDecisionCita = ({ setMedicalRecordData }) => {
  const initialState = {
    recetasMedicas: [{ medicamento: "", indicaciones: "" }],
    fechaDeCaducidad: "",
  };
  const {
    tratamientoData,
    handleArrayChange,
    addRecetaMedica,
    removeRecetaMedica,
  } = useTratamientoData(initialState);

  const handleOnChange = (selectedDate) => {
    setMedicalRecordData((prevData) => ({
      ...prevData,
      recetaMedica: {
        ...prevData.recetaMedica,
        fechaDeCaducidad: selectedDate,
      },
    }));
  };

  const [showFinal, setShowFinal] = useState(false);

  const defaultOptions = {
    autoHide: false,
    todayBtn: true,
    todayBtnText: "Hoy",
    clearBtn: false,
    datepickerClassNames: "top-17",
    defaultDate: null,
    language: "es",
    disabledDates: [],
    theme: {
      input: "py-12",
    },
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],

    inputPlaceholderProp: "Selecciona una fecha",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
    theme: {
      disabled: "bg-gray-800 text-gray-600",
    },
  };

  const [optionsFinal, setOptionsFinal] = useState({
    ...defaultOptions,
    inputPlaceholderProp: "Fecha Final",
    inputNameProp: "fecha_final",
    inputIdProp: "fecha_final",
  });

  const handleCloseFinal = (state) => {
    setShowFinal(state);
  };

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = (index) => {
    setEditMode((prevEditMode) => !prevEditMode);
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
              onClick={() => removeRecetaMedica(index)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRecetaMedica}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Añadir Receta Médica
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Caducidad
        </label>
        <Datepicker
          className="mt-1 p-2 min-w-7xl border-gray-300 rounded-md"
          value={tratamientoData.fechaDeCaducidad}
          onChange={handleOnChange}
          placeholder="Fecha de Caducidad"
          show={showFinal}
          setShow={handleCloseFinal}
          options={optionsFinal}
        />
      </div>
    </div>
  );
};

export default TratamientoYDecisionCita;
