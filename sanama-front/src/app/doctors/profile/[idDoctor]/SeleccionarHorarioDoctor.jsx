import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa la localización en español
import "react-big-calendar/lib/css/react-big-calendar.css";
import Mensaje from "./Mensaje";

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
  const fechaInicioManana = new Date();
  fechaInicioManana.setDate(fechaInicioManana.getDate() + 1); // Establece la fecha para mañana
  fechaInicioManana.setHours(0, 0, 0, 0);

  const fechaHoy = new Date();
  fechaHoy.setDate(1); // Establece el día como el primer día del mes actual
  fechaHoy.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00

  const fechaLimite = new Date();
  fechaLimite.setMonth(fechaLimite.getMonth() + 2, 0); // Establece el mes como el mes siguiente y el día como el último día del mes
  fechaLimite.setHours(23, 59, 59, 999); // Establece el mes como el mes siguiente y el día como el último día del mes
  //console.log(fechaHoy);
  //console.log(fechaLimite);
  //Aquí defino que tambien quiero traer data hasta 14 dias despues*********
  const [seHaModificadoHorario, setSeHaModificadoHorario] = useState(false);
  const handleIngresarDisponibilidad = () => {
    setBackData(events);
    setIsCalendarEnabled(true);
    setSeHaModificadoHorario(false);
  };

  const handleCancelarIngresoDisponibilidad = () => {
    setEvents(backData);
    setIsCalendarEnabled(false);
    setSeHaModificadoHorario(false);
  };

  const handleGuardar = () => {
    if (!seHaModificadoHorario) {
      alert("No hubo modificación de horario");
      setIsCalendarEnabled(false);

      return;
    }
    //FECHAS
    let fechaInicioReg = events[0].start.toISOString().split("T")[0];; // Inicializa con la primera fecha
    let fechaFinReg = events[0].start.toISOString().split("T")[0];; // Inicializa con la primera fecha
    //console.log(fechaInicioReg)
    //console.log(fechaFinReg)
    const eventosTransformados = events.map((evento) => {
      const horaInicio = evento.start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      const horaFin = evento.end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      const fecha = evento.start.toISOString().split("T")[0];

      // Actualiza fechaInicioReg si la fecha actual es anterior
      if (fecha < fechaInicioReg) {
        fechaInicioReg = fecha;
      }

      // Actualiza fechaFinReg si la fecha actual es posterior
      if (fecha > fechaFinReg) {
        fechaFinReg = fecha;
      }

      return {
        horaInicio,
        horaFin,
        fecha,
      };
    });

    function crearJSONParaServidor(eventosTransformados, idMedico, fechaInicioReg, fechaFinReg) {
      const jsonParaServidor = {
        pn_id_medico: idMedico,
        pd_fecha_inicio: fechaInicioReg,
        pd_fecha_fin: fechaFinReg,
        arregloHorarios: eventosTransformados.map((evento) => ({
          horaInicio: evento.horaInicio,
          horaFin: evento.horaFin,
          fecha: evento.fecha,
        })),
      };

      return jsonParaServidor;
    }

    const jsonParaServidor = crearJSONParaServidor(eventosTransformados, doctor.idPersona, fechaInicioReg, fechaFinReg);

    //console.log(jsonParaServidor);


    const registrarEvento = async (jsonParaServidor) => {
      const url = "http://localhost:8080/rrhh/post/registrarHorarioMedico";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonParaServidor),
      };

      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          console.log("Solicitud exitosa");
          setIsCalendarEnabled(false);
          setSeHaModificadoHorario(false);
        } else {
          console.error("Error en la solicitud:", response.statusText);
          setSeHaModificadoHorario(false);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    const registrarEventos = async () => {
      await registrarEvento(jsonParaServidor);
      //setIsCalendarEnabled(true);
    };

    registrarEventos();

  };

  useEffect(() => {
    const obtenerEventos = async () => {
      const eventosTotales = [];
      fechaHoy.setDate(fechaHoy.getDate()); //mi limite inferior. Fecha hoy - 7 dias
      const year = fechaHoy.getFullYear();
      const month = fechaHoy.getMonth() + 1;
      const day = fechaHoy.getDate();
      fechaLimite.setDate(fechaLimite.getDate()); //mi limite inferior
      const year2 = fechaLimite.getFullYear();
      const month2 = fechaLimite.getMonth() + 1;
      const day2 = fechaLimite.getDate();
      const requestData = {
        pn_id_medico: doctor.idPersona,
        pd_fecha_inicio: `${year}-${month}-${day}`,
        pd_fecha_fin: `${year2}-${month2}-${day2}`,
      };
      const url = "http://localhost:8080/rrhh/post/horarios_por_medico_e_intervaloFechas";
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
          eventosTotales.push(...convertirDatosParaCalendar(data));
        }
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      }
      setEvents(eventosTotales); //guardamos eventos
      setIsLoading(false); //permitimos su visualizacion en front
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
        if (slotInfo.start >= fechaInicioManana && slotInfo.start <= fechaLimite) {
          setEvents((prevEvents) => [...prevEvents, newEvent]);

        } else {
          alert("Puedes ingresar tu disponibilidad a partir del día siguiente");
        }
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
      if (event.start >= fechaInicioManana && event.start <= fechaLimite) {
        const updatedEvents = events.filter((e) => e !== event);
        setEvents(updatedEvents);
      } else {
        alert(
          "Puedes editar tu disponibilidad a partir del día siguiente"
        );
      }
    }
  };

  const messages = {
    week: 'Semana', // Cambia el nombre de la vista de semana
    month: 'Mes',
    today: 'Hoy',
    previous: 'Anterior',
    next: 'Siguiente'
  };
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
            <Mensaje text={"Podrá visualizar y registrar su disponibilidad en los meses actual y siguiente"}></Mensaje>
          </div>
          <Calendar
            messages={messages}
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
