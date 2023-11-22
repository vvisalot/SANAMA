import React, { useState, useCallback } from "react";
import Datepicker from "tailwind-datepicker-react";
import AddMedicationForm from "../todolist/AddMedicationForm";
import MedicationList from "../todolist/MedicationList";
import { useTratamientoData } from "@/hooks/useTratamientoData";

const TratamientoYDecisionCita = ({ setMedicalRecordData }) => {
  const initialState = {
    recetasMedicas: [{ medicamento: "", indicaciones: "" }],
    fechaDeCaducidad: "",
  };
  const {
    tratamientoData,
    addRecetaMedica,
    removeRecetaMedica,
    updateRecetaMedica,
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
      input: "py-10 h-[45px] text-center w-1/6",
      disabled: "text-gray-900 text-gray-600",
    },
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputPlaceholderProp: "Selecciona una fecha",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  };

  const handleCloseFinal = (state) => {
    setShowFinal(state);
  };

  return (
    <div className="p-8">
      <h4 className="text-lg font-bold text-gray-700 mb-2">Receta Médica</h4>
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Caducidad:
        </label>
        <Datepicker
          className="mt-1 p-2 min-w-7xl border-gray-300 rounded-md"
          value={tratamientoData.fechaDeCaducidad}
          onChange={handleOnChange}
          placeholder="Fecha de Caducidad"
          show={showFinal}
          setShow={handleCloseFinal}
          options={defaultOptions}
        />
      </div>
      <AddMedicationForm
        onAddMedication={(newMedication) => addRecetaMedica(newMedication)}
      />
      <MedicationList
        medications={tratamientoData.recetasMedicas}
        onEditMedication={updateRecetaMedica}
        onDeleteMedication={removeRecetaMedica}
      />
    </div>
  );
};

export default TratamientoYDecisionCita;
