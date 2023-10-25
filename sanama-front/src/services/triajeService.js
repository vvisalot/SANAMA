import axios from "axios"

const connection = {
    backend: "http://localhost:8080"
}

const axiosInstance = axios.create({
    baseURL: connection.backend,
})

export const triajeService = {

    listarTriajePorFiltro: async (filtro) => {
        try {
            const response = await axiosInstance.post(
                "admision/post/listarTriajePorFiltro",
                { pv_filtro: filtro }
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
    }
}
