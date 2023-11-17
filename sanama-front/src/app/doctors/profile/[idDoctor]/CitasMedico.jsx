import { appointmentService } from "@/services/appointmentService";
import { useState, useEffect } from "react";
import { parseAppointmentTable } from "@/util/appointmentParser";
import AppointmentTable from "@/components/appointments/AppointmentTable";
import SearchBar from "@/components/bars/SearchBar"
import DateRangePicker from "@/components/Date/DateRangePicker"
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox"
import { format } from "date-fns"
function CitasMedico({ dataDoctor }) {
  const doctor = dataDoctor[0];
  const [appointmentTable, setAppointmentTable] = useState([]);
  const [statusList, setStatusList] = useState([])
  const [statusState, setStatusState] = useState({})

  const [dateInitial, setDateInitial] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)
  const fetchData = async ({pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin,arregloEstados}) => {
    // console.log("datos recibidos",pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin,pn_estado)
    try {
      const data = await appointmentService.citasMedicoPorID(pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin,arregloEstados);
      // console.log("citas pendientes", data);
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
      console.log("citas map", citasMapeadas);
      const tableData = parseAppointmentTable(citasMapeadas);
      console.log("parse", tableData);
      setAppointmentTable(tableData);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas");
    }
  };
  useEffect(() => {
    fetchData({
      pn_id_medico: doctor.idPersona, 
      pv_filtro: "", 
      pd_fecha_inicio: null,
      pd_fecha_fin: null,
      arregloEstados: [
        {
          estado: null,
        },
      ]})
    fetchStateList();
  }, []);

  const fetchStateList = async () => {
    try {
      const data = await appointmentService.listarEstados()
      console.log("e c", data);
      setStatusList(data)
      let initialValues = {}
      data.forEach((status) => {
        initialValues[status.idValue] = false
      })
      console.log(initialValues)
      setStatusState(initialValues)
    } catch (error) {
      console.log("No se pudo obtener la lista de estados")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Hola")
    const elements = e.target.elements
    const filtro = elements.namedItem("search-bar-appointments").value
    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return {
          estado: key,
        }
      })
    const request = {
      pn_id_medico: doctor.idPersona,
      pv_filtro: filtro,
      pd_fecha_inicio: dateInitial ? format(dateInitial, "yyyy-MM-dd") : null,
      pd_fecha_fin: dateFinal ? format(dateFinal, "yyyy-MM-dd") : null,
      arregloEstados: stateArray,
    }
    await fetchData(request)
  }

  useEffect(() => {
    console.log(appointmentTable);
  }, [appointmentTable]);

  // const columns = [
  //   { name: "idCita", visible: false },
  //   { name: "Código cita", sortable: true, sortKey: "string", visible: true },
  //   { name: "Nombre del paciente", sortable: true, sortKey: "patientName", visible: true },
  //   { name: "Fecha", sortable: true, sortKey: "date", visible: true },
  //   { name: "Hora", sortable: true, sortKey: "time" , visible: true},
  //   { name: "Estado", sortable: true, sortKey: "status" , visible: true},
  //   { name: "Opciones", sortable: false },
  // ];

  const columns = [
    { name: "Código cita", sortable: true, sortKey: "string", visible: true },
    { name: "Fecha y hora", sortable: true, sortKey: "date" },
    { name: "idCita", sortable: false, sortKey: "idCita", visible: false },
    { name: "Nombre del paciente", sortable: true, sortKey: "patientName" },
    // { name: "Nombre del doctor", sortable: true, sortKey: "doctorName" },
    { name: "Especialidad", sortable: true, sortKey: "specialty" },
    { name: "Estado", sortable: true, sortKey: "status" },
    { name: "Opciones", sortable: false },
  ];

  return (
    <div>
      <header className="p-5  text-2xl font-bold tracking-wider text-gray-900">
        Mis Citas
      </header>
      <form className=" flex items-center space-x-4" onSubmit={handleSubmit}>
        <DropdownCheckbox
          text={"Selecciona el estado de la cita"}
          statusList={statusList}
          statusState={statusState}
          setStatusState={setStatusState}
        />
        <DateRangePicker
          dateInitial={dateInitial}
          setDateInitial={setDateInitial}
          dateFinal={dateFinal}
          setDateFinal={setDateFinal}
        />

        <SearchBar
          name={"search-bar-appointments"}
          width={"w-full"}
          placeholderText={"Buscar por Nombre, DNI o Código de la Cita"}
        />
        <button
          type="submit"
          className="text-white bg-primary-dark-blue hover:bg-primary-dusk-blue focus:ring-4 focus:outline-none focus:ring-primary-light-periwinkle font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
      </form>
      <p className="pl-5 pr-5 pt-2 pb-2 tracking-wider text-gray-900">
        Número de resultados: {appointmentTable.length}
      </p>
      <AppointmentTable
        data={appointmentTable}
        columns={columns}
      ></AppointmentTable>
    </div>
  );
}

export default CitasMedico;
