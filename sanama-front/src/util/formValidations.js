import { format } from "date-fns";

export function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())
  ) {
    edad--;
  }
  return edad;
}

export function formatearFecha(fecha) {
  const fechaNac = new Date(fecha);
  return `${fechaNac.getDate().toString().padStart(2, "0")}/${(
    fechaNac.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${fechaNac.getFullYear()}`;
}

export function validateNumberInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
  if (input.value.length > 8) {
    input.value = input.value.slice(0, 8);
  }
}

export function validateTextInput(input) {
  input.value = input.value.replace(/[^A-Za-z\s]/g, "");
}

export function validateSecurityCode(input) {
  let value = input.value.toUpperCase();

  // Si los primeros tres caracteres no son letras mayúsculas, los eliminamos
  if (value.length <= 3) {
    value = value.replace(/[^A-Z]/g, "");
  }
  // Si la longitud es mayor que 3, nos aseguramos de que los siguientes tres caracteres sean números
  else if (value.length > 3 && value.length <= 6) {
    let letters = value.substring(0, 3).replace(/[^A-Z]/g, "");
    let numbers = value.substring(3).replace(/[^0-9]/g, "");
    value = letters + numbers;
  }

  input.value = value;
}

export function formatHour(hour) {
  try {
    const [hours, minutes, seconds] = hour.split(":");
    if (!hours || !minutes || !seconds)
      throw new Error("Formato de hora inválido");
    const date = new Date();
    date.setHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    );
    return format(date, "HH:mm");
  } catch (error) {
    console.error("Error al formatear la hora:", error);
    return hour; // Devuelve la hora original en caso de error
  }
}
