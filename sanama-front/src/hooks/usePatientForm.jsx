import { useState } from 'react'

const usePatientForm = () => {
    const [patientForm, setPatientForm] = useState({
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        tipoSeguro: '',
        codigoSeguro: '',
        dni: '',
        direccion: '',
    })

    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [sexo, setSexo] = useState('')


    return {
        patientForm,
        setPatientForm,
        fechaNacimiento,
        setFechaNacimiento,
        sexo,
        setSexo
    }
}

export default usePatientForm
