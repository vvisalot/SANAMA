const DualPicker = ({ text, option1, option2, onOptionSelected }) => {
    const handleChange = (event) => {
        onOptionSelected(event.target.value);
    }
    return (
        <section onChange={handleChange} className="w-1/2">
            <h1 className="text-sm text-gray-500 pb-3">{text}</h1>
            <section className="grid grid-cols-2">
                <div className="relative">
                    <input id="default-radio-1"
                        type="radio"
                        value="{option1}"
                        name="dual-picker"
                        className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2" />
                    <label htmlFor="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 ">
                        {option1}
                    </label>
                </div>
                <div className="relative ">
                    <input id="default-radio-2"
                        type="radio"
                        value="{option2}"
                        name="dual-picker"
                        className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2" />
                    <label htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900">
                        {option2}
                    </label>
                </div>
            </section>
        </section>
    )
}

export default DualPicker