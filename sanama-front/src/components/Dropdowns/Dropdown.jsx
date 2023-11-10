
const Dropdown = ({ selectedValue, data, defaultText, text, defaultValue, value, name, width, handleChange }) => {
    return (
        <select
            id={name}
            name={name}
            onChange={handleChange}
            value={selectedValue}
            className={`block h-fit ${width} my-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500`}>
            <option
                className="text-sm"
                defaultValue
                value={defaultValue}>
                {defaultText}
            </option>
            {data.map((item, index) => (
                <option className="text-sm" key={index} value={item[value]}>
                    {item[text]}
                </option>
            ))}
        </select>
    )
}

export default Dropdown


