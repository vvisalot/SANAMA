import Datepicker from "tailwind-datepicker-react"
import React, { useEffect, useState } from "react"
import { set } from "date-fns"


const defaultOptions = {
    autoHide: true,
    todayBtn: true,
    todayBtnText: "Hoy",
    clearBtn: true,
    clearBtnText: "Limpiar",
    datepickerClassNames: "top-17",
    language: "es",
    disabledDates: [],
    theme: {
        input: "py-4",

    },
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}



const DateRangePicker = () => {
    const [showInitial, setShowInitial] = useState(false)
    const [showFinal, setShowFinal] = useState(false)

    const [dateInitial, setDateInitial] = useState(new Date())
    const [dateFinal, setDateFinal] = useState(new Date())


    const [optionsInitial, setOptionsInitial] = useState({
        ...defaultOptions,
        minDate: new Date("1940-01-01"),
        defaultDate: new Date()
    });
    const [optionsFinal, setOptionsFinal] = useState({
        ...defaultOptions,
        minDate: new Date(),
        defaultDate: new Date()
    });

    useEffect(() => {
        setOptionsFinal((prevOptions) => ({
            ...prevOptions,
            minDate: new Date(dateInitial)
        }));
    }, [dateInitial]);


    const handleChangeInitial = (selectedDate) => {
        setDateInitial(selectedDate)
        console.log(selectedDate)
    }
    const handleChangeFinal = (selectedDate) => {
        setDateFinal(selectedDate)
        console.log(selectedDate)
    }

    const handleCloseInitial = (state) => {
        setShowInitial(state)
    }

    const handleCloseFinal = (state) => {
        setShowFinal(state)
    }


    return (
        <section className="flex items-center pr-8">
            <Datepicker classNames="pr-2" options={optionsInitial} onChange={handleChangeInitial} show={showInitial} setShow={handleCloseInitial} />
            <Datepicker options={optionsFinal} onChange={handleChangeFinal} show={showFinal} setShow={handleCloseFinal} />
        </section>


    )
}

export default DateRangePicker