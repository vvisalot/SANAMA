import axios from "axios"

const connection = {
    backend: "http://localhost:8080"
}

const axiosInstance = axios.create({
    baseURL: connection.backend,
})

export const laboratoryService = {

    listarOrdenLaboratorioPorFiltro: async (filtro, estado, fecha_inicio, fecha_fin) => {
        try {
            const response = await axiosInstance.post(
                "atencion/post/listarOrdenLaboratorioFiltro",
                { 
                    pv_filtro: filtro, 
                    pn_estado: estado, 
                    pd_fecha_inicio: fecha_inicio, 
                    pd_fecha_fin: fecha_fin 
                }
            )
            return response.data
        } catch (error) {
            console.error("Error al listar orden de laboratorio por filtro", error)
            throw error
        }
    },

}
