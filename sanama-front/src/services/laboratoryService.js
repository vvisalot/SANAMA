import axios from "axios";

const connection = {
    backend: "http://localhost:8080"
};

const axiosInstance = axios.create({
    baseURL: connection.backend,
});

export const laboratoryService = {
    listarOrdenLaboratorioPorFiltro: async (filtro, fechaDesde, fechaHasta) => {
        try {
            const response = await axiosInstance.post(
                "laboratorio/post/listarOrdenLaboratorioFiltro",
                {
                    pv_filtro: filtro,
                    pd_fecha_inicio: fechaDesde,
                    pd_fecha_fin: fechaHasta
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
            const response = await axiosInstance.get("configuracion/get/listarMedicosLab");
            return response.data;
        } catch (error) {
            console.error("Error al listar médicos de laboratorio validado", error);
            throw error;
        }
    },    

    buscarExamenMedico: async (idOrdenLaboratorio) => {
        try {
            const response = await axiosInstance.post("laboratorio/post/buscarExamenMedico", {
                pv_filtro: idOrdenLaboratorio
            });
            return response.data;
        } catch (error) {
            console.error("Error al buscar examen medico", error);
            throw error;
        }
    },

    buscarOrdenLaboratorioPorId: async (idOrdenLaboratorio) => {
        try {
            const response = await axiosInstance.post("laboratorio/post/buscarOrdenLaboratorio", {
                pn_id_orden_laboratorio: idOrdenLaboratorio
            });
            return response.data;
        } catch (error) {
            console.error("Error al buscar orden de laboratorio por ID", error);
            throw error;
        }
    },

    atenderOrdenLaboratorio: async (data) => {
        try {
            const response = await axiosInstance.post("laboratorio/post/atenderOrdenLaboratorioV1", data);
            return 1;
        } catch (error) {
            console.error("Error al atender la orden de laboratorio", error);
            throw error;
        }
    },
    
};
