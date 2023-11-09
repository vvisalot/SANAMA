import axios from "axios";
import connection from "@/config/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

const ENDPOINTS = {
  INSERTAR_DOCTOR: "/rrhh/put/doctor",
  BUSCAR_POR_NOMBRE: "/rrhh/post/buscarMedico",
  LISTAR_ESPECIALIDADES: "/rrhh/get/especialidad",
  BUSCAR_POR_MEDICO_ESPECIALIDAD:
    "/rrhh/post/listarMedicosPorEspecialidadNombreCmp",
  BUSCAR_HORARIOS_MEDICO_FECHA: "/rrhh/post/horarios_por_medico_y_fecha",
  DIAS_DISPONIBLES_POR_ID: "/rrhh/post/dias_disponibles_por_medico",
};

export const doctorService = {
  insertar: async (doctorForm) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.INSERTAR_DOCTOR,
        doctorForm
      );
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del doctor", error);
      throw error;
    }
  },

  buscarPorNombre: async (name) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.BUSCAR_POR_NOMBRE, {
        pv_filtro: name,
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar doctores por nombre", error);
      throw error;
    }
  },

  listarEspecialidades: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LISTAR_ESPECIALIDADES);
      return response.data;
    } catch (error) {
      console.error("Error al listar las especialidades", error);
      throw error;
    }
  },

  buscarPorMedicoEspecialidad: async (filtro, especialidad) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_POR_MEDICO_ESPECIALIDAD,
        {
          pv_medico: filtro,
          pv_especialidad: especialidad,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar doctores por especialidad", error);
      throw error;
    }
  },

  buscarHorariosMedicoFecha: async (fecha, medicId) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_HORARIOS_MEDICO_FECHA,
        {
          pn_id_medico: medicId,
          pd_fecha: fecha,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar doctores por especialidad", error);
      throw error;
    }
  },

  DiasDisponiblesByID: async (medicId) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.DIAS_DISPONIBLES_POR_ID,
        {
          pn_id_medico: medicId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar los dias", error);
      throw error;
    }
  },
};
