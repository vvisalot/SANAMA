import { appointmentService } from "@/services/appointmentService";
import { useState, useEffect } from "react";
import { parseAppointmentTable } from "@/util/appointmentParser";
import AppointmentTable from "@/app/appointments/AppointmentTable";
import SearchAndAddBar from "@/components/bars/SearchAndAddBar";
function CitasMedico({ doctor }) {
  const [appointmentTable, setAppointmentTable] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await appointmentService.citasMedicoPorID(
          doctor.idPersona,
          4
        );
        console.log("citas pendientes", data);
        //const tableData = parseAppointmentTable(data);
        //setAppointmentTable(tableData);
        const citasMapeadas = data.map((cita) => ({
          ...cita,
          idCita: cita.idCita,
          codigoCita: cita.codigoCita,
          medico: {
            nombres: doctor.nombres,
            apellidoPaterno: doctor.apellidoPaterno,
            apellidoMaterno: doctor.apellidoMaterno,
            especialidad: {
              nombre: doctor.especialidad.nombre,
            },
          },
        }));
        const tableData = parseAppointmentTable(citasMapeadas);
        setAppointmentTable(tableData);
      } catch (error) {
        console.log("No se pudo obtener la lista de las citas");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("filtro").value;
    try {
      const data = await appointmentService.buscar(filtro);
      const tableData = parseAppointmentTable(data);
      setAppointmentTable(tableData);
    } catch (error) {
      console.log("Error al buscar las citas:", error);
    }
  };
  useEffect(() => {
    console.log(appointmentTable);
  }, [appointmentTable]);

  const columns = [
    { name: "idCita", visible: false },
    { name: "Código cita", sortable: true, sortKey: "string", visible: true },
    { name: "Nombre del paciente", sortable: true, sortKey: "patientName" },
    { name: "Fecha", sortable: true, sortKey: "date" },
    { name: "Hora", sortable: true, sortKey: "time" },
    { name: "Estado", sortable: true, sortKey: "status" },
    { name: "Opciones", sortable: false },
  ];

  return (
    <>
      <header className="p-5  text-2xl font-bold tracking-wider text-gray-900">
        Citas pendientes
      </header>
      <SearchAndAddBar
        linkHref="appointments/createAppointment"
        onSubmit={handleSubmit}
        permitirGenerarNuevaCita={false}
      />
      <p className="pl-5 pr-5 pt-2 pb-2 tracking-wider text-gray-900">
        Número de resultados: {appointmentTable.length}
      </p>
      <AppointmentTable
        data={appointmentTable}
        columns={columns}
      ></AppointmentTable>
    </>
  );
}

export default CitasMedico;
