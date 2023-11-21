import React, { useState, useCallback } from "react";

export function useTratamientoData(initialState) {
  const [tratamientoData, setTratamientoData] = useState(initialState);

  const handleArrayChange = useCallback((index, field, value) => {
    setTratamientoData((prevState) => {
      const updatedRecetasMedicas = [...prevState.recetasMedicas];
      updatedRecetasMedicas[index][field] = value;
      return { ...prevState, recetasMedicas: updatedRecetasMedicas };
    });
  }, []);

  const addRecetaMedica = useCallback(() => {
    setTratamientoData((prevState) => {
      const newReceta = { medicamento: "", indicaciones: "" };
      return {
        ...prevState,
        recetasMedicas: [...prevState.recetasMedicas, newReceta],
      };
    });
  }, []);

  const removeRecetaMedica = useCallback((index) => {
    setTratamientoData((prevState) => {
      const updatedRecetasMedicas = [...prevState.recetasMedicas];
      updatedRecetasMedicas.splice(index, 1);
      return { ...prevState, recetasMedicas: updatedRecetasMedicas };
    });
  }, []);

  return {
    tratamientoData,
    handleArrayChange,
    addRecetaMedica,
    removeRecetaMedica,
  };
}
