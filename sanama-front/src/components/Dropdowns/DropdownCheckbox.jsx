import { set } from "date-fns"
import { useEffect, useRef, useState } from "react"

const DropdownCheckbox = ({ onChange, data }) => {
    const [selectedValues, setSelectedValues] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    //Toggle dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const checkboxOptions = [
        { id: "checkbox-1", label: "Opción 1" },
        { id: "checkbox-2", label: "Opción 2" },
        { id: "checkbox-3", label: "Opción 3" }
    ];

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedValues([...selectedValues, value]);
        } else {
            setSelectedValues(selectedValues.filter(item => item !== value));
        }
    };


    //Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownRef])


    return (
        <div ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Estado de la cita
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>


            <div id="dropdownBgHover" className="z-10  w-48 bg-white rounded-lg shadow dark:bg-gray-700">
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                    {checkboxOptions.map((item, index) => (
                        <li key={index}>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                    id={item.id}
                                    type="checkbox"
                                    value={item.id}
                                    checked={selectedValues.includes(item.id)}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor={item.id}
                                    className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                    {item.label}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    )
}

export default DropdownCheckbox