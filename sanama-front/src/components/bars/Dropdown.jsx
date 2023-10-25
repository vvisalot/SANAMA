
const Dropdown = ({ data, defaultText, text, defaultValue, value, name, width }) => {

    return (
        <select name={name} className={`block h-fit ${width} p-4 m-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500`}>
            <option defaultValue value={defaultValue}   >{defaultText}</option>
            {data.map((item, index) => (
                <option key={index} value={item[value]}>{item[text]}</option>
            ))}
        </select>
    )
}

export default Dropdown


