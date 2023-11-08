import Datepicker from "tailwind-datepicker-react"
import React, { useEffect, useState } from "react"


const options = {
    // title: "Demo Title",
    autoHide: true,
    todayBtn: true,
    todayBtnText: "Hoy",
    clearBtn: true,
    clearBtnText: "Limpiar",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    datepickerClassNames: "top-17",
    defaultDate: new Date("2022-01-01"),
    language: "es",
    disabledDates: [],
    theme: {
        input: "py-4",

    },
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputDateFormatProp: {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }
}

const DateRangePicker = () => {
    const [showInitial, setShowInitial] = useState(false)
    const [showFinal, setShowFinal] = useState(false)

    const [dateInitial, setDateInitial] = useState(new Date())
    const [dateFinal, setDateFinal] = useState(new Date())



    const handleChangeInitial = (selectedDate) => {
        console.log(selectedDate)
    }
    const handleChangeFinal = (selectedDate) => {
        console.log(selectedDate)
    }

    const handleCloseInitial = (state) => {
        setShowInitial(state)
    }

    const handleCloseFinal = (state) => {
        setShowFinal(state)
    }


    return (
        <section className="flex items-center">
            <Datepicker classNames="pr-2" options={options} onChange={handleChangeInitial} show={showInitial} setShow={handleCloseInitial} />
            <Datepicker options={options} onChange={handleChangeFinal} show={showFinal} setShow={handleCloseFinal} />
        </section>


    )
}

export default DateRangePicker