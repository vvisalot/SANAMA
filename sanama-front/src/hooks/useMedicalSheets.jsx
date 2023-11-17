import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";

export const useMedicalSheets = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedicalSheet, setSelectedMedicalSheet] = useState(null);

  const fetchMedicalSheets = async (
    idpaciente,
    idespecialidad,
    fechaIni,
    fechaFin
  ) => {
    try {
      setLoading(true);
      const filters = {
        pn_id_paciente: idpaciente,
        pn_id_especialidad: idespecialidad,
        pd_fecha_inicio: fechaIni,
        pd_fecha_fin: fechaFin,
      };
      const data = await attentionService.listarHojasMedicasFiltro(filters);
      setSearchResults(data);
    } catch (error) {
      console.error("No se pudo obtener los datos de las hojas médicas", error);
      setSearchResults([]); // Asegurarse de limpiar los resultados de búsqueda en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      fetchMedicalSheets(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const handleMedicalSheetSelect = (medicalSheet) => {
    setSelectedMedicalSheet(medicalSheet);
    setSearchResults([]);
    setSearchText("");
  };

  const resetData = () => {
    setSearchResults([]);
    setSelectedMedicalSheet(null);
    setSearchText("");
  };

  return {
    searchText,
    setSearchText,
    searchResults,
    loading,
    selectedMedicalSheet,
    handleMedicalSheetSelect,
    resetData,
  };
};
