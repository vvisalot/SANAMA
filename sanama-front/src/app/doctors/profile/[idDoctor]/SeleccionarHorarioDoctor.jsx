import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa la localización en español
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");
const localizer = momentLocalizer(moment);

function combinarEventosContiguos(eventos) {
  // Ordenar los eventos por la propiedad "start" en orden ascendente
  eventos.sort((a, b) => new Date(a.start) - new Date(b.start));

  const eventosCombinados = [];
  let eventoActual = null;

  for (const evento of eventos) {
    if (!eventoActual) {
      eventoActual = evento;
    } else {
      const finEventoActual = new Date(eventoActual.end);
      const inicioEvento = new Date(evento.start);

      if (finEventoActual >= inicioEvento) {
        // Los eventos se superponen o son contiguos, combínalos
        eventoActual.end = new Date(Math.max(finEventoActual, new Date(evento.end)));
      } else {
        // No son contiguos, agrega el evento actual a la lista de eventos combinados
        eventosCombinados.push(eventoActual);
        eventoActual = evento;
      }
    }
  }

  // Agregar el último evento actual (o el único si no hubo combinación)
  if (eventoActual) {
    eventosCombinados.push(eventoActual);
  }

  return eventosCombinados;
}

function convertirDatosParaCalendar(datos) {
  const eventos = datos.map((dato) => {
    const fecha = dato.fecha ? new Date(dato.fecha.replace(/-/g, "/")) : new Date(); // Usamos la fecha actual si fecha es nula
    const horaInicio = new Date(`1970-01-01T${dato.horaInicio}`);
    const horaFin = new Date(`1970-01-01T${dato.horaFin}`);
    const start = new Date(fecha);
    start.setHours(horaInicio.getHours());
    start.setMinutes(horaInicio.getMinutes());
    const end = new Date(fecha);
    end.setHours(horaFin.getHours());
    end.setMinutes(horaFin.getMinutes());
    return {
      id: dato.idTurno,
      title: "Disponible",
      start,
      end,
    };
  });

  return combinarEventosContiguos(eventos);
}

function SeleccionarHorarioMedico(props) {
  const { doctor } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(false);
  const [backData, setBackData] = useState([]);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [calendarHeight, setCalendarHeight] = useState(600);
  const fechaHoy = new Date();
  fechaHoy.setDate(fechaHoy.getDate() - 15); //Aquí defino que tambien quiero traer data de 2 semanas antes*********
  const [seHaModificadoHorario, setSeHaModificadoHorario] = useState(false);
  const handleIngresarDisponibilidad = () => {
    setBackData(events);
    setIsCalendarEnabled(true);
  };

  const handleCancelarIngresoDisponibilidad = () => {
    setEvents(backData);
    setIsCalendarEnabled(false);
    setSeHaModificadoHorario(false);
  };

  const handleGuardar = () => {
    if(!seHaModificadoHorario){
      alert("No hubo modificación de horario");
      setIsCalendarEnabled(false);
      
      return;
    }
    const eventosTransformados = events.map((evento) => {
      return {
        pn_id_medico: `${doctor.idPersona}`,
        pt_hora_inicio: evento.start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
        pt_hora_fin: evento.end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
        pd_fecha: evento.start.toISOString().split("T")[0],
      };
    });
    console.log(eventosTransformados);
    const url = "http://localhost:8080/rrhh/post/registrarHorarioMedico";

    const registrarEvento = async (evento) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento),
      };

      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          console.log("Solicitud exitosa");
        } else {
          console.error("Error en la solicitud:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    const registrarEventos = async () => {
      for (const evento of eventosTransformados) {
        await registrarEvento(evento);
      }
      setIsCalendarEnabled(false);
    };

    registrarEventos();
    
  };

  useEffect(() => {
    const obtenerEventos = async () => {
      const eventosTotales = [];
      for (let i = 0; i < 30; i++) {
        fechaHoy.setDate(fechaHoy.getDate());
        const year = fechaHoy.getFullYear();
        const month = fechaHoy.getMonth() + 1;
        const day = fechaHoy.getDate();
        const requestData = {
          pn_id_medico: doctor.idPersona,
          pd_fecha: `${year}-${month}-${day}`,
        };
        const url = "http://localhost:8080/rrhh/post/horarios_por_medico_y_fecha";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        };

        try {
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            const data = await response.json();
            data.forEach((d) => {
              d.fecha = `${year}-${month}-${day}`;
            });
            eventosTotales.push(...convertirDatosParaCalendar(data));
          }
        } catch (error) {
          console.error("Error al obtener los horarios:", error);
        }
        fechaHoy.setDate(fechaHoy.getDate() + 1);
      }
      setEvents(eventosTotales);
      setIsLoading(false);
    };

    obtenerEventos();
  }, []);

  const isEventOverlapping = (newEvent) => {
    for (const event of events) {
      if (
        (moment(newEvent.start).isSameOrAfter(event.start) &&
          moment(newEvent.start).isBefore(event.end)) ||
        (moment(newEvent.end).isAfter(event.start) &&
          moment(newEvent.end).isSameOrBefore(event.end))
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSelectSlot = (slotInfo) => {
    setSeHaModificadoHorario(true);
    if (view === "week") {
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        title: "Disponible",
      };

      if (!isEventOverlapping(newEvent)) {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        alert(
          "El nuevo turno se superpone con un turno existente. Por favor, seleccione otra hora."
        );
      }
    }
  };
  const handleView = (newView) => {
    setView(newView);
    if (newView === "week") {
      setCalendarHeight(1200);
    } else if (newView === "month") {
      setCalendarHeight(600);
    }
  };
  const handleDoubleClickEvent = (event) => {
    setSeHaModificadoHorario(true);
    if (view === "month") {
      // const shouldDelete = window.confirm("¿Desea eliminar este evento?");
      // if (shouldDelete) {
      //   const updatedEvents = events.filter((e) => e !== event);
      //   setEvents(updatedEvents);
      // }
    } else {
      const updatedEvents = events.filter((e) => e !== event);
      setEvents(updatedEvents);
    }
  };

  // <td scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
  //           <Link href={`${url}/${id}`} className="text-blue-700 hover:text-white border 
  //           border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
  //               Ver perfil
  //           </Link>

  //       </td>
  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ height: "auto" }}>
          <div className="flex justify-center space-x-4" style={{ margin: "2rem 0" }}>
            <button className={`${!isCalendarEnabled
              ? 'text-white bg-purple-800 border border-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 '
              : 'text-gray-400 bg-gray-100 border border-black-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 '
              }`}
              onClick={handleIngresarDisponibilidad} disabled={isCalendarEnabled}>
              Ingresar Disponibilidad
            </button>
            <button
              className={`${isCalendarEnabled
                ? 'text-white bg-red-800 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 '
                : 'text-gray-400 bg-gray-100 border border-black-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 '
                }`}
              onClick={handleCancelarIngresoDisponibilidad}
              disabled={!isCalendarEnabled}
            >
              Cancelar
            </button>
            <button className={`${isCalendarEnabled
              ? 'text-white bg-blue-800 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 '
              : 'text-gray-400 bg-gray-100 border border-black-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 '
              }`}
              onClick={handleGuardar} disabled={!isCalendarEnabled}>
              Guardar
            </button>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: calendarHeight }}
            views={{
              month: true,
              week: true,
            }}
            formats={{
              dayFormat: "dddd",
            }}
            onSelectSlot={handleSelectSlot}
            onDoubleClickEvent={isCalendarEnabled && handleDoubleClickEvent}
            selectable={view === "week" && isCalendarEnabled}
            onView={handleView}
          />
        </div>
      )}
    </div>
  );
}

export default SeleccionarHorarioMedico;
