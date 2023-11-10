import Datepicker from "tailwind-datepicker-react"
import React, { useEffect, useState } from "react"

const defaultOptions = {
  autoHide: false,
  todayBtn: true,
  todayBtnText: "Hoy",
  clearBtn: false,
  datepickerClassNames: "top-17",
  defaultDate: null,
  language: "es",
  disabledDates: [],
  theme: {
    input: "py-4",
  },

  weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  inputNameProp: "fecha",
  inputIdProp: "fecha",
  inputPlaceholderProp: "Selecciona una fecha",
  inputDateFormatProp: {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
}

const DateRangePicker = ({
  dateInitial,
  setDateInitial,
  dateFinal,
  setDateFinal,
}) => {
  const [showInitial, setShowInitial] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const [optionsInitial, setOptionsInitial] = useState({
    ...defaultOptions,
    minDate: new Date("2022-01-01"),
  })
  const [optionsFinal, setOptionsFinal] = useState({
    ...defaultOptions,
  })

  useEffect(() => {
    setOptionsFinal((prevOptions) => ({
      ...prevOptions,
    }))
  }, [dateInitial])

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
    <section className="flex items-center">
      <Datepicker
        classNames="pr-2"
        options={optionsInitial}
        onChange={handleChangeInitial}
        show={showInitial}
        setShow={handleCloseInitial}>
      </Datepicker >
      <Datepicker
        classNames="pr-2"
        options={optionsFinal}
        onChange={handleChangeFinal}
        show={showFinal}
        setShow={handleCloseFinal}
      />
    </section>
  )
}

export default DateRangePicker
