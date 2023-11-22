import React, { useState, useCallback } from "react";

export function useTratamientoData(initialState) {
  const [tratamientoData, setTratamientoData] = useState(initialState);

  const updateRecetaMedica = useCallback((index, updatedMedication) => {
    setTratamientoData((prevState) => {
      const updatedRecetasMedicas = [...prevState.recetasMedicas];
      updatedRecetasMedicas[index] = updatedMedication;
      return { ...prevState, recetasMedicas: updatedRecetasMedicas };
    });
  }, []);

  const addRecetaMedica = useCallback((newMedication) => {
    setTratamientoData((prevState) => ({
      ...prevState,
      recetasMedicas: [...prevState.recetasMedicas, newMedication],
    }));
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
    addRecetaMedica,
    removeRecetaMedica,
    updateRecetaMedica,
  };
}
