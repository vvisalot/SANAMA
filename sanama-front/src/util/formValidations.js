export function validateNumberInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '')
    if (input.value.length > 8) {
        input.value = input.value.slice(0, 8)
    }
}


export function validateTextInput(input) {
    input.value = input.value.replace(/[^A-Za-z]/g, '')
}

export function validateSecurityCode(input) {
    let value = input.value.toUpperCase()

    // Si los primeros tres caracteres no son letras mayúsculas, los eliminamos
    if (value.length <= 3) {
        value = value.replace(/[^A-Z]/g, '')
    }
    // Si la longitud es mayor que 3, nos aseguramos de que los siguientes tres caracteres sean números
    else if (value.length > 3 && value.length <= 6) {
        let letters = value.substring(0, 3).replace(/[^A-Z]/g, '')
        let numbers = value.substring(3).replace(/[^0-9]/g, '')
        value = letters + numbers
    }

    input.value = value
}