import axios from "axios";
import connection from "@/config/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

const ENDPOINTS = {
  LISTAR_ORDEN_LABORATORIO_POR_FILTRO:
    "laboratorio/post/listarOrdenLaboratorioFiltro",
  LISTAR_MEDICOS_LABORATORIO_VALIDADO: "configuracion/get/listarMedicosLab",
  BUSCAR_EXAMEN_MEDICO: "laboratorio/post/buscarExamenMedico",
  BUSCAR_ORDEN_LABORATORIO_POR_ID: "laboratorio/post/buscarOrdenLaboratorio",
  ATENDER_ORDEN_LABORATORIO: "laboratorio/post/atenderOrdenLaboratorioV1",
};

export const laboratoryService = {
  listarOrdenLaboratorioPorFiltro: async (filtro, fechaDesde, fechaHasta) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.LISTAR_ORDEN_LABORATORIO_POR_FILTRO,
        {
          pv_filtro: filtro,
          pd_fecha_inicio: fechaDesde,
          pd_fecha_fin: fechaHasta,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al listar ordenes de laboratorio por filtro", error);
      throw error;
    }
  },

  listarMedicosLaboratorioValidado: async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.LISTAR_MEDICOS_LABORATORIO_VALIDADO
      );
      return response.data;
    } catch (error) {
      console.error("Error al listar médicos de laboratorio validado", error);
      throw error;
    }
  },

  buscarExamenMedico: async (idOrdenLaboratorio) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_EXAMEN_MEDICO,
        {
          pv_filtro: idOrdenLaboratorio,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar examen medico", error);
      throw error;
    }
  },

  buscarOrdenLaboratorioPorId: async (idOrdenLaboratorio) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_ORDEN_LABORATORIO_POR_ID,
        {
          pn_id_orden_laboratorio: idOrdenLaboratorio,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar orden de laboratorio por ID", error);
      throw error;
    }
  },

  atenderOrdenLaboratorio: async (data) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.ATENDER_ORDEN_LABORATORIO,
        data
      );
      return 1;
    } catch (error) {
      console.error("Error al atender la orden de laboratorio", error);
      throw error;
    }
  },
};
