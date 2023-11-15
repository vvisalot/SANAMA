import axios from "axios";
import connection from "@/config/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

const ENDPOINTS = {
  REGISTRAR_CITA: "/admision/post/registrarCitaMedica",
  LISTAR_CITAS: "/admision/get/cita",
  LISTAR_CITAS_MEDICO: "/admision/post/listarCitasPorMedico",
  APPOINTMENT_TYPES: "/admision/get/tipos",
  SLOTS_AVAILABLE: "/admision/get/slots",
  LISTAR_CITAS_FILTRO: "/admision/post/listarCitasPorFiltro",
  BUSCAR_CITAS: "/admision/post/buscarCitaMedica",
  CAMBIAR_ESTADO: "/admision/post/cambiarEstadoCita",
  CAMBIAR_HORA_FECHA: "/admision/post/cambiarHorarioCita",
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const appointmentService = {
  registrarCita: async (form) => {
    try {
      const response = await axiosInstance.post(
        "admision/post/registrarCitaMedica",
        form
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al realizar la llamada al registro de cita médica:",
        error.message
      );
    }
  },

  listar: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LISTAR_CITAS);
      return response.data;
    } catch (error) {
      console.error("Error al listar las citas:", error.message);
      throw new Error("Failed to list appointments");
    }
  },

  listarCitasFiltro: async (request) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.LISTAR_CITAS_FILTRO,
        request
      );
      return response.data;
    } catch (error) {
      console.error("Error al listar las citas con filtro:", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },

  getBookingSteps: async (providerId) => {
    try {
      const response = await axiosInstance.get("URL_PLACEHOLDER", {
        params: { provider_id: providerId },
      });
      return response.data.steps;
    } catch (error) {
      console.error("Error getting booking steps:", error.message);
      throw new Error("Failed to fetch booking steps");
    }
  },

  getDaysAvailable: async (doctorId) => {
    try {
      const currentDayAndHour = formatDate(new Date());
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Lima";

      const response = await axiosInstance.get("PLACEHOLDER", {
        params: {
          doctorId,
          time: currentDayAndHour,
          timezone,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting available days:", error.message);
      throw new Error("Failed to get available days");
    }
  },

  getAppointmentTypes: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.APPOINTMENT_TYPES, {
        params: { clients_can_book: true },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting appointment types:", error.message);
      throw new Error("Failed to fetch appointment types");
    }
  },

  getAvailableSlots: async (params) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.SLOTS_AVAILABLE, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching available slots:", error.message);
      throw new Error("Failed to fetch available slots");
    }
  },

  buscarCita: async (pn_id_cita) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.BUSCAR_CITAS, {
        pn_id_cita,
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar cita", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },

  actualizarEstadoCita: async (data) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.CAMBIAR_ESTADO, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar estado de la cita", error.message);
      throw new Error("Failed to update appointment status");
    }
  },

  actualizarHoraFecha: async (pn_id_cita, pt_hora_cita, pd_fecha_cita) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.CAMBIAR_HORA_FECHA,
        {
          pn_id_cita,
          pt_hora_cita,
          pd_fecha_cita,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al cambiar hora y fecha de la cita", error.message);
      throw new Error("Failed to update appointment date and time");
    }
  },

  citasMedicoPorID: async (pn_id_medico, pn_estado) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.LISTAR_CITAS_MEDICO, {
        pn_id_medico,
        pn_estado,
      });

      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error al buscar cita", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },

  listarEstados: async () => {
    try {
      const response = await axiosInstance.get(
        "/configuracion/get/listarEstadosCitas"
      );
      //console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error al listar los estados de las citas", error);
      throw error;
    }
  },
};
