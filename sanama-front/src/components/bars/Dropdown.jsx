
const Dropdown = ({ data, defaultText, text, defaultValue, value, setDropdownValue }) => {
    const handleChange = (e) => {
        setDropdownValue(e.target.value)
    }
    return (
        <div className="flex">
            <select className="relative w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={handleChange}>
                <option defaultValue value={defaultValue}   >{defaultText}</option>
                {data.map((item, index) => (
                    <option key={index} value={item[value]}>{item[text]}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
