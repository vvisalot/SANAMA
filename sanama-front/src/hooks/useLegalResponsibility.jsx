import { useState } from 'react'

const useLegalResponsibility = () => {
    const [legalResponsibility, setLegalResponsibility] = useState({
        tieneAcompañante: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        parentesco: '',
    })



    return {
        legalResponsibility,
        setLegalResponsibility
    }
}
export default useLegalResponsibility