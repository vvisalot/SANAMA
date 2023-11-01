import axios from "axios"

const connection = {
    backend: "http://localhost:8080"
}

const axiosInstance = axios.create({
    baseURL: connection.backend,
})

export const triajeService = {

    listarTriajePorFiltro: async (filtro, fechaDesde, fechaHasta) => {
        try {
            const response = await axiosInstance.post(
                "admision/post/listarTriajePorFiltro",
                {
                    pv_filtro: filtro,
                    pd_fecha_inicio: fechaDesde,
                    pd_fecha_fin: fechaHasta
                }
            )
            return response.data
        } catch (error) {
            console.error("Error al listar el triaje por filtro", error)
            throw error
        }
    },

    buscarPorFiltro: async (idTriaje) => {
        try {
            const response = await axiosInstance.post("admision/post/buscarTriaje", { 
                pv_filtro: idTriaje,
            });
            return response.data;
        } catch (error) {
            console.error("Error al buscar triaje por filtro", error);
            throw error;
        }
    },

    actualizarTriaje: async (data) => {
        try {
            const response = await axiosInstance.put("admision/put/actualizarTriaje", data);
            return 1;
        } catch (error) {
            console.error("Error al actualizar el triaje", error);
            throw error;
        }
    },
}
