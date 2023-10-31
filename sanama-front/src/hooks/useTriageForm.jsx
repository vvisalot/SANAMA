import { useState } from 'react'

const useTriageForm = () => {
    const [triageForm, setTriageForm] = useState({
        requiereTriaje: ''
    })

    return {
        triageForm,
        setTriageForm
    }
}

export default useTriageForm