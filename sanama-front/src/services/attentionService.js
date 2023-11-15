import axios from "axios";
import connection from "@/config/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

const ENDPOINTS = {
  BUSCAR_HISTORIAL_CLINICO: "/atencion/post/buscarHistorialClinico",
  REGISTRAR_HOJA_MEDICA: "/atencion/post/registrarHojaMedica",
  BUSCAR_DATOS_PACIENTE_TRIAGE: "/atencion/post/buscarTriajeCitaHojaMedica",
};

export const attentionService = {
  buscarHistorialClinico: async (idPaciente) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_HISTORIAL_CLINICO,
        {
          pn_id_paciente: idPaciente,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar el historial clínico", error);
      throw error;
    }
  },

  registrarHojaMedica: async (params) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.REGISTRAR_HOJA_MEDICA,
        params
      );
      return response.data;
    } catch (error) {
      console.error("Error al registrar el historial clínico", error);
      throw error;
    }
  },

  buscarTriageCitaHojaMedica: async (pn_id_cita) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_DATOS_PACIENTE_TRIAGE,
        {
          pn_id_cita,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar cita", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },
};
