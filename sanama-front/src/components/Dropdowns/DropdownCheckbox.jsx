import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

const DropdownCheckbox = ({
  statusList,
  statusState,
  setStatusState,
  text,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCheckboxChange = (id) => (event) => {
    const value = event.target.checked;
    console.log(event.target.checked);
    setStatusState((prevState) => ({ ...prevState, [id]: value }));
  };

  const getStatusText = () => {
    const selectedItems = statusList.filter(
      (item) => statusState[item.idValue]
    );
    if (selectedItems.length === 0) {
      return text;
    }
    if (selectedItems.length === statusList.length) {
      return "Todos los estados seleccionados";
    }
    return selectedItems.map((item) => item.descripcion).join(", ");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="ml-14 mr-2">
      <button
        onClick={toggleDropdown}
        id="dropdownBgHoverButton"
        data-dropdown-toggle="dropdownBgHover"
        className="py-1 text-slate-900 bg-gray-50 hover:bg-slate-400 w-[350px] justify-between bg-gray-50
                            border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-normal rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <FontAwesomeIcon icon={faHourglass} className="w-4 h-4 bg-gray-50 text-slate-50" />
        {getStatusText()}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {showDropdown && (
        <div
          id="dropdownBgHover"
          className="z-10 w-48 bg-white absolute rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            className="p-2 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownBgHoverButton"
          >
            {statusList.map((item) => (
              <li key={item.idValue}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={item.idValue}
                    type="checkbox"
                    checked={statusState[item.idValue]}
                    onChange={handleCheckboxChange(item.idValue)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                                    dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 
                                                    focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={item.idValue}
                    className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {item.descripcion}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
