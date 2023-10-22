export function parsePatientTable(data) {
    const columns = ["idPersona", "nombres", "cmp", "especialidad", "area"]
    const table = data.map(row => {
        return columns.map(column => {
            if (column === "nombres") {
                return {
                    "data": `${row["nombres"]} ${row["apellidoPaterno"]} ${row["apellidoMaterno"]}`
                }
            } else {
                return { "data": row[column] }
            }
        })
    })
    return table
}
